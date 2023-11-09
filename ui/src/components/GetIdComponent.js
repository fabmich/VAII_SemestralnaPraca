import React from "react";
import GetId from "../services/getResponse";


class GetIdComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: ""
        }
    }

    componentDidMount() {
        GetId.getId().then((response) => {
                this.setState({id: response.data})
        });

    }

    render() {
        return (

            <div> 
                <h1> ID </h1>
                <p> {this.state.id} </p>

            </div>
        )
    }
}

export default GetIdComponent;