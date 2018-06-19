import React from 'react';
import { Link } from 'react-router-dom';

class PageTitle extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        document.title = this.props.title + ' - MMall';
    }

    render(){
        return(
            <div className="row">
                <div className="col-md-12">
                    <h1 className="page-header">{this.props.title}</h1>
                </div>
                {this.props.children}
            </div>
        );
    }
}

export default PageTitle;