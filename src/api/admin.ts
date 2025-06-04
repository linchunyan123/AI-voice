import request from '../utils/request';
// 获取用户列表
export const getUserList = (username, password) => {
    return request({
        url: '/user/login',
        method: 'post',
        data: {
            username: username,
            password: password
        }
    });
};
// 获取任务列表
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