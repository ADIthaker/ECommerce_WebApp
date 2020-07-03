const dotenv =require('dotenv');
dotenv.config();
module.exports ={
    google_key : process.env.GOOGLE_API_KEY,
    mongo_uri : process.env.MONGO_CONNECTION_URI,
}