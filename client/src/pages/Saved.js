import React, { useEffect, useState } from 'react';
import Axios from '../utils/API';
import { Modal } from 'react-bootstrap';

function Saved() {
    const [savedBooks, setSavedBooks] = useState([]);
    const [viewedBook, setViewedBook] = useState({
        title: "",
        authors: [],
        image: "",
        description: ""
    })
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        Axios.getBooks()
            .then(res => setSavedBooks(res.data.reverse()))
            .catch(err => console.log(err))
    }, [])

    function viewBook(e) {
        setViewedBook(savedBooks[e.target.id]);
        setShowModal(true);
    }

    function deleteBook(e) {
        Axios.deleteBook(e.target.id)
            .then(() => {
                Axios.getBooks()
                    .then(res => setSavedBooks(res.data))
                    .catch(error => console.log(error))
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="jumbotron p-3">
            <h4>Saved Books</h4>
            <hr/>
            {
                savedBooks.map((book, index) => (
                    <div key={index} className="container-fluid mb-5">
                        <div className="row">
                            <h4>{book.title}</h4>
                            <span className="ml-auto">
                                <button onClick={viewBook} className="btn btn-success" id={index}>View</button>
                                <button onClick={deleteBook} className="ml-2 btn btn-danger" id={book._id}>Delete</button>
                            </span>
                        </div>
                        <p>Written By:
                            {
                                book.authors !== undefined &&
                                book.authors.map((author, index) => (
                                    <span key={index}> {author}, </span>
                                ))
                            }
                        </p>
                        <div className="row">
                            <img src={book.image} className="col-12 col-sm-5 col-md-3 col-lg-2" style={{height: 'auto'}} />
                            <p className="col-12 col-sm-7 col-md-9 col-lg-10">{book.description}</p>
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
                <img className="mx-3 mb-3" src={viewedBook.image} />
                <p className="mx-2">{viewedBook.description}</p>
            </Modal>
        </div>
    )
}

export default Saved;