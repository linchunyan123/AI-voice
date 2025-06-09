<template>
    <div>
        <TableSearch :query="query" :options="searchOpt" :search="handleSearch" />
        <div class="container">
            <TableCustom :columns="columns" :tableData="tableData" :total="page.total" :viewFunc="handleView"
                :delFunc="handleDelete" :page-change="changePage" :editFunc="handleEdit" :pageSize="page.size"
                :currentPage="page.index" :changeSize="changeSize" :changePage="changePage">
                <!-- <template #toolbarBtn>
                    <el-button type="warning" :icon="CirclePlusFilled" @click="visible = true">新增</el-button>
                </template> -->
                <template #status="{ rows }">
                    <el-tag type="success" v-if="rows.status">启用</el-tag>
                    <el-tag type="danger" v-else>禁用</el-tag>
                </template>
                <template #permissions="{ rows }">
                    <el-button type="primary" size="small" plain @click="handlePermission(rows)">管理</el-button>
                </template>
            </TableCustom>
        </div>
        <el-dialog :title="isEdit ? '编辑' : '新增'" v-model="visible" width="700px" destroy-on-close
            :close-on-click-modal="false" @close="closeDialog">
            <TableEdit :form-data="rowData" :options="options" :edit="isEdit" :update="updateData" />
        </el-dialog>
        <el-dialog title="查看详情" v-model="visible1" width="700px" destroy-on-close>
            <TableDetail :data="viewData">
                <template #status="{ rows }">
                    <el-tag type="success" v-if="rows.status">启用</el-tag>
                    <el-tag type="danger" v-else>禁用</el-tag>
                </template>
            </TableDetail>
        </el-dialog>
        <el-dialog title="权限管理" v-model="visible2" width="500px" destroy-on-close>
            <RolePermission :permiss-options="permissOptions" />
        </el-dialog>
    </div>
</template>

<script setup lang="ts" name="system-role">
import { ref, reactive, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { fetchRoleData } from '@/api';
import { getUserList, DeleteUser } from '@/api/admin';
import TableCustom from '@/components/table-custom.vue';
import TableDetail from '@/components/table-detail.vue';
import RolePermission from './role-permission.vue'
import { CirclePlusFilled } from '@element-plus/icons-vue';
import { FormOption, FormOptionList } from '@/types/form-option';
import { useRouter } from "vue-router";

const router = useRouter();

// 查询相关
const query = reactive({
    name: '',
});
const searchOpt = ref<FormOptionList[]>([
    { type: 'input', label: '用户名称：', prop: 'name' }
])
const handleSearch = () => {
    page.index = 1;  // 重置页码
    getData();       // 直接调用获取数据
};

// 表格相关
let columns = ref([
    { prop: 'id', label: '序号', width: 55, align: 'center' },
    { prop: 'username', label: '用户名称' },
    { prop: 'password', label: '密码' },
    { prop: 'nickname', label: '昵称' },
    { prop: 'role', label: '角色' },
    { prop: 'status', label: '状态' },
    { prop: 'update_time', label: '更新时间' },
    { prop: 'create_time', label: '创建时间' },
    { prop: "operator", label: "操作" },
])

// 定义用户类型
interface User {
    id: number;
    username: string;
    password: string;
    nickname: string;
    role: string;
    status: boolean;
    update_time: string;
    create_time: string;
}

// 添加假数据
// const mockData = [
//     {
//         id: 1,
//         username: 'admin',
//         password: '******',
//         nickname: '管理员',
//         role: '超级管理员',
//         status: true,
//         update_time: '2024-03-20 10:00:00',
//         create_time: '2024-03-20 10:00:00'
//     },
//     {
//         id: 2,
//         username: 'user1',
//         password: '******',
//         nickname: '张三',
//         role: '普通用户',
//         status: true,
//         update_time: '2024-03-20 11:00:00',
//         create_time: '2024-03-20 11:00:00'
//     },
//     {
//         id: 3,
//         username: 'user2',
//         password: '******',
//         nickname: '李四',
//         role: '普通用户',
//         status: false,
//         update_time: '2024-03-20 12:00:00',
//         create_time: '2024-03-20 12:00:00'
//     },
//     {
//         id: 4,
//         username: 'editor',
//         password: '******',
//         nickname: '王五',
//         role: '编辑',
//         status: true,
//         update_time: '2024-03-20 13:00:00',
//         create_time: '2024-03-20 13:00:00'
//     },
//     {
//         id: 5,
//         username: 'viewer',
//         password: '******',
//         nickname: '赵六',
//         role: '访客',
//         status: true,
//         update_time: '2024-03-20 14:00:00',
//         create_time: '2024-03-20 14:00:00'
//     }
// ];

const page = reactive({
    index: 1,
    size: 5,
    total: 0,
})
const tableData = ref<User[]>([]);

// 修改获取数据的方法
const getData = async () => {
    try {
        const res = await getUserList(page.index, page.size, {
            search: query.name,
            order_field: 'id',
            order_type: 'desc'
        });
        console.log(188, res);

        if (res.data.code === 200) {
            tableData.value = res.data.data.list;
            page.total = res.data.data.total;
        } else {
            ElMessage.error(res.data.data.msg || '获取用户列表失败');
        }
    } catch (error) {
        console.error('获取用户列表出错:', error);
        ElMessage.error('获取用户列表失败');
    }
};

// 添加onMounted钩子
onMounted(() => {
    getData();
});

const changePage = (val: number) => {
  page.index = val;
  getData();
};
const changeSize = (val: number) => {
  page.size = val;
  getData();
};

// 新增/编辑弹窗相关
const options = ref<FormOption>({
    labelWidth: '100px',
    span: 24,
    list: [
        { type: 'input', label: '序号', prop: 'id' },
        { type: 'input', label: '用户名称', prop: 'username' },
        { type: 'input', label: '角色', prop: 'role' },
        { type: 'input', label: '状态', prop: 'status' },
        { type: 'input', label: '更新时间', prop: 'update_time' },
        { type: 'input', label: '创建时间', prop: 'create_time' },
        // { type: 'switch', label: '状态', prop: 'status', required: false, activeText: '启用', inactiveText: '禁用' },
    ]
})
const visible = ref(false);
const isEdit = ref(false);
const rowData = ref({});
const handleEdit = (row: User) => {
    rowData.value = { ...row };
    isEdit.value = true;
    visible.value = true;
};
const updateData = () => {
    closeDialog();
    getData();
};
const closeDialog = () => {
    visible.value = false;
    isEdit.value = false;
    rowData.value = {};
};

// 查看详情弹窗相关
const visible1 = ref(false);
const viewData = ref({
    row: {},
    list: [],
    column: 1
});
const handleView = (row: User) => {
    viewData.value.row = { ...row }
    viewData.value.list = [
        {
            prop: 'id',
            label: '序号',
        },
        {
            prop: 'username',
            label: '用户名称',
        },
        {
            prop: 'nickname',
            label: '昵称',
        },
        {
            prop: 'role',
            label: '角色',
        },
        {
            prop: 'status',
            label: '状态',
        },
        {
            prop: 'update_time',
            label: '更新时间',
        },
        {
            prop: 'create_time',
            label: '创建时间',
        },
    ]
    visible1.value = true;
};

// 删除相关
const handleDelete = async (row) => {
    try {
        const res = await DeleteUser([row.id]);
        if (res.data.code === 200) {
            ElMessage.success("删除成功");
            // 重新获取列表数据
            getData();
        } else if (res.data.code === 401) {
            router.push("/login");
        } else {
            ElMessage.error(res.data.message || "删除失败");
        }
    } catch (error) {
        console.error("删除任务失败:", error);
        ElMessage.error("删除失败，请稍后重试");
    }
}


// 权限管理弹窗相关
const visible2 = ref(false);
const permissOptions = ref({})
const handlePermission = (row: User) => {
    visible2.value = true;
    permissOptions.value = {
        id: row.id,
        role: row.role
    };
}
</script>

<style scoped>
.container{
    height: 600px;
    overflow-y: auto;
}
</style>