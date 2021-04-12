//IMPORTS
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const expressOasGenerator = require('express-oas-generator');


const app = express();
const port = process.env.PORT || 5000;

//MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
expressOasGenerator.init(app, {});

//IMPORT ROUTES
const clientsRoute = require('./routes/client-route');

//ROUTES MIDDLEWARE
app.use('/client', clientsRoute);


//DATABASE CONNECTION
mongoose.connect(process.env.DB_URI,{
    useNewUrlParser:true,
    useFindAndModify:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
})
.then(()=>console.log("DB COnnection Successful")) 
.catch((ex)=>console.log(ex));

//START SERVER
app.listen(port,() => console.log(`Server running at port: ${port}`)); 