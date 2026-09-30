const mongoose = require("mongoose")

const  MovieSchema = new mongoose.Schema({
    movieName : {
        type : String,
        require : [true , "Movie name is required"]

    },

    favoriteHero : {
        type : String,
        require : [true , "faviorte Hero name is required"]
    },

    favoriteHeroine : {
        type : String,
        require : [true , "facorire heroine name is required"]
    }
},
{timestamps : true}
)

module.exports = mongoose.model("Movie" , MovieSchema)
    
