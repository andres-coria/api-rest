import { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  email: string;
  password: string;
  isAdmin: boolean;
  comparePassword: (password: string) => Promise<Boolean>
};

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
    match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: true
  },
  isAdmin:{
    type:Boolean,
    default:false  
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre<IUser>("save", async function(next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;

  next();
});

userSchema.methods.comparePassword = async function(password: string): Promise<Boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<IUser>("User", userSchema);