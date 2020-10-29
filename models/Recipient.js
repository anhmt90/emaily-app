const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Recipient is supposed to be a subcollection for Survey, so 
 * ther's no need to import Recipient in index.js
 */

const recipientSchema = new Schema({
    email: String,
    responded: { type: Boolean, default: false },
});

module.exports = recipientSchema;