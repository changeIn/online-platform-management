import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';

// 页面，在webpack中配置了page
import Home from 'page/home/index.jsx';
import Login from 'page/login/index.jsx';
import ErrorPage from 'page/error/index.jsx';
import UserList from 'page/user/index.jsx';
import Layout from 'component/layout/index.jsx';
import ProductRouter from 'page/product/router.jsx';


class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        let LayoutRouter = (
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/product" component={ProductRouter} />
                    <Route path="/product-category" component={ProductRouter} />
                    <Route path="/user/index" component={UserList} />
                    <Redirect exact from="/user" to="/user/index" />
                    <Route component={ErrorPage} />
                </Switch>
            </Layout>
        );

        return(
            /* Router只能有一个子组件，Switch只匹配第一个匹配到的东西 */
            <Router>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/" render={ props => LayoutRouter}/>
                </Switch>
               
            </Router>
        );
    }
}



ReactDOM.render(
    <App />,
    document.getElementById('app')
)