import { connect } from 'mongoose';

connect(
	`mongodb+srv://admin:${process.env.DB_PASSWORD}@shares-rebalancing-clus.05z03.gcp.mongodb.net/shares-rebalancing?retryWrites=true&w=majority`,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	}
);
