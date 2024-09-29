// proccess.env = {env file content, each line property} 
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const Logger = require('./logs/loger');
const logger = require('./models/loger');

const app = express();

Logger.log('server connection to data base of nadav beckend port 3000');

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use((req, res, next) => {
  logger(req, res, next).catch(next);
});
app.use(morgan('dev'));
app.use(express.static('static'));
app.use('/api/cards', require('./routes/cardsRoutes'));
app.use('/api/users', require('./routes/usersRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));


const { PORT } = process.env;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server is listening for requests on http://127.0.0.1:${PORT}`));
});
