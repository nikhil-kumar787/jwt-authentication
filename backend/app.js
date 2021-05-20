const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

const app = express()
const SECRETKEY = "qwerty@321"
app.use(bodyParser.json())


const verifyTheToken = (req, res, next) => {
    // getting the token from the header
    const bearer = req.headers["authorization"]
    if(bearer){
        const bearerToken = bearer.split(" ")
        const token = bearerToken[1]

        jwt.verify(token, SECRETKEY, (err, data) => {
            if(err){
                res.sendStatus(403)
            }else{

                req.userData = data
                next()
            }
        })
    }else{
        res.sendStatus(403)
    }
}

app.post("/delete-user", verifyTheToken, (req, res) => {

    // bloack 2 
    console.log("User data block 2:", req.userData)
    res.send("User deleted")
})

app.post("/login", (req, res) => {
    console.log("got the request")
    // check for the username and password
    console.log(req.body)
    const { username, password } = req.body

    // database authenticate username and password 
    if(username === "codersingh" && password === "coder@123"){
        const user = {
            username,
            age: 22
        }
        jwt.sign({user}, SECRETKEY, (err, token) => {
            if(err){
                res.sendStatus(403)
            }else{
                res.json({
                    token
                })
            }
        })
        
    }else{
        res.sendStatus(403)
    }
    
})

app.listen(8080, () => {
    console.log("Server started at port 8080")
})

/**
 * eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiY29kZXJzaW5naCIsImFnZSI6MjJ9LCJpYXQiOjE1NzQyNDUwODh9.WI4JkvIMVer45766QyMQrdJgpGKurtB5TQeuyIcQQk0
 */