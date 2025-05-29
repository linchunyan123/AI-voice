import request from '../utils/request';
// 登录
export const loginFn = (username, password) => {
    return request({
        url: '/user/login',
        method: 'post',
        data: {
            username: username,
            password: password
        }
    });
};
// 退出
export const loginoutFn = () => {
    return request({
        url: '/user/logout',
        method: 'post',
    });
};
// 创建用户
export const createuserFn = (username, password) => {
    return request({
        url: '/user/register',
        method: 'post',
        data: {
            username: username,
            password: password
        }
    });
};