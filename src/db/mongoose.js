const validator = require('validator')
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api",{
    useNewUrlParser:true,
    useCreateIndex:true
})

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required : true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
    },
    age:{
        type: Number,
        default: 18,
        validate(value){
            if(value < 0){
                throw new Error("Age must be a positive number")
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error("Your password cannot contain the word password")
            }
        }

    }
})
// const me = new User({
//     name: "   Katia Perdomo",
//     email: "whOOOponj@gmail.com",
//     password: "Kocodrillo Durmiente"
// })

// me.save().then(() =>{
//     console.log(me)
// }).catch((error)=>{
//     console.log("Error " ,  error)
// })

const Task = mongoose.model('Task', {
    description:{
        type: String,
        required: true,
        trim: true
    },
    completed:{
        type: Boolean,
        default: false
    }
})

const task01 = new Task({
    description: "Paint the room",
    
})
task01.save().then(()=>{
    console.log(task01)
}).catch((error)=>{
    console.log(error)
})