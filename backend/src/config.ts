import dotenv from 'dotenv'
dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  database: process.env.DATABASE || 'mongodb://localhost:27017/ToDo-FullStackApp',
};

export default config;