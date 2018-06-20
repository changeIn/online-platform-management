import React from 'react';

import MUtil from 'util/mm.jsx';
import User from 'service/user-service.jsx';
import './index.css';

const _mm = new MUtil();
const _user = new User();

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: _mm.getUrlParam('redirect') || '/'
        }
    }

    componentWillMount(){
        document.title = '登录 - MMall';
    }

    onInputChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    onInputKeyup(e) {
        // 回车键
        if(e.keyCode === 13) {
            this.onSubmit();
        }
    }

    onSubmit() {
        let loginInfo = {
            username: this.state.username,
            password: this.state.password
        };

        let checkResult = _user.checkLoginInfo(loginInfo);

        // 验证成功
        if(checkResult.status) {
            _user.login(loginInfo).then((res) => {
                // resolve
                _mm.setStorage('userInfo', res);
                this.props.history.push(this.state.redirect);
                
            }, (errMsg) => {
                // reject
                _mm.errorTips(errMsg);
            });
        } 
        // 验证失败
        else {
            _mm.errorTips(checkResult.msg);
        }
       
    }

   

    render() {
        return(
            <div className="col-md-4 col-md-offset-4">
                <div className="login-panel panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">欢迎登录MMall管理系统</h3>
                    </div>
                    <div className="panel-body">
                        <div>
                            <div className="form-group">
                                <input type="text"
                                    name="username"
                                    placeholder="请输入用户名" 
                                    className="form-control"
                                    autoComplete="off"
                                    autoFocus
                                    onKeyUp={(e) => this.onInputKeyup(e)}
                                    onChange={(e) => this.onInputChange(e)}
                                />
                            </div>
                            <div className="form-group">
                                <input type="password"
                                    name="password"
                                    placeholder="请输入密码" 
                                    className="form-control"
                                    onKeyUp={(e) => this.onInputKeyup(e)}
                                    onChange={(e) => this.onInputChange(e)}
                                />
                            </div>
                            <button className="btn btn-lg btn-primary btn-block"
                                onClick={() => this.onSubmit()}>
                                登录
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;