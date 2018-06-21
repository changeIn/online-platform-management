import React from 'react';

import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

const _mm = new MUtil();
const _product = new Product();

import './category-selector.scss';

class CategorySelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstCategoryList: [],
            firstCategoryId: 0,
            secondCategoryList: [],
            secondCategoryId: 0
        }
    }

    componentDidMount() {
        this.loadFirstCategory();
    }

    loadFirstCategory() {
        _product.getCategoryList().then(res => {
            this.setState({
                firstCategoryList: res
            })
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    }

    loadSecondCategory() {
        _product.getCategoryList(this.state.firstCategoryId).then(res => {
            this.setState({
                secondCategoryList: res
            })
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    }

    onFirstCategoryChange(e) {
        let newValue = e.target.value || 0;
        this.setState({
            firstCategoryId: newValue,
            secondCategoryId: 0,
            secondCategoryList: []
        }, () => {
            // 更新二级分类
            this.loadSecondCategory();
            this.onPropsCategoryChange();
        });
    }

    onSecondCategoryChange(e) {
        let newValue = e.target.value || 0;
        this.setState({
            secondCategoryId: newValue
        }, () => {
            // 传递给父组件
            this.onPropsCategoryChange();
        });
    }

    // 传给父组件选中的CategoryId（结果）
    onPropsCategoryChange() {
        let categoryChangable = typeof this.props.onCategoryChange === 'function';
        if(this.state.secondCategoryId) {
            // 不为0
            categoryChangable && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId);
        } else {
            categoryChangable && this.props.onCategoryChange(this.state.firstCategoryId, 0);
        }
    }

    render() {
        return(
            <div className="col-md-10">
                <select className="form-control category-select" onChange={(e)=>this.onFirstCategoryChange(e)} >
                    <option value="">请选择一级分类</option>
                    {
                        this.state.firstCategoryList.map((category, index) => {
                            return (
                                <option value={category.id} key={index}>{category.name}</option>
                            );
                        })
                    }
                </select>

                {this.state.secondCategoryList.length > 0 ?
                    (<select className="form-control category-select" onChange={(e)=>this.onSecondCategoryChange(e)} >
                        <option value="">请选择二级分类</option>
                        {
                            this.state.secondCategoryList.map((category, index) => {
                                return (
                                    <option value={category.id} key={index}>{category.name}</option>
                                );
                            })
                        }
                    </select>) : null
                }
            </div>
        );
    }
}

export default CategorySelector;
