import {Router} from 'express';
import UserCtrl from '../controllers/user'
const userRouter=Router();
const userCtrl=new UserCtrl();


  userRouter.route('/login').post(userCtrl.login);
  userRouter.route('/users').get(userCtrl.getAll);
  userRouter.route('/users/count').get(userCtrl.count);
  userRouter.route('/user').post(userCtrl.insert);
  userRouter.route('/user/:id').get(userCtrl.get);
  userRouter.route('/user/:id').put(userCtrl.update);
  userRouter.route('/user/:id').delete(userCtrl.delete);


export default userRouter;