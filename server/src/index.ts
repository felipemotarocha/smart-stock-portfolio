require('dotenv').config();
require('./config/database');
import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import { buildSchema } from 'type-graphql';

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

	apolloServer.applyMiddleware({ app });

	app.listen(4000, () => console.log('listening on port 4000'));
};

main();
