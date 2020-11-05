import React from "react";
import {Link} from "react-router-dom";
import csharp from "../images/csharp.jpg";
import html from "../images/html.png";

const Menu = () => {
    return (
        <div>
            <ul id="slide-out" className="sidenav sidenav-fixed">
                <li>
                    <div className="user-view">
                        <div className="background">
                            <img src={csharp} className="" />
                        </div>
                        <a href="#user"><img className="circle" src={html} /></a>
                        <a href="#name"><span className="white-text name">Felipe Botelho</span></a>
                    </div>
                </li>
                <li>
                    <Link to="/">
                        <i className="material-icons">code</i>Posts
                    </Link>
                </li>
                <li><div className="divider"></div></li>
                <li>
                    <a className="subheader">Mais</a>
                </li>
                <li>
                    <a className="waves-effect" href="#!">Sobre</a>
                </li>
                <li>
                    <a className="waves-effect" href="#!">Contato</a>
                </li>
            </ul>
            <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
        </div>
    )
}

export default Menu;