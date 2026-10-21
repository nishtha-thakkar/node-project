const Blog = require("../model/blog")

// create blog

exports.blogcreate = async(req , res) => {

    try{

        const {title , author , content} = req.body

        if(!title || !author || !content){
            return res.status(400).json({message : "All fiels are required"})
        }

        const extBlog = await Blog.findOne({title});

        if(extBlog){
            return res.status(409).json({message : "blog alredy existed"})
        }

        const newBlog = await Blog.create({
            title,
            author,
            content
        })

        return res.status(201).json({message : "Created new blog successfully" , newBlog})

        
        
    }catch(error){
        console.log("Error" , error)
        return res.status(500).json({message : "something went wrong"})
    }

}

// get blog
exports.getblog = async(req, res) => {
    try {
        const id = req.params.id;
        const blogg = await Blog.findById(id);

        if(!blogg){
            return res.status(404).json({message : "Blog not found"});
        }

        return res.status(200).json({message : "Blog found successfully", blogg});

    } catch(error) {
        console.log("Error", error);
        return res.status(500).json({message : "something went wrong"});
    }
};

// update blog

exports.updateBlog = async(req , res) => {

    try{

        const id = req.params.id

        const{title , author , content} = req.body

        const blo = await Blog.findByIdAndUpdate(id , {
            title,
            author,
            content
        } , {new : true , runValidators : true})

        if(!blo){
            return res.status(404).json({message : "Blog not update"})
        }

        return res.status(200).json({message : "Blog updated successfully" , blo})

    }catch(error){
         console.log("Error", error);
        return res.status(500).json({message : "something went wrong"});


    }
}

exports.deleteBlog = async(req , res) => {

    try{

        const id = req.params.id;
        const bloo = await Blog.findByIdAndDelete(id);

        if(!bloo){
            return res.status(404).json({message : "blog not deleted successfully"})
        }

        return res.status(200).json({message : "Blog deleted sucessfully" , bloo})

    }catch(error){

         console.log("Error", error);
        return res.status(500).json({message : "something went wrong"});


    }

}