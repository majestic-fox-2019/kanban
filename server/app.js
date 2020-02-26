// load Routes
const userRoute     = require('./routes/user');
const projectRoute  = require('./routes/project');
const taskRoute     = require('./routes/task');



// Load middlewares
const authenticate      = require('./middlewares/authenticate');
const error_handling    = require('./middlewares/error_handling');


const express   = require('express')
const app       = express()
const port      = process.env.PORT || 3000

const cors      = require('cors');

const dotenv    = require('dotenv');
dotenv.config();


app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json())


app.use('/users', userRoute);
app.use(authenticate);
app.use('/projects', projectRoute);
app.use('/tasks', taskRoute);

app.use(error_handling);


app.listen(port, () => console.log(`App listening on port ${port}!`))