const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title:{
            type:String,
            require:true
        },
    description:{
        type:String,
        require:true
    },
    genre:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    rating:{
        type:String,
        require:true
    },
    year:{
        type:String,
        require:true
    }
})
const movies = mongoose.model('movies', movieSchema);

module.exports  = movies