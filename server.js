const express = require('express');
const userRoute = require('./routes/userRoute')
const middlewares = require('./middlewares/notFound')
require("dotenv").config();

//initialize express
const app = express();

const Port = process.env.PORT || 5000;
//middleware
app.use(express.json());


//route
app.use('/api/v1',userRoute);


//middleware
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);


//create a server
app.listen(Port, () => {
    console.log(`Server started on port ${Port}`);
});