import React from 'react';
import { Switch, Redirect, Route, Link } from 'react-router-dom';

import ProductList from 'page/product/index/index.jsx';
import ProductSave from 'page/product/index/save.jsx';


class ProductRouter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Switch>
                <Route path="/product/index" component={ProductList} />
                <Route path="/product/save" component={ProductSave} />
                <Redirect exact from="/product" to="product/index" />
            </Switch>
        );
    }
}

export default ProductRouter;
