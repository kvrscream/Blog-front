import React from "react";
import {Link} from "react-router-dom";
import Me from "../images/eu.jpeg";
import Background from "../images/bg-code.png";

const MenuAdmin = () => {
    return (
        <div>
            <ul id="slide-out" className="sidenav sidenav-fixed">
                <li>
                    <div className="user-view">
                        <div className="background">
                            <img src={Background} />
                        </div>
                        <a href="#user"><img className="circle" width="10" src={Me} /></a>
                        <a href="#name"><span className="white-text name">Felipe Botelho</span></a>
                        <a href="#email"><span className="white-text email">botelho422@gmail.com</span></a>
                    </div>
                </li>
                <li>
                    <i className="material-icons">cloud</i>Bem vindo
                </li>
                <li><div className="divider"></div></li>
                <li>
                    <Link to="/users" className="">Usuários</Link>
                </li>
                <li>
                    <Link to="/listaPosts" className="">Posts</Link>
                </li>
            </ul>
            <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
        </div>
    )
}

export default MenuAdmin;