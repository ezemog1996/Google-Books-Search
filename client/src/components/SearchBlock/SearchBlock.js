import React from 'react';

function SearchBlock() {
    return (
        <form className="border p-3 jumbotron ">
            <h4>Book Search</h4>
            <div className="form-group">
                <label htmlFor="book">Search a book title or topic you would like to read about</label>
                <input type="book" className="form-control" placeholder="Enter a book title" />
            </div>
        </form>
    )
}

export default SearchBlock;