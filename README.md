# Example app using Tink API to fetch users' account and transaction data

This is a small example app with the purpose to showcase how a third-party app could fetch data from the Tink API.

The app was bootstrapped with [create-react-app](https://github.com/facebook/create-react-app), so it contains some standard code from there. Other than that, it has been made as simple as possible.

## Structure

* **NodeJS server/backend**: can be found in `server.js`
* **ReactJS client/frontend**: can be found in the `client` folder.

## Running the app locally

First, clone this repository and `cd` into that directory. Then install the dependencies.

```
$ npm install
```

Set your client identifier and client secret into the following environment variables.

```
$ export REACT_APP_CLIENT_ID="<YOUR_CLIENT_ID>"
$ export REACT_APP_CLIENT_SECRET="<YOUR_CLIENT_SECRET>"
```

Run both the backend (`server.js`) and the frontend (`client` folder) concurrently:

```
$ npm run dev
```

You should be redirected to the client app on `http://localhost:3000/`, but if you're not, just open that in your browser and you should see the example app. The client runs on port `3000` and the server runs on `8080`.
