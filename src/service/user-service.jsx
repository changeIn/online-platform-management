import MUtil from 'util/mm.jsx';
const _mm = new MUtil();

class User {
    login(loginInfo){
        return _mm.request({
            type: 'post',
            // 跨域处理（劫持）
            url: '/manage/user/login.do',
            data: loginInfo
        });
    }

    checkLoginInfo(loginInfo){
        let username = $.trim(loginInfo.username);
        let password = $.trim(loginInfo.password);

        if(typeof username !== 'string' || username.length === 0) {
            return {
                status: false,
                msg: '用户名不为空'
            }
        }

        if(typeof password !== 'string' || password.length === 0) {
            return {
                status: false,
                msg: '密码不为空'
            }
        }

        return {
            status: true,
            msg: '验证成功'
        }
    }

    logout() {
        return _mm.request({
            type: 'post',
            url:'/user/logout.do'
        });
    }
}

export default User;