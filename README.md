# Example app using Tink API to fetch end users' data
This is a small example app with the purpose to showcase how a third-party app could fetch data from the Tink API.

The app was bootstrapped with [create-react-app](https://github.com/facebook/create-react-app), so it contains some standard code from there. Other than that, it has been made as simple as possible.

## Structure

* **NodeJS server/backend**: can be found in `server.js`
* **ReactJS client/frontend**: can be found in the `client` folder.

## Running the app locally

The client runs on port `3000` and the server runs on `8080`.

First, clone this repository and `cd` into that directory. Then install the dependencies.

```
$ npm install
```

Run both the backend (`server.js`) and the frontend (`client` folder) concurrently:

```
$ npm run dev
```

You should be redirected to the client app on `http://localhost:3000/`, but if you're not, just open that in your browser and you should see the example app.

## Build for production

Inside the `.buildkite` folder we have all the logic needed to deploy this app automatically. It downloads dependencies, builds the app and deploys it with `gcloud` to Google AppEngine.
