import React, {Component} from "react";
import api from "../api/api";
import M from "materialize-css";
import MenuAdmin from "../components/menuAdmin";


class Cadastro extends Component{

    constructor(props){
        super(props);

        this.state = {
            id: "",
            name: "",
            email:"",
            password: "",
            token: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        let token = localStorage.getItem("token");
        if(token == null){
            this.props.history.push("/");
        } else 
        {
            this.setState({token: token});
        }


        if(this.props.location.query){
            let id = this.props.location.query.user._id;
            let name = this.props.location.query.user.name;
            let email = this.props.location.query.user.email;

            this.setState({
                id:id,
                name: name,
                email: email
            })
        }
        
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

        if(this.state.id){
            api.put("/users/update/"+this.state.id, data, {headers: {
                "x-token-auth": this.state.token
            }})
            .then((response) => {
                let data = response.data;
                if(data.status == 200){
                    this.toast(data.message);
                    this.props.location.query.user = data.user;
                } else {
                    this.toast(data.message);
                }
            })
            .catch((erro) => {
                console.log("erro ao atualizar usuário =>" , erro);
            })

        } else {
            api.post("/users/create", data,{headers: {
                "x-token-auth": this.state.token
            }}).then((response) => {
                this.toast(response.data.message);
            }).catch((erro) => {
                console.log("Erro => ", erro);
            })
        }
    }

    toast = (msg) => {
        M.toast({html: msg})
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col s3">
                        <MenuAdmin />
                    </div>
                    <div className="col s9">
                        <div className="col s12">
                            <h3>Cadastro de usuário</h3>
                        </div>
                        <form className="col s8">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">account_circle</i>
                                <input id="icon_prefix" type="text" className="" onChange={this.handleName} value={this.state.name} />
                                <label for="icon_prefix">Nome</label>
                            </div>
                            <div className="input-field col s12">
                                <i className="material-icons prefix">email</i>
                                <input id="icon_prefix" type="text" className="" onChange={this.handleEmail} value={this.state.email} />
                                <label for="icon_prefix">E-mail</label>
                            </div>
                            <div className="input-field col s12">
                                <i className="material-icons prefix">lock</i>
                                <input id="icon_prefix" type="password" className="" onChange={this.handlePassword}  />
                                <label for="icon_prefix">Senha</label>
                            </div>
                            <div className="col s12">
                                <a className="waves-effect waves-light btn" onClick={this.handleSubmit}>Salvar</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cadastro;