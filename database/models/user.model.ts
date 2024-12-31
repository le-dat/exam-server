import mongoose, { Schema, Document } from 'mongoose'

interface IUser extends Document {
  email: string;
  name?: string;
  role: 'admin' | 'user';
  password: string;
}

const UserSchema = new Schema(
  {
    email: { type: String, required: true, minlength: 5, maxlength: 160 },
    name: { type: String, maxlength: 160 },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    password: { type: String, required: true, minlength: 6, maxlength: 160 },
  },
  {
    timestamps: true,
  }
)

export const UserModel = mongoose.model<IUser>('users', UserSchema)