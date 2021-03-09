import Axios from 'axios'

export default {
    googleBooks: function(query) {
        return Axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
    },
    saveBook: function(book) {
        return Axios.post('/api/books/', book)
    },
    getBooks: function() {
        return Axios.get('/api/books/')
    },
    deleteBook: function(book) {
        return Axios.delete('/api/books/'  + book)
    }
}