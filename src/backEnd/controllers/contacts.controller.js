const contactModel = require("../models/Contact");
const { handleHttpError } = require("../utils/handleError");

// Render contacts data
const renderContacts = async (req, res) => {

  try {
    const { username } = req.user;

    const contactsData = await contactModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "userAuthor"
        }
      }
    ]);

    res.render("contacts/profile", { username, contactsData });

  } catch (e) {
    handleHttpError(res, "ERROR_GET_USER");
  }
};

// Add Contact
const addContact = async (req, res) => {

  try {
    const body = req.body;
    body.author = req.user._id;

    await contactModel.create(body);
    res.redirect("/profile");

  } catch (e) {
    handleHttpError(res, "ERROR_CREATE_USER", 403);
  }
};

// Edit Contact
const editContact = async (req, res) => {

  try {
    const { id } = req.params;

    await contactModel.findByIdAndUpdate(id, req.body);
    res.redirect("/profile");

  } catch (e) {
    handleHttpError(res, "ERROR_UPDATE_USER", 403);
  }
}

// Delete Contact
const deleteContact = async (req, res) => {

  try {
    const { id } = req.params;
    await contactModel.findByIdAndDelete(id);

    res.redirect("/profile");

  } catch (e) {
    handleHttpError(res, "ERROR_REMOVE_USER");
  }
}

module.exports = { addContact, renderContacts, editContact, deleteContact };