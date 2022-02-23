// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express')

/*Dependencies*/
const bodyParser = require('body-parser')

// Start up an instance of app
const app = express()

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 2000;
const server = app.listen(port, () => {
    console.log(`Server running on localhost port: ${port}`)
});
//GET Method
app.get("/all", (request,response) => {
    if(projectData){
        response.send(projectData)
    }
});
//POST Method
app.post('/add', addData)

function addData(request, response){
    //const data = await request.body;
    entry ={
        temp: request.body.temp,
        date: request.body.date,
        feel: request.body.content
    }
    projectData.push(entry);
    response.send(projectData);
}
