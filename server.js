//load express
const express = require('express')

//create an instance of express
const app = express()

const PORT = 3000

//root routs
app.get('/', (req, res) =>{      
    //console.log('running...');   
    res.send('Welcome to the Pokemon App!')
})

//app listener
app.listen(PORT, () =>{
    console.log(`Server is running on port: ${PORT}`);
})