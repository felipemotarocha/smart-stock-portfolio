import { Document, Schema, Types, model } from 'mongoose';

export interface IUser extends Document {
	_id: string;
	name: string;
	email: string;
	password: string;
	availableBalance: number;
	investedBalance: number;
	stocks: {
		stockId: string;
		quantity: number;
	}[];
}

export interface IRegisterUserInput {
	name: IUser['name'];
	email: IUser['email'];
	password: IUser['password'];
}

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
	availableBalance: {
		type: Number,
		default: 0,
	},
	investedBalance: {
		type: Number,
		default: 0,
	},
	stocks: [
		{
			_id: false,
			stockId: Types.ObjectId,
			quantity: Number,
		},
	],
});

const User = model<IUser>('User', userSchema);

export default User;
