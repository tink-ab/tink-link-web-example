const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const fetch = require("node-fetch");

app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.json());

// Needed to make client-side routing work in production.
app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const base = "https://www.tink.se/api/v1";

// This is the server API, where the client can post a received OAuth code.
app.post("/code", function (req, res) {
    getAccessToken(req.body.code).then(function (response) {

        getData(response.access_token).then(function (response) {
            res.send(JSON.stringify({response: response}))
        }).catch(err => console.log(err));

    }).catch(err => console.log(err));
});

async function getData(accessToken) {
    const categoryResponse = await getCategoryData(accessToken);
    const userResponse = await getUserData(accessToken);
    const accountResponse = await getAccountData(accessToken);
    const investmentResponse = await getInvestmentData(accessToken);
    const transactionResponse = await getTransactionData(accessToken);

    return {
        categoryData: categoryResponse,
        userData: userResponse,
        accountData: accountResponse,
        investmentData: investmentResponse,
        transactionData: transactionResponse
    };
}

async function getAccessToken(code) {
    const body = {
        code: code,
        client_id: "6745522a5cb6472587174d0b22ad2905",
        client_secret: process.env.CLIENT_SECRET, // Your OAuth client secret. Always handle the secret with care.
        redirect_uri: "https://demo.tink.se/callback",
        grant_type: "authorization_code"
    };

    const response = await fetch(base + "/oauth/token", {
        method: "POST",
        body: Object.keys(body).map(key => encodeURIComponent(key) + "=" + encodeURIComponent(body[key])).join("&"),
        headers: {"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"},
    });

    if (response.status !== 200) throw Error(response.status);
    return response.json();
}

async function getUserData(token) {
    const response = await fetch(base + "/user", {
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    if (response.status !== 200) throw Error(response.status);
    return response.json();
}

async function getAccountData(token) {
    const response = await fetch(base + "/accounts/list", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    });

    if (response.status !== 200) throw Error(response.status);
    return response.json();
}

async function getInvestmentData(token) {
    const response = await fetch(base + "/investments", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    });

    if (response.status !== 200) throw Error(response.status);
    return response.json();
}

async function getTransactionData(token) {
    const response = await fetch(base + "/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({limit: 5})
    });

    if (response.status !== 200) throw Error(response.status);
    return response.json();
}

async function getCategoryData(token) {
    const response = await fetch(base + "/categories", {
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    if (response.status !== 200) throw Error(response.status);
    return response.json();
}

// Start the server.
const port = 8080;
app.listen(port, function () {
    console.log("Tink example app listening on port " + port)
});
