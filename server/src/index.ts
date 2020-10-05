require('dotenv').config();
require('./config/database');

import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import { buildSchema } from 'type-graphql';

import UserResolver from './graphql/resolvers/user.resolvers';

const main = async () => {
	const schema = await buildSchema({
		resolvers: [UserResolver],
	});

	const apolloServer = new ApolloServer({ schema });

	const app = express();
	app.use(cors());

	apolloServer.applyMiddleware({ app });

	app.listen(4000, () => console.log('listening on port 4000'));
};

main();
