const users = require('../models/users');
const { updateCheck } = require("../helpers/validation")

//get all users
const getAllUsers = (req, res) => {
    const user = users.map((user)=>{
        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    });
    res.status(200).json(user);
};

//get a single user
const getUserById = (req, res) => {
    const userId = req.params.id;
    const user = users.find(usr => usr.id == userId);

    if(!user) return res.status(404).json({message: 'User not found'});

    res.status(200).json({ id: user.id, name: user.name, email: user.email });
}

// update a user
const updateUser = (req, res) => {
    const userId = req.params.id

    const {name, email} = req.body;

    const user = users.find(usr => usr.id == userId);

    if(!user) return res.status(404).send({message: 'User not found'});

    const { error } = updateCheck(req.body);
    if(error) return res.status(400).json({error: error.details[0].message});
   
    if(name) user.name = name;
    if(email) user.email = email;

    //update the user in the array
    users[users.indexOf(user)] = user;

    res.status(200).json({ id: user.id, name: user.name, email: user.email });
}

// delete a user
const deleteUser = (req, res) => {
    const userId = req.params.id

    const user = users.find(usr => usr.id == userId);

    if(!user) return res.status(404).send({message: 'User not found'});

    users.splice(users.indexOf(user), 1);

    res.status(200).json({ message: 'User deleted' });
}


module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};