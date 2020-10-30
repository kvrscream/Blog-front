import React, {Component} from "react";
import M from "materialize-css";
import api from "../api/api";
import MenuAdmin from "../components/menuAdmin";

class Users extends Component {

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col s3">
                        <MenuAdmin />
                    </div>
                    <div className="col s9">
                        
                    </div>
                </div>
            </div>
        )
    }

}

export default Users;