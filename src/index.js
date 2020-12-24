const express = require("express")
require('./db/mongoose')
const userRouter = require("./routers/user")
const taskRouter = require("./routers/task")


const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, ()=>{
    console.log("Server is up on port " + port)
})

const Task = require('./models/task')
const User = require('./models/user')

const main = async ()=>{
    // const task = new Task.findById('5fe4ae19688bcc21947f33e1')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    const user = await User.findById('5fe4ac6c464d212768bb7b41')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}
main()