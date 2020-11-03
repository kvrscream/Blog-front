import React, {Component} from "react";
import M from "materialize-css";
import api from "../api/api";
import MenuAdmin from "../components/menuAdmin";
import { Link } from "react-router-dom";

class Users extends Component {
    constructor(props){
        super(props);

        this.state = {
            users: []
        }
    }

    componentDidMount(){
        let elementFloat = document.querySelector(".btn-floating")
        M.FloatingActionButton.init(elementFloat, {})

        let token = localStorage.getItem("token");
        if(token == null){
            this.props.history.push('/');
        } else {
            api.get("/users", {headers: {
                "x-token-auth": token
            }})
            .then((response) => {
                let data = response.data;
                if(data.status == 200){
                    this.setState({users: data.users});
                } else {
                    this.toast(data.message);
                }
            })
            .catch(erro => {
                console.log("erro => ", erro);
            });
        }
    }

    toast = (msg) => {
        M.toast({html: msg});
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col s3">
                        <MenuAdmin />
                    </div>
                    <div className="col s9">
                        <a className="btn-floating btn-large waves-effect waves-light red">
                            <i className="material-icons">add</i>
                        </a>
                        <table className="responsive-table">
                            <thead>
                                <tr>
                                    <td>Nome</td>
                                    <td>E-mail</td>
                                    <td>Ações</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.users.map((user, index) => {
                                        return(
                                            <tr key={index}>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                    <Link to="" className="waves-effect waves-light btn blue">Editar</Link>
                                                    <button className="waves-effect waves-light btn red">
                                                        Excluir
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }

}

export default Users;