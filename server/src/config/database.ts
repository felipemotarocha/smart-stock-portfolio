import { connect } from 'mongoose';

connect(`${process.env.MONGODB_URL}`, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
}).then(() => console.log('connected to the database'));
