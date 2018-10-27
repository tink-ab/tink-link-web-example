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

## Explore the API with Postman

1. Install Postman: https://www.getpostman.com/
2. Import collection: [tink-public-api-environment_2018-10.postman_collection.json](tools/tink-public-api-environment_2018-10.postman_collection.json)
3. Import environment: [tink-public-api_2018-10.postman_collection.json](tools/tink-public-api_2018-10.postman_collection.json)
4. Modify environment variables to your personal configuration
5. Use the methods in the `Authorize` folder to set up the token needed
6. Use the methods in `API` folder to fetch the data! :tada: