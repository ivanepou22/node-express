const bcrypt = require("bcryptjs");
const users = require("../models/users");
const { generateToken } = require("../middlewares/jwt");
const { registerCheck, loginCheck } = require("../helpers/validation")


const login = async (req, res) => {
  const { error } = loginCheck(req.body);

  if(error) return res.status(400).send({ error: error.details[0].message });

  const { email, password } = req.body;
  //find the user in the array of users
  const user = users.find((user) => user.email === email);
  console.log(user);
  //find user by email
  if (!user) return res.status(400).send("User not found");

  //compare password
  const validPassword = bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(400).json({
      ok: false,
      message: "Invalid  password",
    });
  //generate token
  const token = generateToken({
    id: user.id,
    name: user.name,
    email: user.email,
  });

  //send the token
  res.status(200).json({ token });
};

//create new user/register

const registerUser = (req, res) => {
    const { error } = registerCheck(req.body);

    if(error) return res.status(400).send({ error: error.details[0].message });

    const { name, email, password } = req.body;
    const newUser = {
        id: users.length + 1,
        name,
        email,
        password: bcrypt.hashSync(password, 10),
    }

    //generate token
    const token = generateToken({ id: newUser.id, name: newUser.name, email: newUser.email });

    //add new user to the array
    users.push(newUser);
    res.status(201).send({ message: "User created successfully", token });
}

module.exports = {
  login,
    registerUser,
};
