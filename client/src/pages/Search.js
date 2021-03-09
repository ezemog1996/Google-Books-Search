import React, { useState, useEffect } from 'react';
import useDebounce from '../utils/debounceSearch';
import Axios from '../utils/API';
import ResultsContainer from '../components/ResultsContainer/ResultsContainer';

function Search() {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const debouncedSearchTerm = useDebounce(search, 500);

    useEffect(() => {
        if (!search) {
            return;
        }

        if (debouncedSearchTerm) {
            Axios.googleBooks(search)
                .then(res => {
                    setResults(res.data.items)
                    console.log(res.data.items)
                })
                .catch(err => console.log(err))
        }
    }, [debouncedSearchTerm])

    function handleInputChange(e) {
        setSearch(e.target.value)
    };

    return (
        <div>
            <form className="border p-3 jumbotron clearfix" onSubmit={(e) => e.preventDefault()}>
                <h4>Book Search</h4>
                <div className="form-group">
                    <label htmlFor="book">Search a book title or topic you would like to read about</label>
                    <input type="book" className="form-control" placeholder="Enter a book title" onChange={handleInputChange} />
                </div>
            </form>
            <ResultsContainer results={results} />
        </div>
    )
}

export default Search;