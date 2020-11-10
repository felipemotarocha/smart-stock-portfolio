# 💵 Smart Stock Portfolio 💵

> Web application that balance your stock portfolio based on the score that you give for each one.

I built this application because the task of balance my stock portfolio was, sometimes, pretty tough. With this app you just need to set a score for your stocks and it will do the rest for you. Stocks with higher scores will occupy more space in your portfolio and the stocks with lower scores will occupy less space.

![Home Page](https://imgur.com/Mf2Nv2t.png)
_The **"Status"** field will tell you if you need to buy more of one stock or wait to buy it._

![Edit](https://imgur.com/0mgobLa.png)
_You can edit your stocks anyway you want._

![Add a new stock](https://imgur.com/07bLq6Y.png)
_You can add stocks that you already have, instead of use your available balance to buy them._

![Login Page](https://imgur.com/fv3ZB9t.png)
\_You can either login using your Google account or as guest, using none account at all.

![Register Page](https://imgur.com/sYLEEyx.png)

# Technologies/Stack Used ⚙️

**Front end:** React, TypeScript, Apollo Client, Context API, Hooks.

**Back end:** Node, Express, TypeScript, GraphQL, TypeGraphQL, Apollo Server.

# Quick Start 🚀

Clone the project:

```bash
git clone https://github.com/felipemotarocha/smart-stock-portfolio
```

# Setting Up The Server Side 💻

cd into folder:

```bash
cd server
```

Install the dependencies:

```bash
yarn install
```

Create a `.env` file in the `root` directory with the following values:

```
MONGODB_URL=YOUR_MONGODB_URL
HG_FINANCE_KEY=YOUR_HG_FINANCE_KEY
JWT_SECRET_KEY=YOUR_JWT_SECRET_KEY
```

## Getting Your MongoDB Database URL 🔑

Go to the [MongoDB Atlas official website](https://www.mongodb.com/cloud/atlas "MongoDB Atlas official website"), sign in to your account and create a new project:

![MongoDB Website](https://imgur.com/6MBTnxM.png)

After setting a name to it, **build a new Cluster**, choose the free plan and the region that you prefer. After a few minutes, your cluster will be ready. Go to the **"Connect"** option:

![Connect to Cluster](https://imgur.com/aTC3j2M.png)

Put your IP Address (in this case the address '0.0.0.0/0' will allow every IP to connect with the database) and create your database user.

Now go to **"Chose a connection method"**, select the **"Connect your application"** option, copy your **connection string** and paste it in the .env file, following the structions to replace the `<password>` and the `<dbname>` values with your user password and the name you want to give to the database:

![Connecting to the application](https://imgur.com/DKDOJvO.png)

## Getting Your HG Finance API Key 🔑

Go to the [HG Finance official website](https://hgbrasil.com "HG Finance official website") and sign in to your account. Go to the **"Keys"** section and choose the free plan.

![HG Finance Website](https://imgur.com/a7p6sQs.png)

Choose the **internal use option**, create the key and use it as the `HG_FINANCE_KEY` environment variable.

![Creating the key](https://imgur.com/K4Ah3gA.png)

## Running the Server 🚀

```bash
yarn dev
```

# Setting Up The Client Side 💻

cd into folder:

```bash
cd client
```

Install the dependencies:

```bash
yarn install
```

Create a `.env` file in the `root` directory with the following values:

```
REACT_APP_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
REACT_APP_GRAPHQL_API_URL=http://localhost:4000
```

You can change the `REACT_APP_GRAPHQL_API_URL` if your API URL is different or if you want to deploy the application. By default, the Smart Stock Portfolio API is under the port 4000.

## How To Get Your Google Client ID 🔑

Read the official Google OAuth Documentation clicking [here](https://developers.google.com/identity/one-tap/web/guides/get-google-api-clientid "Google OAuth Documentation") to know how you can get yours. Don't forget to add the URL of the application (i.e http://localhost:3000) to the **Authorized JavaScript origins**.

## Running the server 🚀

```bash
yarn start
```

# Application Info 📝

## Author

Felipe Rocha [@dicasparadevs](https://instagram.com/dicasparadevs "dicasparadevs Instagram").

## Version

1.0.0

## License

This project is licensed under the MIT License.
