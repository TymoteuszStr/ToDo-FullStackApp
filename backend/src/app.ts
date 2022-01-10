var express = require('express')
var cors = require('cors')

const app = express();
app.use(cors());

require('./db/mongoose')

// app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.use(require('./routes/userApi.ts'));
app.use(require('./routes/taskApi.ts'));




export default app;