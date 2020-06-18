import express from 'express'
import * as dotenv from 'dotenv'
import passport from 'passport'
//import passportMiddleware from './middlewares/passport';
import cors from 'cors';
import morgan from 'morgan';

import setMongo from './mongoose';
//import authRoutes from './routes/auth.routes';
//import specialRoutes from './routes/special.routes';

const app = express();
dotenv.config();

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
//passport.use(passportMiddleware);



async function main() {
  try {
    await setMongo();
    //setRoutes(app);
    app.get('/', (req, res) => {
      return res.send(`API at http://localhost:${app.get('port')}`);
    })
    if (!module.parent) {
      app.listen(app.get('port'), () => console.log(`Angular Full Stack listening on port ${app.get('port')}`));
    }
  } catch (err) {
    console.error(err);
  }
}

main();

export { app };


//app.use(authRoutes);
//app.use(specialRoutes);

export default app;