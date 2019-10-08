const User = require('../model/user.model.js');

// Create and Save a new User
exports.create = (req, res) => {
    //validate request
    //console.log(req.body,' hisssss')
    if(!req.body.name) {
        return res.status(400).send({
            message: "User name can not be empty"
        });
    }

      // Create a User
      const user = new User({
        name: req.body.name || "No name for this user", 
        surname: req.body.surname
    });

        // Save User in the database
        user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            });
        });

};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    User.find().then(users => {
        res.send(users);

    }).catch(err =>{
        res.status(500).send({
            message:err.message || "Something happend while retrieving users"
        });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId).then(note=>{
        if(!note){
            return res.status(404).send({
                message: "User not found with id "+req.params.userId
            });
        }
        res.send(note);
    }).catch(err =>{
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "User not found with id "+req.params.userId
            })
        }
        return res.status(500).send({
            message:"Error retrieving note with id "+req.params.userId
        });
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    if(!req.body.name){
        return res.status(404).send({
            message: "User name cant be empty"
        
        })
    }

    User.findByIdAndUpdate(req.params.userId,{
        name: req.body.name || "Unname User",
        surname:req.body.surname || ""
    },{new:true}).then(user=>{
        if(!user){
            return res.status(404).send({
                message:"User not found with id "+req.params.userId
            })
        }

        res.send(user)
    }).catch(err =>{
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message:"User not found with id "+req.params.userId
            })
        }
        return res.status(500).send({
            message: "Error updating user with id "+ req.params.userId
        })
    })

};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {

    User.findByIdAndRemove(req.params.userId).then(
        user =>{
            if(!user){
                return res.status(404).send({
                    message:"User not found with id "+req.params.userId
                })
            }
            res.send({message: "User deleted successfully!"});
        }
    ).catch(err=>{
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message:"User not found with id "+req.params.userId
            })
        }
        return res.status(500).send({
            message: "Error deleting user with id "+ req.params.userId
        })
    })

};