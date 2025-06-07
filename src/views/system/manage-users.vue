<template>
    <div>
        <TableSearch :query="query" :options="searchOpt" :search="handleSearch" />
        <div class="container">

            <TableCustom :columns="columns" :tableData="tableData" :total="page.total" :viewFunc="handleView"
                :delFunc="handleDelete" :page-change="changePage" :editFunc="handleEdit">
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
import TableCustom from '@/components/table-custom.vue';
import TableDetail from '@/components/table-detail.vue';
import RolePermission from './role-permission.vue'
import { CirclePlusFilled } from '@element-plus/icons-vue';
import { FormOption, FormOptionList } from '@/types/form-option';

// 查询相关
const query = reactive({
    name: '',
});
const searchOpt = ref<FormOptionList[]>([
    { type: 'input', label: '用户名称：', prop: 'name' }
])
const handleSearch = () => {
    changePage(1);
};

// 表格相关
let columns = ref([
    { prop: 'id', label: '序号', width: 55, align: 'center' },
    { prop: 'username', label: '用户名称' },
    { prop: 'password', label: '密码' },
    { prop: 'nickname', label: '昵称' },
    { prop: 'role', label: '角色' },
    { prop: 'status', label: '状态'},
    { prop: 'update_time', label: '更新时间'},
    { prop: 'create_time', label: '创建时间'},
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
const mockData = [
    {
        id: 1,
        username: 'admin',
        password: '******',
        nickname: '管理员',
        role: '超级管理员',
        status: true,
        update_time: '2024-03-20 10:00:00',
        create_time: '2024-03-20 10:00:00'
    },
    {
        id: 2,
        username: 'user1',
        password: '******',
        nickname: '张三',
        role: '普通用户',
        status: true,
        update_time: '2024-03-20 11:00:00',
        create_time: '2024-03-20 11:00:00'
    },
    {
        id: 3,
        username: 'user2',
        password: '******',
        nickname: '李四',
        role: '普通用户',
        status: false,
        update_time: '2024-03-20 12:00:00',
        create_time: '2024-03-20 12:00:00'
    },
    {
        id: 4,
        username: 'editor',
        password: '******',
        nickname: '王五',
        role: '编辑',
        status: true,
        update_time: '2024-03-20 13:00:00',
        create_time: '2024-03-20 13:00:00'
    },
    {
        id: 5,
        username: 'viewer',
        password: '******',
        nickname: '赵六',
        role: '访客',
        status: true,
        update_time: '2024-03-20 14:00:00',
        create_time: '2024-03-20 14:00:00'
    }
];

const page = reactive({
    index: 1,
    size: 10,
    total: 0,
})
const tableData = ref<User[]>([]);

// 修改获取数据的方法
const getData = async () => {
    // 模拟异步加载
    setTimeout(() => {
        tableData.value = mockData;
        page.total = mockData.length;
    }, 500);
};

// 添加onMounted钩子
onMounted(() => {
    getData();
});

const changePage = (val: number) => {
    page.index = val;
    getData();
};

// 新增/编辑弹窗相关
const options = ref<FormOption>({
    labelWidth: '100px',
    span: 24,
    list: [
        { type: 'input', label: '角色名称', prop: 'name', required: true },
        { type: 'input', label: '角色标识', prop: 'key', required: true },
        { type: 'switch', label: '状态', prop: 'status', required: false, activeText: '启用', inactiveText: '禁用' },
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
            label: '角色ID',
        },
        {
            prop: 'name',
            label: '角色名称',
        },
        {
            prop: 'key',
            label: '角色标识',
        },
        {
            prop: 'status',
            label: '角色状态',
        },
    ]
    visible1.value = true;
};

// 删除相关
const handleDelete = (row: User) => {
    ElMessage.success('删除成功');
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

<style scoped></style>