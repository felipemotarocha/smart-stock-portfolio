import { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	stocks: {
		symbol: string;
		quantity: number;
	}[];
}

export interface ICreateUserInput {
	name: IUser['name'];
	email: IUser['email'];
	password: IUser['password'];
}

const stockSchema: Schema = new Schema({
	symbol: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
});

const userSchema: Schema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	stocks: [stockSchema],
});

const User = model<IUser>('User', userSchema);

export default User;
