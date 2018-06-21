import React from 'react';

// 通用分页组件
class TableList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isFirstLoading: true
        }
    }

    componentWillReceiveProps() {
        // 列表仅仅在第一次挂在时候，isFirstLoading为true
        this.setState({
            isFirstLoading: false
        })
    }

    render() {

        let tableHeader = this.props.tableHeads.map((tableHead, index) => {
           if(typeof tableHead === 'object') {
                return <th key={index} width={tableHead.width}>{tableHead.name}</th>
           } else {
               return <th key={index}>{tableHead}</th>
           }
        });

        let listBody = this.props.children;

        let listInfo = (
             <tr>
                <td colSpan={this.props.tableHeads.length} className="text-center">
                    {this.state.isFirstLoading ? '正在加载数据...' : '无法加载数据'}
                </td>
            </tr>
        );

        let tableBody = listBody.length > 0 ? listBody : listInfo;

        return (
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            {tableHeader}
                        </tr>
                        </thead>
                        <tbody>
                            {tableBody}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default TableList;