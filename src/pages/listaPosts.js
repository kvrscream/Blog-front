import React, {Component} from "react";
import M from "materialize-css";
import MenuAdmin from "../components/menuAdmin";
import api from "../api/api";
import { Link } from "react-router-dom";

class ListaPosts extends Component {
    constructor(props){
        super(props);

        this.state = {
            posts: [],
            token: ""
        }

        this.deletePost = this.deletePost.bind(this);
    }

    componentDidMount(){
        let token = localStorage.getItem("token");
        if(token == null){
            this.props.history.push("/");
        } else {
            this.setState({token: token});

            api.get("/posts", {headers: {
                "x-token-auth": token
            }})
            .then((response) => {
                let data = response.data;
                if(data.status == 200){
                    this.setState({
                        posts: data.posts
                    });
                } else {
                    this.toast("Erro inesperado");
                }
            })
            .catch(erro => {
                console.log("erro no get posts => ", erro);
            });

        }

    }

    toast = (msg) => {
        M.toast({html: msg});
    }

    deletePost(id){
        api.delete("/post/delete/"+id, {
            headers: {
                "x-token-auth": this.state.token
            }
        })
        .then((response) => {
            let data = response.data;
            if(data.status == 200){
                this.toast(data.message);
                this.setState({
                    posts: this.state.posts.filter((post) => {
                        return post._id != id
                    })
                })
            } else {
                this.toast(data.message);
            }

        })
        .catch(erro => console.log("erro ao deletar => ", erro))
    }

    render(){
        return(
            <div className="container">
                <div className="row">

                    <div className="col s3">
                        <MenuAdmin />
                    </div>
                    <div className="col s9">
                        <table className="responsive-table">
                            <thead>
                                <tr>
                                    <th>Titulo</th>
                                    <th>Data</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.posts.map((post, index) => {
                                        return (
                                        <tr key={index} >
                                            <td>{post.title}</td>
                                            <td>{new Date(post.date).toLocaleDateString()}</td>
                                            <td>
                                                <Link to={
                                                    {
                                                        pathname:`/createPost/${post._id}`, 
                                                        query:{post: post} 
                                                    }} className="waves-effect waves-light btn blue">
                                                    Editar
                                                </Link>
                                                <button className="waves-effect waves-light btn red" onClick={
                                                    () => {
                                                        this.deletePost(post._id)
                                                    }
                                                }>
                                                    Excluir
                                                </button>
                                            </td>
                                        </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <Link floating className="btn-floating btn-large waves-effect waves-light red"
                                to="/createPost">
                            <i className="material-icons">add</i>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListaPosts;