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
export const getUserList = (page: number, limit: number, options?: {
    search?: string;
    role?: string;
    status?: string;
    order_field?: string;
    order_type?: string;
    fields?: string;
}) => {
    return request({
        url: '/admin/getUserList',
        method: 'post',
        data: {
            page,
            limit,
            search: options?.search || null,
            role: options?.role || null,
            status: options?.status || null,
            order_field: options?.order_field || null,
            order_type: options?.order_type || null,
            fields: options?.fields || null,
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