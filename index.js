const express = require('express');

const server = express();

server.use(express.json());


const port = 5001;

server.listen(port, ()=> console.log(`\n == api on port ${port} == \n`))