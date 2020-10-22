import { IUser } from './../../models/user.model';
import { Types } from 'mongoose';

const userId = Types.ObjectId();
const user: IUser = {
	_id: userId as any,
	name: 'Felipe',
};
