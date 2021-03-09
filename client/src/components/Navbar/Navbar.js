import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';



function Navbar() {

    const [isActive, setIsActive] = useState({
        searchIsActive: '',
        savedIsActive: ''
    })
    
    const location = useLocation()

    useEffect(() => {
        if (location.pathname === "/") {
            setIsActive({
                searchIsActive: 'active',
                savedIsActive: ''
            })
        } else if (location.pathname === "/saved") {
            setIsActive({
                searchIsActive: '',
                savedIsActive: 'active'
            })
        }
    }, [])

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">
                <img src="https://www.graphicsprings.com/filestorage/stencils/2f3bdb9733c4a68659dc2900a7595fea.png" height="50" alt="" />
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className={`nav-item ${isActive.searchIsActive}`}>
                        <a className="nav-link" href="/" style={{fontSize: "20px"}}>Search<span className="sr-only">(current)</span></a>
                    </li>
                    <li className={`nav-item ${isActive.savedIsActive}`}>
                        <a className="nav-link" href="/saved" style={{fontSize: "20px"}}>Saved</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar