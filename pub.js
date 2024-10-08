const express = require('express')
const redis = require("redis")
const app = express()


let publisher = redis.createClient({
    url: 'redis://localhost:6379'
})

publisher.on('error', (err) => console.log("Redis Error"))
publisher.on('connect', (err) => console.log("Redis Connected"))

const connect = async() => {
    await publisher.connect()
}

connect()

app.get("/", (req, res) => {
    res.send({
message: "Publisher active from prot 3001"
    })
})

app.get("/publish", async(req, res) => {
   const id = Math.floor(Math.random() * 10)
   const data = {
    id,
    message: `message ${id}`
   }
console.log('Publish data', data)
   await publisher.publish('message', JSON.stringify(data))

   res.send({
    message: "Data published!"
   })
})




app.listen(3001, () => {
    console.log("Publisher server start on 3001");
})