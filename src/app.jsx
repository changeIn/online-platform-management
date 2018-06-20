import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';

// 页面，在webpack中配置了page
import Home from 'page/home/index.jsx';
import Login from 'page/login/index.jsx';
import Layout from 'component/layout/index.jsx';



class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            /* Router只能有一个子组件，Switch只匹配第一个匹配到的东西 */
            <Router>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/" render={()=>(
                        <Layout>
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route path="/product" component={Home} />
                                <Route path="/product-category" component={Home} />
                            </Switch> 
                        </Layout>
                    )}/>
                </Switch>
               
            </Router>
        );
    }
}



ReactDOM.render(
    <App />,
    document.getElementById('app')
)