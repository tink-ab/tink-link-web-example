import { useEffect, useReducer } from "react";

const TINK_API_PATH = "/api/v1";
const CLIENT_BACKEND_PATH = "/backend";

const handleResponse = async response => {
  const json = await response.json();

  if (response.status >= 400) {
    throw new Error(json.message);
  }

  return json;
};

const fetchAccessToken = async code => {
  const response = await fetch(`${CLIENT_BACKEND_PATH}/access-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code })
  });

  return handleResponse(response);
};

const fetchCredentials = async (accessToken, credentialsId) => {
  const response = await fetch(
    `${TINK_API_PATH}/credentials/${credentialsId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.json();
};

const fetchFinancialData = async accessToken => {
  const response = await fetch(`${CLIENT_BACKEND_PATH}/callback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ accessToken })
  });

  return response.json();
};

export const useCallback = ({ search }) => {
  const queryCode = new URLSearchParams(search).get("code");
  const queryCredentialsId = new URLSearchParams(search).get("credentialsId");

  const [state, setState] = useReducer(
    (state, newState) => {
      return { ...state, ...newState };
    },
    {
      data: undefined,
      error: undefined,
      loading: false,
      status: ""
    }
  );

  useEffect(() => {
    async function getData(code, credentialsId) {
      try {
        setState({ loading: true });

        const accessTokenResponse = await fetchAccessToken(code);
        const accessToken = accessTokenResponse.access_token;

        const interval = setInterval(async () => {
          const credentialsResponse = await fetchCredentials(
            accessToken,
            credentialsId
          );

          setState({ status: credentialsResponse.statusPayload });

          if (credentialsResponse.status === "UPDATED") {
            clearInterval(interval);
            const financialData = await fetchFinancialData(accessToken);
            setState({
              loading: false,
              data: financialData
            });
          }
        }, 1000);
      } catch (error) {
        return setState({
          loading: false,
          error: error.message
        });
      }
    }

    if (queryCode) {
      getData(queryCode, queryCredentialsId);
    }
  }, [queryCode, queryCredentialsId]);
  return { ...state };
};
