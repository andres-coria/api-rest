import {Router} from 'express';
import UserCtrl from '../controllers/user';
import passport from "passport";
const userRouter=Router();
const userCtrl=new UserCtrl();


  userRouter.route('/user').post(userCtrl.insert);
  userRouter.route('/login').post(userCtrl.login);
  userRouter.route('/users').get(passport.authenticate("jwt", { session: false }),userCtrl.getAll);
  userRouter.route('/users/count').get(passport.authenticate("jwt", { session: false }),userCtrl.count);
  userRouter.route('/user/:id').get(passport.authenticate("jwt", { session: false }),userCtrl.get);
  userRouter.route('/user/:id').put(passport.authenticate("jwt", { session: false }),userCtrl.update);
  userRouter.route('/user/:id').delete(passport.authenticate("jwt", { session: false }),userCtrl.delete);


export default userRouter;