import express from 'express';

const app = express();


require('./db/mongoose')


app.use(require('./routes/api.ts'));




export default app;