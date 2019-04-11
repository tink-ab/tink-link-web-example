import { useState, useEffect } from "react";

export const useCallback = ({ search }) => {
  const [state, setState] = useState({
    code: new URLSearchParams(search).get("code"),
    token: new URLSearchParams(search).get("error"),
    message: new URLSearchParams(search).get("message"),
    data: undefined,
    error: undefined,
    loading: false
  });

  useEffect(() => {
    async function getData(code) {
      try {
        setState({
          ...state,
          loading: true
        });
        const response = await fetch("/callback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: code })
        });

        const data = await response.json();

        if (response.status === 200) {
          return setState({
            ...state,
            loading: false,
            data
          });
        }

        return setState({
          ...state,
          loading: false,
          error: data.message
        });
      } catch (error) {
        return setState({
          ...state,
          loading: false,
          error: error.toString()
        });
      }
    }

    if (state.code) {
      getData(state.code);
    }
  }, []);
  return { ...state };
};
