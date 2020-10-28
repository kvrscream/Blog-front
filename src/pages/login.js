import React, {Component} from "react";
import M from "materialize-css";
import Menu from "../components/menu";


class Login extends Component {
    render(){
        return(
            <div className="container">
                <div className="row">
                    <form className="col s12">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">account_circle</i>
                            <input id="icon_prefix" type="text" className="" />
                            <label for="icon_prefix">E-mail</label>
                        </div>
                        <div className="input-field col s12">
                            <i className="material-icons prefix">lock</i>
                            <input id="icon_prefix" type="password" className="" />
                            <label for="icon_prefix">Senha</label>
                        </div>
                        <div className="col s12">
                            <a className="waves-effect waves-light btn">Entrar</a>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;