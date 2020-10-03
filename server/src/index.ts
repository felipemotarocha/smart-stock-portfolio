import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import 'reflect-metadata';
import UserResolver from './graphql/resolvers/user.resolvers';
require('dotenv').config();
require('./config/database');

const main = async () => {
	const schema = await buildSchema({
		resolvers: [UserResolver],
	});

	const apolloServer = new ApolloServer({ schema });

	const app = express();

	apolloServer.applyMiddleware({ app });

	app.listen(4000, () => console.log('listening on port 4000'));
};

main();
