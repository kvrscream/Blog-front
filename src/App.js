import React, { Component } from "react";
import M from "materialize-css";
import Menu from "./components/menu";

class App extends Component {
  render(){
    return(
      <div className="container">
        <div className="row">
          <div className="col m3">
            <Menu />
          </div>
          <div className="col m9 s12">

          </div>
        </div>
      </div>
    )
  }
}

export default App;
