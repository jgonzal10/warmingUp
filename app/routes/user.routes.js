module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

//Create a new user
app.post('/users',users.create)

//Retrieve all users
app.get('/users',users.findAll);

//Retrieve a single user by Id
app.get('/users/:userId',users.findOne);

//Update a user
app.put('/users/:userId',users.update);

//Delete a user
app.delete('/users/:userId',users.delete);
}