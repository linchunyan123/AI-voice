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
export const getTaskList = (page,limit) => {
    return request({
        url: '/task/list',
        method: 'post',
        data: {
            page: page,
            limit: limit
        }
    });
}
// 任务操作上传文件
export const uploadTask = (tid,[file1,file2]) => {
    return request({
        url: '/task/upload',
        method: 'post',
        data: {
            tid: tid,
            file1: file1 || null,
            file2: file2 || null
        }
    });
}
// 获取任务详情
export const getTaskDetail = (tid,page,limit) => {
    return request({
        url: '/task/detail',
        method: 'post',
        data: {
            tid:tid,
            page: page,
            limit: limit
        }
    });
}