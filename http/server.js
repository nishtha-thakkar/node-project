const fs = require("fs")
const http = require("http")

console.log(__dirname)
console.log(__filename)

global.tech = "node"
console.log(tech)
console.log(process.version)

const server = http.createServer((req , res) => {
   res.writeHead(200 , {"content-type" : "application/json"})
   res.write("server is done")
   res.end();
})

server.listen(4000 , () => {
    console.log("server is working")
})

fs.writeFileSync("demo.txt" , "Hello developer...")
fs.readFile("demo.txt" ,"utf8" , (err , data) => {
    console.log(data)
})
