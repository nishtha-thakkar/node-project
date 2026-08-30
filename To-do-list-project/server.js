const express = require("express")

const app = express();

app.use(express.json());

const user = [
    {
        id : 1 ,
        name : "Drumil",
        todotask : "add new user",
        days : "2 days"
       
        
    },

      {
        id : 2 ,
        name : "Akruti",
        todotask : "add new user",
        days : " 5 days"
       
    }
]


// get all user  

app.get("/all-user" , (req , res) => {
    return res.status(201).json({message : "all data user fetched" , user})
})

// add the data

app.post("/add-user" , (req , res) => {

    const newUser = {
        id : user.length + 1,
        name : req.body.name,
       
    }
    user.push(newUser)

    return res.status(200).json({message : "Add new user successfully" , newUser})

})

// get data through id

app.get("/user/:id" , (req , res) => {
    const id = parseInt(req.params.id)
    const users = user.find((userId) => userId.id === id)
    return res.status(200).json({message : "data fetched throgh is successfully" , users})
})


//   updata all data  // put - આખો data/object replace/update // ex : name + todotask + days

app.put("/update-all-user/:id" , (req ,res) => {
    const id = parseInt(req.params.id)
    const users = user.find((userId) =>userId.id === id )
    user.name = req.body.name
    user.todotask = req.body.todotask
    user.days = req.body.days
    return res.status(200).json({message: " updata the data successfully" , users}); 
    


})





// patch- માત્ર જે field બદલવી હોય તે  : ex:// ફક્ત days // update

app.patch("/patch-update/:id" , (req , res) => {
    const id = parseInt(req.params.id)
    const users = user.find((userId) => userId.id === id)
    users.name = req.body.name
    return res.status(201).json({message: "User data updates" , users})
})

// delete

// delete id 

app.delete("/user-delete/:id" , (req , res) => {
    const id = parseInt(req.params.id)
    const users = user.filter((userId) => userId.id !== id)
    return res.status(200).json({message : "user deleted successfully" , users})
})




app.listen(5000, () => {
    console.log("server is working...")
})


