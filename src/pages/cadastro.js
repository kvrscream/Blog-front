import React, {Component} from "react";
import api from "../api/api";
import M from "materialize-css";


class Cadastro extends Component{

    constructor(props){
        super(props);

        this.state = {
            name: "",
            email:"",
            password: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleName = (event) =>{
        this.setState({name: event.target.value});
    }

    handleEmail = (event) =>{
        this.setState({email: event.target.value});
    }

    handlePassword = (event) =>{
        this.setState({password: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        let data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        api.post("/users/create", data).then((response) => {
            this.toast(response.data.message);
        }).catch((erro) => {
            console.log("Erro => ", erro);
        })
    }

    toast = (msg) => {
        M.toast({html: ""})
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <h3>Cadastro de usuário</h3>
                    </div>
                    <form className="col s8">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">account_circle</i>
                            <input id="icon_prefix" type="text" className="" onChange={this.handleName} />
                            <label for="icon_prefix">Nome</label>
                        </div>
                        <div className="input-field col s12">
                            <i className="material-icons prefix">email</i>
                            <input id="icon_prefix" type="text" className="" onChange={this.handleEmail} />
                            <label for="icon_prefix">E-mail</label>
                        </div>
                        <div className="input-field col s12">
                            <i className="material-icons prefix">lock</i>
                            <input id="icon_prefix" type="password" className="" onChange={this.handlePassword} />
                            <label for="icon_prefix">Senha</label>
                        </div>
                        <div className="col s12">
                            <a className="waves-effect waves-light btn" onClick={this.handleSubmit}>Salvar</a>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Cadastro;