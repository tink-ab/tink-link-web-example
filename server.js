const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const fetch = require("node-fetch");

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.json());

// Needed to make client-side routing work in production.
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const base = "https://api.tink.se/api/v1";

// This is the server API, where the client can post a received OAuth code.
app.post("/callback", function(req, res) {
  getAccessToken(req.body.code)
    .then(function(response) {
      getData(response.access_token)
        .then(function(response) {
          res.send(JSON.stringify({ response: response }));
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

async function getData(accessToken) {
  const [
    categoryData,
    userData,
    accountData,
    investmentData,
    transactionData
  ] = await Promise.all([
    getCategoryData(accessToken),
    getUserData(accessToken),
    getAccountData(accessToken),
    getInvestmentData(accessToken),
    getTransactionData(accessToken)
  ]);

  return {
    categoryData,
    userData,
    accountData,
    investmentData,
    transactionData
  };
}

async function getAccessToken(code) {
  const body = {
    code: code,
    client_id: CLIENT_ID, // Your OAuth client identifier.
    client_secret: CLIENT_SECRET // Your OAuth client secret. Always handle the secret with care.
  };

  const response = await fetch(base + "/oauth/token", {
    method: "POST",
    body: Object.keys(body)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(body[key]))
      .join("&"),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
  });

  if (response.status !== 200) {
    throw Error(response.status);
  }
  return response.json();
}

async function getUserData(token) {
  const response = await fetch(base + "/user", {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  if (response.status !== 200) {
    throw Error(response.status);
  }
  return response.json();
}

async function getAccountData(token) {
  const response = await fetch(base + "/accounts/list", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });

  if (response.status !== 200) {
    throw Error(response.status);
  }
  return response.json();
}

async function getInvestmentData(token) {
  const response = await fetch(base + "/investments", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });

  if (response.status !== 200) {
    throw Error(response.status);
  }
  return response.json();
}

async function getTransactionData(token) {
  const response = await fetch(base + "/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ limit: 5 })
  });

  if (response.status !== 200) {
    throw Error(response.status);
  }
  return response.json();
}

async function getCategoryData(token) {
  const response = await fetch(base + "/categories", {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  if (response.status !== 200) {
    throw Error(response.status);
  }
  return response.json();
}

if (!CLIENT_ID) {
  console.log(
    "\x1b[33m%s\x1b[0m",
    "Warning: REACT_APP_CLIENT_ID environment variable not set"
  );
}

if (!CLIENT_SECRET) {
  console.log(
    "\x1b[33m%s\x1b[0m",
    "Warning: REACT_APP_CLIENT_SECRET environment variable not set"
  );
}

// Start the server.
const port = 8080;
app.listen(port, function() {
  console.log("Tink example app listening on port " + port);
});
