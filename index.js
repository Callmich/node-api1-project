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
    userInfo.id = shortid.generate();
    users.push(userInfo);
    res.status(201).json(userInfo)
})

server.get(`/api/users`, (req, res) => {
    if(users){
        res.status(200).json(users)
    }else{
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    }
})




const port = 5001;

server.listen(port, ()=> console.log(`\n == api on port ${port} == \n`))