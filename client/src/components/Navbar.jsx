import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { UserContext } from '../App';

const Navbar = () => {
    const { state, dispatch } = useContext(UserContext);

    const Nav = () => {

        if (state) {

            return (<>
                <li className="nav-item">
                    <NavLink className="nav-link" exact to="/logout">Logout</NavLink>
                </li>
            </>);
        } else {

            return (
                <>
                    <li className="nav-item">
                        <NavLink className="nav-link " exact to="/login">Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" exact to="/signup">Signup</NavLink>
                    </li>
                </>
            );
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <NavLink className="navbar-brand" exact to="/">rKepp</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" exact to="/">Notes</NavLink>
                            </li>
                            <Nav />


                        </ul>

                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar