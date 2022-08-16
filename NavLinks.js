import React from 'react';
import { NavLinks} from 'react-router-dom';
import './NavLinks.css';
const NavLinks = props => {
    return <ul className="nav-links">
        <li>
            <Navlinks to="/" exact>All Users</Navlinks>
        </li>
        <li>
            <Navlinks to="/u1/places">MY PLACES</Navlinks>
        </li>
        <li>
            <Navlinks to="/places/new">ADD PLACES</Navlinks>
        </li>
        <li>
            <Navlinks to="/auth">AUTHENTICATE</Navlinks>
        </li>
    </ul>
};

export default NavLinks;