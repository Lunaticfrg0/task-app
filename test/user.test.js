const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const {userOneId, userOne, setupDatabase} = require("./fixtures/db")


beforeEach(async () => {
   await setupDatabase()
})

test('Should sign a new user', async ()=>{
   const response = await request(app).post('/users').send({
       name: 'Emilio',
       email:"emilio3scano@gmail.com",
       password:"Mypass777"
    }).expect(201)
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    expect(response.body).toMatchObject({
        user:{
            name: 'Emilio',
            email:"emilio3scano@gmail.com",
        }
    })
})

test('Should login a user', async ()=>{
    const response = await request(app).post('/users/login').send({
       email: userOne.email,
       password: userOne.password
    }).expect(200)
    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should deny login a user', async ()=>{
    await request(app).post('/users/login').send({
       email: userOne.email,
       password: "CrazyFrogYes"
    }).expect(400)
})

test('Should get profile for user', async ()=>{
    await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Should not get profile for user', async ()=>{
    await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer `)
    .send()
    .expect(401)
})

test("Should delete auth account", async()=>{
    await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test("Should not delete not auth account", async()=>{
    await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer`)
    .send()
    .expect(401)
})

test('Should upload avatar image', async ()=>{
    await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'test/fixtures/profile-pic.jpg')
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async ()=> {
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        name: 'Mongolo'
    })
    .expect(200)
    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Mongolo')
})
test('Should not update invalid user fields', async ()=> {
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        test: 'yes'
    })
    .expect(404)
})