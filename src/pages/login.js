import React, {Component} from "react";
import M from "materialize-css";
import api from "../api/api";
import { Redirect } from "react-router-dom";

class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleEmail = (event) => {
        this.setState({email: event.target.value});
    }

    handlePassword = (event) => {
        this.setState({password: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        let data = {
            email: this.state.email,
            password: this.state.password
        }

        api.post("/login", data)
        .then((response) => {
            console.log(response.data);
            if(response.data.status == 200){
                localStorage.setItem("token", response.data.token);
                this.props.history.push('/users');
            } else {
                this.toast(response.data.message);
            }
        })
        .catch(erro => {

        })

    }

    toast = (msg) =>{
        M.toast({html:msg});
    }

   

    render(){
        return(
            <div className="container">
                <div className="row">
                    <form className="col s12">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">account_circle</i>
                            <input id="icon_prefix" type="text" className="" onChange={this.handleEmail} />
                            <label for="icon_prefix">E-mail</label>
                        </div>
                        <div className="input-field col s12">
                            <i className="material-icons prefix">lock</i>
                            <input id="icon_prefix" type="password" className="" onChange={this.handlePassword} />
                            <label for="icon_prefix">Senha</label>
                        </div>
                        <div className="col s12">
                            <button className="waves-effect waves-light btn" onClick={this.handleSubmit}>Entrar</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;