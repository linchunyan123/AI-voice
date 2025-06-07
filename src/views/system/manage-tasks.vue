<template>
    <div>
        <TableSearch :query="query" :options="searchOpt" :search="handleSearch" />
        <div class="container">
            <TableCustom :columns="columns" :tableData="tableData" row-key="index" :has-pagination="false"
                :viewFunc="handleView" :delFunc="handleDelete" :editFunc="handleEdit">
                <!-- <template #toolbarBtn>
                    <el-button type="warning" :icon="CirclePlusFilled" @click="visible = true">新增</el-button>
                </template> -->
                <template #icon="{ rows }">
                    <el-icon>
                        <component :is="rows.icon"></component>
                    </el-icon>
                </template>
            </TableCustom>

        </div>
        <el-dialog :title="isEdit ? '编辑' : '新增'" v-model="visible" width="700px" destroy-on-close
            :close-on-click-modal="false" @close="closeDialog">
            <TableEdit :form-data="rowData" :options="options" :edit="isEdit" :update="updateData">
                <template #parent>
                    <el-cascader v-model="rowData.pid" :options="cascaderOptions" :props="{ checkStrictly: true }"
                        clearable />
                </template>
            </TableEdit>
        </el-dialog>
        <el-dialog title="查看详情" v-model="visible1" width="700px" destroy-on-close>
            <TableDetail :data="viewData">
                <template #icon="{ rows }">
                    <el-icon>
                        <component :is="rows.icon"></component>
                    </el-icon>
                </template>
            </TableDetail>
        </el-dialog>
    </div>
</template>

<script setup lang="ts" name="system-menu">
import { ref, reactive, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { CirclePlusFilled } from '@element-plus/icons-vue';
import TableCustom from '@/components/table-custom.vue';
import TableDetail from '@/components/table-detail.vue';
import { FormOption, FormOptionList } from '@/types/form-option';
import { Menus } from '@/types/menu';
import { menuData } from '@/components/menu';

// 定义任务类型
interface Task {
    id: number;
    uid: number;
    number: string;
    name: string;
    status: string;
    update_time: string;
    create_time: string;
}

// 添加假数据
const mockTasks = [
    {
        id: 1,
        uid: 1,
        number: 'TASK-2024-001',
        name: '视频转码任务',
        status: '进行中',
        update_time: '2024-03-20 10:00:00',
        create_time: '2024-03-20 10:00:00'
    },
    {
        id: 2,
        uid: 2,
        number: 'TASK-2024-002',
        name: '音频降噪处理',
        status: '已完成',
        update_time: '2024-03-20 11:00:00',
        create_time: '2024-03-20 11:00:00'
    },
    {
        id: 3,
        uid: 3,
        number: 'TASK-2024-003',
        name: '视频剪辑任务',
        status: '等待中',
        update_time: '2024-03-20 12:00:00',
        create_time: '2024-03-20 12:00:00'
    },
    {
        id: 4,
        uid: 4,
        number: 'TASK-2024-004',
        name: '音频格式转换',
        status: '进行中',
        update_time: '2024-03-20 13:00:00',
        create_time: '2024-03-20 13:00:00'
    },
    {
        id: 5,
        uid: 5,
        number: 'TASK-2024-005',
        name: '视频特效添加',
        status: '已完成',
        update_time: '2024-03-20 14:00:00',
        create_time: '2024-03-20 14:00:00'
    }
];

// 查询相关
const query = reactive({
    name: '',
});
const searchOpt = ref<FormOptionList[]>([
    { type: 'input', label: '任务名称：', prop: 'name' }
])
const handleSearch = () => {
    // changePage(1);
};

// 表格相关
let columns = ref([
    { prop: 'id', label: 'id'},
    { prop: 'uid', label: '序号' },
    { prop: 'number', label: '编号' },
    { prop: 'name', label: '名称' },
    { prop: 'status', label: '状态' },
    { prop: 'update_time', label: '更新时间' },
    { prop: 'create_time', label: '创建时间' },
    { prop: "operator", label: "操作" },
])

const getOptions = (data: any) => {
    return data.map(item => {
        const a: any = {
            label: item.title,
            value: item.id,
        }
        if (item.children) {
            a.children = getOptions(item.children)
        }
        return a
    })
}
const cascaderOptions = ref(getOptions(menuData));

// 修改表格数据
const tableData = ref<Task[]>([]);

// 修改获取数据的方法
const getData = async () => {
    // 模拟异步加载
    setTimeout(() => {
        tableData.value = mockTasks;
    }, 500);
};

// 添加onMounted钩子
onMounted(() => {
    getData();
});

// 新增/编辑弹窗相关
let options = ref<FormOption>({
    labelWidth: '100px',
    span: 12,
    list: [
        { type: 'input', label: '任务名称', prop: 'name', required: true },
        { type: 'input', label: '任务编号', prop: 'number', required: true },
        { type: 'select', label: '任务状态', prop: 'status', required: true },
    ]
})

const visible = ref(false);
const isEdit = ref(false);
const rowData = ref<any>({});

const handleEdit = (row: Task) => {
    rowData.value = { ...row };
    isEdit.value = true;
    visible.value = true;
};

const updateData = () => {
    closeDialog();
};

const closeDialog = () => {
    visible.value = false;
    isEdit.value = false;
};

// 查看详情弹窗相关
const visible1 = ref(false);
const viewData = ref({
    row: {},
    list: []
});

const handleView = (row: Task) => {
    viewData.value.row = { ...row }
    viewData.value.list = [
        {
            prop: 'id',
            label: '任务ID',
        },
        {
            prop: 'uid',
            label: '序号',
        },
        {
            prop: 'number',
            label: '任务编号',
        },
        {
            prop: 'name',
            label: '任务名称',
        },
        {
            prop: 'status',
            label: '任务状态',
        },
        {
            prop: 'update_time',
            label: '更新时间',
        },
        {
            prop: 'create_time',
            label: '创建时间',
        }
    ]
    visible1.value = true;
};

// 删除相关
const handleDelete = (row: Task) => {
    ElMessage.success('删除成功');
}
</script>

<style scoped></style>