import request from '../utils/request';
// 创建任务
export const createTask = (name) => {
    return request({
        url: '/task/create',
        method: 'post',
        data: {
            name: name
        }
    });
};
// 获取任务列表
export const getTaskList = () => {
    return request({
        url: '/task/list',
        method: 'get'
    });
}