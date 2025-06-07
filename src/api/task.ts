import request from '../utils/request';
// 创建任务
export const createTask = (name) => {
    return request({
        url: '/task/createTask',
        method: 'post',
        data: {
            name: name
        }
    });
};
// 获取任务列表
export const getTaskList = (page,limit) => {
    return request({
        url: '/task/tasklist',
        method: 'post',
        data: {
            page: page || null,
            limit: limit || null
        }
    });
}
// 删除任务
export const deleteTask = (id) => {
    return request({
        url: '/task/deletetask',
        method: 'post',
        data: {
            id: id
        }
    });
}
// 更新任务
export const updateTask = (id,[name,status]) => {
    return request({
        url: '/task/updatetask',
        method: 'post',
        data: {
            id: id,
            name: name || null,
            status: status || null
        }
    });
}
// 任务操作上传文件
export const uploadTask = (task_id,[file1,file2,file3]) => {
    return request({
        url: '/task/upload',
        method: 'post',
        data: {
            task_id: task_id,
            file1: file1 || null,
            file2: file2 || null,
            file3: file3 || null,
        }
    });
}
// 获取任务详情
export const getTaskDetail = (task_id,[page,limit,search,sort,order]) => {
    return request({
        url: '/taskinfo/getTaskInfo',
        method: 'post',
        data: {
            task_id:task_id,
            page: page || null,
            limit: limit || null,
            search: search || null,
            sort: sort || null,
            order: order || null
        }
    });
}