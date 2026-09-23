const Book = require("../modals/userModals");

// add book

exports.addbook = async(req , res)=>{
    try{

        const{bookname ,authorname , price , category } = req.body 
        if(!bookname || !authorname  || !price || !category){
            return res.status(401).json({message : "All flelds are required"})
        }

        const extbook = await Book.findOne({bookname});

        if(extbook){
            return res.status(401).json({message : "book is already exist"})
        }

        const newbook = await Book.create({
            bookname,
            authorname,
            price,
            category
        })

        return res.status(201).json({message : " Book added successfully " , newbook})

    }catch(error){
        console.log(error)
        return res.status(500).json({message : "unsuccessfull to add new book"})
    }

}

// get book by id

exports.getbook = async(req ,res) => {
    try{

        const id = req.params.id

        const book = await Book.findById(id)

        if(!book){
            return res.ststus(404).json({message : "Book not found"})
        }

        return res.status(200).json({message : "Book found successfully" , book})

    }catch (error){
        console.log(error)
        return res.status(500).json({message : "Book loading fail"})

    }

}

//upadete book

exports.updatebook = async(req , res) => {
try{
    const id = req.params.id;

    const {bookname , authorname , price , category} = req.body

    const book = await Book.findByIdAndUpdate(id , {
        bookname,
        authorname,
        price,
        category
    } , {new : true , runValidators : true})

    //{ new: true }: અપડેટ થયા પછીનો નવો (તાજો) ડેટા book વેરીએબલમાં પાછો મળશે.
    //{ runValidators: true }: ડેટાબેઝમાં સ્કીમાના જે નિયમો (validation) સેટ કર્યા છે, તે અપડેટ વખતે પણ ચેક થશે.

    if(!book){
        return res.status(404).json({message : "Book not found"})
    }
    return res.status(201).json({message : "book updated successfully" , Book : book})

    // જો પુસ્તક સફળતાપૂર્વક અપડેટ થઈ જાય, તો યુઝરને 201 (Created/Updated) 
    // સ્ટેટસ કોડ સાથે સફળતાનો મેસેજ અને અપડેટ થયેલો નવો ડેટા (Book: book) 
    // મોકલવામાં આવે છે.

}catch(error){
    console.log(error)

    return res.status(500).json({message : "book not updated"})




}
}

// delete book

exports.deletebook = async(req , res) => {
try{ 

    const id = req.params.id

    const book = await Book.findByIdAndDelete(id);

    if(!book){
        return res.status(404).json({message : "Book not found"})
    }

    return res.status(200).json({message: "Book deleted successfully" , book})
    
}catch(error){
    console.log(error)

    return res.status(500).json({message : " Failed to delete"})

}

}


