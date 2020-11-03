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

        this.deleteUser = this.deleteUser.bind(this);
    }

    componentDidMount(){
        let elementFloat = document.querySelector(".btn-floating");
        M.FloatingActionButton.init(elementFloat, {});

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
                } else if(data.status == 401){
                    this.props.history.push('/');
                } 
                else {
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


    deleteUser(id) {
        let token = localStorage.getItem("token");

        if(token == null){
            this.props.history.push('/');
        } else {
            api.delete("users/delete/"+id,{headers: {
                "x-token-auth": token
            }})
            .then((response) => {
                let data = response.data;
                if(data.status == 200){
                    this.toast(data.message);
                    this.setState({users: this.state.users.filter((user) => {
                        return user._id != id;
                    })})
                } else {
                    this.toast(data.message);
                }

            })
            .catch((erro) => {
                console.log("erro ao excluir => ", erro);
            })
        }
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col s3">
                        <MenuAdmin />
                    </div>
                    <div className="col s9">
                        <Link floating className="btn-floating btn-large waves-effect waves-light red"
                            to="/cadastro"
                        >
                            <i className="material-icons">add</i>
                        </Link>
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
                                                    <Link to={{pathname:`/cadastro/${user._id}`, query:{user: user} }} className="waves-effect waves-light btn blue">Editar</Link>
                                                    <button className="waves-effect waves-light btn red" onClick={() => {this.deleteUser(user._id)}}>
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