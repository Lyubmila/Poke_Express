//load express
const express = require('express')
const pokemonData = require('./Models/pokemon')
require('dotenv').config()  //configuration for dotenv
//console.log(process.env.MONGODB_URI);

const mongoose = require('mongoose')
const PokemonModel = require('./Models/PokemonModel')

//create an instance of express
const app = express()

const PORT = 3000

//Middleware functions
//they update the request as soon as they come in
// app.use((req, res, next) => {
//     console.log(`Running middleware function!!`);
//     next()      //got to the next middleware or to the responce
// })

//JSON Middleware
app.use(express.json())
//if don't need read data from the url
app.use(express.urlencoded({extended: false}))

//setup view engine
app.set('view engine', 'ejs')
app.set('views', './Views')

//root routs
app.get('/', (req, res) =>{      
    //console.log('running...');   
    res.send('Welcome to the Pokemon App!')
})

app.get('/pokemon', (req, res) =>{
    //res.send(pokemonData)
    res.render('Index', {pokemonData: pokemonData, 
        pageTitle: 'Pokemon Page', 
        pageHeader: 'See All The Pokemon!'}) //instent pokemonData:pokemonData can be used only key pokemonData
    
})

app.get('/pokemon/new', (req, res) =>{
    res.render('newPokemon', {
        pageTitle: 'New Pokemon', 
        pageHeader: 'Create a new Pokemon'
    })
})

//* POST REQUEST HANDLER
app.post('/pokemon', (req, res) => {
    //console.log(req.body);
    const newPokemon = req.body // create a newPokemon variable
    // add a img property to the object
    newPokemon.img = `http://img.pokemondb.net/artwork/${req.body.name}`
    console.log('new pokemon=>', newPokemon);
    //pokemonData.push(req.body)
    //res.redirect('/pokemon')

     //* Save the new pokemon to the db
     await PokemonModel.create(newPokemon, (error, result) => {
        if (error) {
            console.log(error)
        }

        console.log(result);
    })
})

app.get('/pokemon/:id', (req, res) =>{
    //res.send(req.params.id)
    res.render('Show', {index: pokemonData[req.params.id], 
        //index: req.params.id, 
        pageTitle: 'Details', 
        pageHeader: "Gotta Catch 'Em All"})
})



//app listener
app.listen(PORT, () =>{
    console.log(`Server is running on port: ${PORT}`);
    mongoose.connect(process.env.MONGODB_URI) //conects to Mongo DB
    console.log('MongoDB connected!!');
})