import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import Axios from '../../utils/API';

function ResultsContainer({results}) {

    const [viewedBook, setViewedBook] = useState({
        title: "",
        authors: [],
        imageLinks: {
            thumbnail: ""
        },
        description: ""
    });
    const [showModal, setShowModal] = useState(false);
    const [savedBook, setSavedBook] = useState();
    
    function viewBook(e) {
        setViewedBook(results[e.target.parentNode.id].volumeInfo);
        setShowModal(true);
    }

    useEffect(() => {
        if (savedBook) {
            Axios.saveBook(savedBook)
                .then(res => console.log(res))
                .catch(err => console.log(err))
        }
    }, [savedBook])

    function saveBook(e) {
        const allBookInfo = results[e.target.parentNode.id].volumeInfo
        let authors;
        let description
        if (!allBookInfo.authors) {
            authors = ["No authors listed"];
        } else {
            authors = allBookInfo.authors
        }
        if (!allBookInfo.description) {
            description = "No description written";
        } else {
            description = allBookInfo.description
        }
        setSavedBook({
            title: allBookInfo.title,
            authors: authors,
            image: allBookInfo.imageLinks.thumbnail,
            description: description
        })
    }

    return (
        <div className="jumbotron p-3 border">
            <h4>Results</h4>
            <hr/>
            {
                results.map((book, index) => (
                    <div key={index} className="container-fluid mb-5">
                        <div className="row">
                            <h4>{book.volumeInfo.title}</h4>
                            <span className="ml-auto" id={index}>
                                <button onClick={viewBook} className="btn btn-success">View</button>
                                <button onClick={saveBook} className="ml-2 btn btn-primary">Save</button>
                            </span>
                        </div>
                        <p>Written By:
                            {
                                book.volumeInfo.authors !== undefined &&
                                book.volumeInfo.authors.map((author, index) => (
                                    <span key={index}> {author}, </span>
                                ))
                            }
                        </p>
                        <div className="row">
                            <img src={book.volumeInfo.imageLinks.thumbnail} className="col-12 col-sm-5 col-md-3 col-lg-2" style={{height: 'auto'}} />
                            <p className="col-12 col-sm-7 col-md-9 col-lg-10">{book.volumeInfo.description}</p>
                        </div>
                        <hr/>
                    </div>
                    
                ))
            }
            <Modal show={showModal}>
                <i className="fas fa-window-close ml-auto mr-1 mt-1" style={{cursor: "pointer"}} onClick={() => setShowModal(false)}></i>
                <h4 className="ml-2">{viewedBook.title}</h4>
                <p className="ml-2">Written By:
                    {
                        viewedBook.authors !== undefined &&
                        viewedBook.authors.map((author, index) => (
                            <span key={index}> {author}, </span>
                        ))
                    }
                </p>
                <img className="mx-3 mb-3" src={viewedBook.imageLinks.thumbnail} />
                <p className="mx-2">{viewedBook.description}</p>
            </Modal>
        </div>
    )
}

export default ResultsContainer;