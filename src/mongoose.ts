import mongoose from 'mongoose';

async function setMongo() {
    
    let mongodbURI = process.env.MONGO_HOST||"";
    // try Connect to MongoDB using Mongoose
    try{
    mongoose.set('useCreateIndex', true);
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useUnifiedTopology', true);
    await mongoose.connect(mongodbURI);
    console.log('Connected to MongoDB');
    }
    catch(error){
      throw new Error (`problem with database configuration`);
    }
    
    mongoose.connection.on('error', () => {
      throw new Error(`unable to connect to database: ${mongodbURI}`);
    });

  }
  
  export default setMongo;
  