require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
const SECRET_KEY = process.env.SECRET_URL;

module.exports ={PORT,MONGODB_URL,SECRET_KEY} 