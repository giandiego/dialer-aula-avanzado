import User from "../models/Users";

const CreateUser = async function (DataUser) {
  // Crear nuevo usuario
  try {
    const user = new User(DataUser);
    await user.save();
    const token = await user.generateAuthToken();
    console.log("User Create => ", user, token);
  } catch (error) {
    //console.log("Error Create User => ", error )
    //res.status(400).send(error);
  }
};

CreateUser({
  name: process.env.USER_NAME,
  email: process.env.EMAIL,
  password: process.env.PASSWORD,
});
