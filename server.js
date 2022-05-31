//load express
const express = require('express')
const pokemon = require('./Models/pokemon')

//create an instance of express
const app = express()

const PORT = 3000

//setup view engine
app.set('view engine', 'ejs')
app.set('views', './views')

//root routs
app.get('/', (req, res) =>{      
    //console.log('running...');   
    res.send('Welcome to the Pokemon App!')
})

app.get('/pokemon', (req, res) =>{
    //res.send(pokemon)
    res.render('Index', {data: pokemon, pageTitle: 'Pokemon Page'})
})

//app listener
app.listen(PORT, () =>{
    console.log(`Server is running on port: ${PORT}`);
})