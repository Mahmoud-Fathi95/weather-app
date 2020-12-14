// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Setup Server
const port = 8000;
const server = app.listen(port, ()=>{
  console.log(`server running on port:${port}`);
})
//get function
app.get('/all',(req, res)=>{
  res.send(projectData);
  projectData= [];
});
//post function
app.post('/add',(req, res)=>{
  console.log(req.body);
  newobj = {
   date: req.body.date,
   temp: req.body.temp,
   content : req.body.content
  }
projectData.push(newobj);
});
