require('dotenv').config();
require('./config/database');
import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import { buildSchema } from 'type-graphql';
import path from 'path';

import resolvers from './graphql/resolvers/resolvers.index';

const main = async () => {
	const schema = await buildSchema({
		resolvers,
	});

	const apolloServer = new ApolloServer({
		schema,
		context: ({ req, res }: any) => ({ req, res }),
	});

	const app = express();
	app.use(cors());

	// SPA
	app.use(express.static(path.join(__dirname, "build")));

	app.get("*", function (_req, res) {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

	apolloServer.applyMiddleware({ app });
	
	const port = process.env.PORT || 4000;
	app.listen(port, () => console.log(`listening on port ${port}`));
};

main();
