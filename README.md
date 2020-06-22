express Typescript Boilerplate, with a Cloud-hosted MongoDB service implementing passport with JWT autentication
There is a base class in the controllers folder that defines the implementation of the basics actions (CRUD, count, list), you can extend from that class and/or implement especific behavior   

1) git clone https://github.com/andres-coria/api-rest.git
2) cd api-rest
3) npm i
4) If you don't want a local mongoDB server go to https://www.mongodb.com/cloud and create a database, a user and configure it an accesss in the MONGO_HOST line (next step)
5) create a .env file and copy the following lines

NODE_ENV=development
PORT=4040
JWT_SECRET=a_VERY_secret_TOKEN
MONGO_HOST=mongodb+srv://apiUser:apiPassword@cluster0-pfeja.gcp.mongodb.net/test?retryWrites=true&w=majority

6) npm run dev
7) check http://localhost:4040
8) api doc (swagger) is http://localhost:4040/api-doc/

The project still under development in my free time