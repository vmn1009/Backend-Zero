const connection = require('../config/database')
const { getAllUsers, getUserById, updateUserById, handleRemoveUser } = require('../Services/CRUD')
const getHomePage = async (req, res) => {
  let results = await getAllUsers();
  return res.render('homePage.ejs', { listUsers: results })
}
const getAbout = (req, res) => {
  res.send("Hello World with About");
}
const getUpdatePage = async (req, res) => {
  const userId = req.params.id;
  let user = await getUserById(userId);
  res.render('edit.ejs', { userEdit: user }); // x <- y
}
const postCreateUser = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.country;
  console.log(">>> email: ", email);
  console.log(">>> name: ", name);
  console.log(">>> city: ", city);
  let [results, fields] = await connection.query(`INSERT INTO Users (email, name, city) VALUES (?, ?, ?)`, [email, name, city],);
  console.log(">>> check result: ", results);
  res.send("Create user is succeed!");
}
const postUpdateUser = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.country;
  let userId = req.body.userId;
  await updateUserById(email, name, city, userId);
  res.redirect('/');
}
const getCreatePage = (req, res) => {
  res.render('create.ejs');
}
const postDeleteUser = async (req, res) => {
  const userId = req.params.id;
  let user = await getUserById(userId);
  res.render('confirmDelete.ejs', { userEdit: user });
}
const postHandleRemoteUser = async (req, res) => {
  const id = req.body.userId;
  await handleRemoveUser(id);

  res.redirect('/');
}
module.exports = {
  getHomePage,
  getAbout,
  postCreateUser,
  getCreatePage,
  getUpdatePage,
  postUpdateUser,
  postDeleteUser,
  postHandleRemoteUser
}