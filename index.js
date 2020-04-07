const express = require('express');
const shortid = require('shortid');

const server = express();

server.use(express.json());



let users = [
    {
      id: "example",
      name: "Test User",
      bio: "Not Real - this is a test user."
    }
]


server.get('/', (req, res) => {
    res.json({api: "running!!!!!"})
})

server.post(`/api/users`, (req, res) => {
    const userInfo = req.body;
    console.log(userInfo)
    if(Object.keys(userInfo).length == 2){
        userInfo.id = shortid.generate();
        users.push(userInfo);
        res.status(201).json(userInfo)
    }else{
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    }
    const newUser = users.find((user)=> user.id == userInfo.id)
    if(newUser){

    }else{
        res.status(500).json({errorMessage: "There was an error while saving the user to the database"})
    }
})

server.get(`/api/users`, (req, res) => {
    if(users){
        res.status(200).json(users)
    }else{
        res.status(500).json({ errorMessage: "The users information could not be retrieved."})
    }
})

server.get(`/api/users/:id`, (req, res) => {
    const id = req.params.id;
    const user = users.find((use)=> use.id == id)

    if(user){
        res.status(200).json(user)
    }else{
        res.status(404).json({message: "The user with the specified ID does not exist."})
    }
})


const port = 5001;

server.listen(port, ()=> console.log(`\n == api on port ${port} == \n`))