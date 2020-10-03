import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import 'reflect-metadata';
import UserResolver from './graphql/resolvers/user.resolvers';
import StockResolver from './graphql/resolvers/stock.resolvers';
require('dotenv').config();
require('./config/database');

const main = async () => {
	const schema = await buildSchema({
		resolvers: [UserResolver, StockResolver],
	});

	const apolloServer = new ApolloServer({ schema });

	const app = express();

	apolloServer.applyMiddleware({ app });

	app.listen(4000, () => console.log('listening on port 4000'));
};

main();
