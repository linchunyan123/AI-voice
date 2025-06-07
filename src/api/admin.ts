import request from '../utils/request';
// 更新用户状态
export const updateUserStatus = ([uid, status]) => {
    return request({
        url: '/admin/updateUserStatus',
        method: 'post',
        data: {
            uid: uid || null,
            status: status || null
        }
    });
};
// 删除用户
export const DeleteUser = ([uid]) => {
    return request({
        url: '/admin/deleteuser',
        method: 'post',
        data: {
            uid: uid || null
        }
    });
};
// 获取用户列表
export const getUserList = (page, limit,search,role,status,order_field,order_type,fields) => {
    return request({
        url: '/admin/getUserList',
        method: 'post',
        data: {
            page: page,
            limit: limit,
            search: search,
            role: role,
            status: status,
            order_field: order_field,
            order_type: order_type,
            fields: fields,
        }
    });
};
// // 获取任务列表
// export const loginFn = (username, password) => {
//     return request({
//         url: '/user/login',
//         method: 'post',
//         data: {
//             username: username,
//             password: password
//         }
//     });
// };