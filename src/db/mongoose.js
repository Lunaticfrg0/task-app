const { connect } = require('mongodb');
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api",{
    useNewUrlParser:true,
    useCreateIndex:true
})

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age:{
        type: Number
    }
})
const me = new User({
    name: "Katherine",
    age: 18
})

// me.save().then(() =>{
//     console.log(me)
// }).catch((error)=>{
//     console.log("Error " ,  error)
// })

const Task = mongoose.model('Task', {
    description:{
        type: String
    },
    completed:{
        type: Boolean
    }
})

const task01 = new Task({
    description: "Clean the dishes",
    completed: false
})
task01.save().then(()=>{
    console.log(task01)
}).catch((error)=>{
    console.log(error)
})