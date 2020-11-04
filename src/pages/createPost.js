import React, {Component, useState} from "react";
import M from "materialize-css";
import api from "../api/api";
import MenuAdmin from "../components/menuAdmin";
import JoditEditor from "jodit-react";

class CreatePost extends Component {
    constructor(props){
        super(props);

        this.state = {
            id:"",
            title: "",
            content: "",
            author: "Felipe Botelho de Souza",
            token: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount(){
        let token = localStorage.getItem("token");
        if(token == null){
            this.props.history.push("/");
        } else {
            this.setState({
                token: token
            });

            if(this.props.location.query.post){
                let id = this.props.location.query.post._id;
                let title = this.props.location.query.post.title;
                let content = this.props.location.query.post.content;
    
                this.setState({
                    id: id,
                    title: title,
                    content: content
                });
            }
        }
    }

    toast = (msg) => {
        M.toast({html: msg});
    }


    handleTitle = (event) =>{
        this.setState({
            title: event.target.value
        });
    }

    handleContent = (event) =>{
        
        console.log("event -> ", event)
        this.setState({
            content: event
        });
    }

    handleSubmit(event){
        event.preventDefault();

        let data = {
            title: this.state.title,
            content: this.state.content,
            author: this.state.author
        }

        if(this.props.location.query.post){
            api.put("/post/update/"+this.state.id, data, {
                headers:{
                    "x-token-auth": this.state.token
                }
            })
            .then((response) => {
                let responseData = response.data;
                if(responseData == 200){
                    this.toast(responseData.message);
                } else {
                    this.toast(responseData.message);
                }
            })
            .catch(erro => console.log("erro ao editar => ", erro));
        } else {
            api.post("/post/create", data, {
                headers:{
                    "x-token-auth": this.state.token
                }
            })
            .then((response) => {
                let responseData = response.data;
                if(responseData == 200){
                    this.toast(responseData.message);
                } else {
                    this.toast(responseData.message);
                }
            })
            .catch(erro => console.log("erro ao salvar => ", erro));
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
                        <div className="col s12">
                            <h3>Formulário de post</h3>
                        </div>
                        <form className="col s12">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">title</i>
                                <input id="title" type="text" onChange={this.handleTitle} value={this.state.title} />
                                <label for="title">Título</label>
                            </div>
                            <div className="input-field col s12">
                                <JoditEditor 
                                    tabIndex={1}
                                    onChange={this.handleContent}
                                    value={this.state.content}
                                />
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

export default CreatePost;