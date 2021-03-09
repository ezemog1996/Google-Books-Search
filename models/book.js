const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: "Please enter the title of the book"
    },
    authors: {
        type: Array,
        validate: {
            validator: function(array) {
                return array[0].length
            }
        }
    },
    description: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        trim: true
    },
    link: {
        type: String,
        trim: true
    }
})

const Book = mongoose.model("Book", bookSchema);

module.exports = Book