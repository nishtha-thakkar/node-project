const Movie = require("../model/MovieModel")



// add book

exports.addMovie = async(req , res) => {
try{
    const {movieName ,   favoriteHero ,  favoriteHeroine} = req.body

    if(!movieName || !favoriteHero  || !favoriteHeroine){
        return res.status(401).json({message : "ALL FIELDS ARE REQUIRED"})
    }
    
 const movie = await  Movie.findOne({movieName})

 if(movie){
    return res.status(401).json({message : "MOVIE IS ALREADY DOWNLOAD"})
 }

 const CreateMovie = await Movie.create({
    movieName,
    favoriteHero,
    favoriteHeroine
 })

 return res.status(200).json({message : "You have created successfully" , CreateMovie})

} catch(error){
   console.log(error)
   return res.status(500).json({message : "You have not added successfully movie"})

}
}

//  get movie

exports.getMovie = async(req , res) => {

   try{

      const id = req.params.id

      const movie = await Movie.findById(id)
      
      if(!movie){
         return res.status(404).json({message : "Movie is not found successfully"})
      }

      return res.status(200).json({message:"Movie have found successfully", movie})
      

   }catch(error){
   console.log("Error" , error)
   return re.status(500).json({message : "something went wrong to get movie"})
   }

}

// update movie


exports.updateMovie = async(req , res) => {

   try{

      const id = req.params.id;

   const {movieName ,   favoriteHero ,  favoriteHeroine} = req.body

   const movie = await Movie.findByIdAndUpdate(id , {
      movieName ,   favoriteHero ,  favoriteHeroine
   }, {new : true , runValidators : true})

   if(!movie){
      return res.status(404).json({message : "movie not updated successsfully"})
   }

   return res.status(201).json({message : "Movie Updated successfuly" ,Movie:movie })

}

   catch(error){
      console.log("Error" , error)
      return res.status(500).json({message : "something went wrong to update movie"})

   }

}

// delete movie


exports.deleteMovie = async(req , res) =>{

   try{

      const id = req.params.id

      const movie = await  Movie.findByIdAndDelete(id)

      if(!movie){
         return res.json(404).json({message : "Movie not found"})
      }

      return res.status(200).json({message : "Movie deletedsuccessfully" , movie})


   }catch(error){
      console.log("Error" , error)
      return res.status(500).json({message : "Movie not deleted successfully"})

   }

}