const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const connectDB = require('./db/connect');
require('dotenv').config();


const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');


const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(bodyParser.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);


const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    }
    catch(error) {
        console.log(error);
    }
};

start()
