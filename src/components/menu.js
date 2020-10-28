import React from "react";
import {Link} from "react-router-dom";

const Menu = () => {
    return (
        <div>
            <ul id="slide-out" className="sidenav sidenav-fixed">
                <li><div className="user-view">
                <div className="background">
                    <img src="images/office.jpg" />
                </div>
                <a href="#user"><img className="circle" src="images/yuna.jpg" /></a>
                <a href="#name"><span className="white-text name">Felipe Botelho</span></a>
                <a href="#email"><span className="white-text email">botelho422@gmail.com</span></a>
                </div></li>
                <li><Link to="/login"><i className="material-icons">cloud</i>Proxima Página</Link></li>
                <li><a href="#!">Second Link</a></li>
                <li><div className="divider"></div></li>
                <li><a className="subheader">Subheader</a></li>
                <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
            </ul>
            <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
        </div>
    )
}

export default Menu;