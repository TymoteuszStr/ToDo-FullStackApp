import express from 'express';

const app = express();


require('./db/mongoose')

// app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.use(require('./routes/taskRoutes.ts'));




export default app;