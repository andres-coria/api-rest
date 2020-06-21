import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

import User, { IUser } from '../models/user';
import BaseCtrl from './base';
dotenv.config();

class UserCtrl extends BaseCtrl {
    model = User;
  
  createToken=(user: IUser ):String =>{
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET env var must be defined.')
    }
      return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET||"",{
        expiresIn: 86400
      });
  }

  login = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ msg:"Please. Send your email and password"});
    }
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ msg: "The User does not exists" });
    }
  
    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      return res.status(200).json({ token: this.createToken(user) });
    }  
    return res.status(400).json({msg: "The email or password are incorrect"});
  };

}
export default UserCtrl;