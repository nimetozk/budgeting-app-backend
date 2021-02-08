
import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (!envFound) {
  throw new Error('Could not find .env file');
}

const port = Number.parseInt(process.env.PORT || '3000', 10);

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  databaseURL: process.env.MONGODB_URI, 
  jwtKey: process.env.JWT_KEY
};

export default config;