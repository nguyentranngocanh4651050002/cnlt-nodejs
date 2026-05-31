const Contact = require("../models/contactModel");

const getContacts = async () => {
    return await Contact.find();
};

const createContact = async (data) => {
    return await Contact.create(data);
};

module.exports = {
    getContacts,
    createContact
};