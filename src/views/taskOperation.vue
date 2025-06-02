<template>
  <div class="operationBox">
    <el-tabs
      v-model="activeName"
      type="card"
      class="demo-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane label="任务操作" name="first">
        <el-tabs
          v-model="activeName1"
          class="demo-tabs1"
          @tab-click="handleClick1"
        >
          <el-tab-pane label="任务名称" name="first1">
            <ul class="taskInfoUl">
              <li>总文件 0个</li>
              <li>有效文件 0个</li>
              <li>已转写文件 0个</li>
              <li>已降噪文件 0个</li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="任务状态" name="second1">
            <ul class="taskInfoUl">
              <li>正在处理 0个</li>
              <li>已完成 0个</li>
              <li>空白任务 0个</li>
            </ul>
          </el-tab-pane>
        </el-tabs>
        <div class="fileBox">
          <div class="fileList">
            <ul>
              <li
                v-for="(file, index) in uploadFileList"
                :key="file.name"
                @mouseenter="file.isHover = true"
                @mouseleave="file.isHover = false"
              >
                <el-icon class="icon1" color="#909399"><Document /></el-icon>
                <div>{{ file.name }}</div>
                <el-icon class="icon2" v-if="!file.isHover" color="#67c23a"
                  ><SuccessFilled
                /></el-icon>
                <el-icon
                  class="icon3"
                  v-if="file.isHover"
                  color="#f56c6c"
                  @click="deleteFile(index)"
                  ><CircleClose
                /></el-icon>
              </li>
            </ul>
          </div>
          <div class="fileAction">
            <!-- <el-button class="btn" size="large" type="primary" @click="addFile"><el-icon><CirclePlus /></el-icon>添加文件</el-button> -->
            <div class="uploadBtn">
              <input type="file" multiple @change="handleFileChange" />
              <el-button type="primary" size="large"
                ><el-icon><CirclePlus /></el-icon>添加文件</el-button
              >
            </div>
            <el-button
              class="btn"
              size="large"
              type="primary"
              @click="detection"
              ><el-icon><Loading /></el-icon>启动检测</el-button
            >
            <el-button
              class="btn"
              size="large"
              type="primary"
              @click="transcription"
              ><el-icon><EditPen /></el-icon>启动转写</el-button
            >
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="文件检测" name="second">
        <el-tabs
          v-model="activeName2"
          class="demo-tabs2"
          @tab-click="handleClick2"
        >
          <el-tab-pane label="任务名称" name="first2">
            <ul class="taskInfoUl">
              <li>正在进行批量文件检测</li>
            </ul>
          </el-tab-pane>
        </el-tabs>
        <div class="fileBox2">
          <div class="item">文件选择成功,系统开始处理</div>
          <div class="item">文件总数量 20个</div>
          <div class="item">文件总大小 100M</div>
          <div class="item">文件总时长 50小时</div>
          <div class="item">预计检测时间 30分钟</div>
          <div class="item">处理进度：</div>
          <div class="demo-progress">
            <el-progress :percentage="percentage" :status="getStatus" />
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="文件转写" name="third">
        <el-tabs
          v-model="activeName3"
          class="demo-tabs3"
          @tab-click="handleClick3"
        >
          <el-tab-pane label="任务名称" name="first3">
            <ul class="taskInfoUl">
              <li>正在进行批量文件转写</li>
            </ul>
          </el-tab-pane>
        </el-tabs>
        <div class="fileBox3">
          <div class="item">文件选择成功,系统开始处理</div>
          <div class="item">文件总数量 100个</div>
          <div class="item">文件总大小 300M</div>
          <div class="item">文件总时长 50小时</div>
          <div class="item">预计检测时间 5小时</div>
          <div class="item">处理进度：</div>
          <div class="demo-progress">
            <el-progress :percentage="percentage3" :status="getStatus3" />
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="任务详情" name="fourth">
        <el-tabs
          v-model="activeName4"
          class="demo-tabs4"
          @tab-click="handleClick4"
        >
          <el-tab-pane label="任务名称" name="first4">
            <ul class="taskInfoUl">
              <li>总文件数 6个</li>
              <li>有效文件数 3个</li>
              <li>已转写文件 1个</li>
              <li>已降噪文件 2个</li>
            </ul>
          </el-tab-pane>
        </el-tabs>
        <div class="fileBox4">
          <TableSearch
            :query="query"
            :options="searchOpt"
            :search="handleSearch"
          />
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="selection" align="center" width="55" />

            <el-table-column label="文件名称" align="center" prop="filename" />
            <el-table-column label="大小" align="center" prop="size" />
            <el-table-column
              label="时长"
              align="center"
              prop="total_voice"
              show-overflow-tooltip
            />
            <el-table-column
              label="有效时长"
              align="center"
              prop="effective_voice"
            />
            <el-table-column label="语种" align="center" prop="language" />
            <el-table-column label="处理状态" align="center" prop="status" />

            <el-table-column label="操作" align="center" width="500">
              <!-- 你可以在这里放操作按钮 -->
              <template #default="scope">
                <el-button type="success" @click="dialogVisible = true"
                  ><el-icon><View /></el-icon>转写预览</el-button
                >
                <el-dropdown style="margin: 0 10px">
                  <el-button color="#626aef"
                    ><el-icon><Download /></el-icon> 转写下载<el-icon
                      class="el-icon--right"
                      ><arrow-down
                    /></el-icon>
                  </el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>带时间戳的转写文件</el-dropdown-item>
                      <el-dropdown-item>无时间戳转写文件</el-dropdown-item>
                      <el-dropdown-item>word文档</el-dropdown-item>
                      <el-dropdown-item>降噪文件</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
                <el-button type="primary" @click="toFile(1)"
                  ><el-icon><Search /></el-icon>文件查看</el-button
                >
                <el-button type="warning" @click="toFile(2)"
                  ><el-icon><MuteNotification /></el-icon>文件降噪</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <div class="operationBottom">
            <el-button type="primary" class="btn" @click="transcription"
              >选择文件转写</el-button
            >
            <el-pagination
              :current-page="page.index"
              :page-size="page.size"
              :page-sizes="[5, 10, 15, 20]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page.total"
              @size-change="changeSize"
              @current-change="changePage"
            />
          </div>
        </div>
        <el-dialog
          v-model="dialogVisible"
          title="转写预览"
          width="600"
          :style="{ height: '500px' }"
          :before-close="handleClose"
        >
          <span>转写的文本预览...</span>
          <template #footer>
            <div class="dialog-footer">
              <!-- <el-button @click="dialogVisible = false">Cancel</el-button> -->
              <el-button type="primary" @click="dialogVisible = false">
                确认
              </el-button>
            </div>
          </template>
        </el-dialog>
      </el-tab-pane>
    </el-tabs>
    <el-button
      v-for="button in buttons"
      :key="button.text"
      :type="button.type"
      class="returnBtn"
      text
      @click="() => $router.push({ name: 'task-management' })"
    >
      {{ button.text }}
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, reactive, nextTick, onMounted } from "vue";
import type { TabsPaneContext } from "element-plus";
import { ArrowDown } from "@element-plus/icons-vue";
import TableSearch from "@/components/operation-search.vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { getTaskDetail, uploadTask } from "@/api/task";
const id = ref("");
const isHover = ref(false);
const selectedFile = ref(null);
const uploadFileList = reactive([]);
import { useUploadStore } from "@/store/uploadStore";

const uploadStore = useUploadStore();

const handleFileChange = (event) => {
  const files = event.target.files;
  if (files && files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      uploadFileList.push({ name: file.name, isHover: false });
      console.log("上传文件:", file);
    }
  }
  uploadStore.setFiles(files);
};

const deleteFile = (index) => {
  uploadFileList.splice(index, 1);
};

const router = useRouter();

const dialogVisible = ref(false);

const handleClose = (done: () => void) => {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
import { fetchFileData } from "@/api";
// 查询相关
const query = reactive({
  fileType: "",
  status: "",
});
const handleSearch = () => {
  console.log("Searching...");
};
const searchOpt = ref<FormOptionList[]>([
  {
    type: "select",
    prop: "fileType",
    placeholder: "文件类型",
    activeValue: "全部文件",
    opts: [
      { label: "全部文件", value: "全部文件" },
      { label: "有效文件", value: "有效文件" },
    ],
  },
  {
    type: "select",
    prop: "status",
    placeholder: "文件状态/处理",
    activeValue: "已检测",
    opts: [
      { label: "已检测", value: "已检测" },
      { label: "已转写", value: "已转写" },
      { label: "已降噪", value: "已降噪" },
    ],
  },
]);
//下载
const downType = ref("");

// 分页相关
let returnData = reactive([]);
const tableData = ref([]);
const changeSize = (val: number) => {
  page.size = val;
  // getTaskDetail1();
};
const changePage = (val: number) => {
  page.index = val;
  getTaskDetail1();
};
// const getData = async () => {
//   const res = await fetchFileData();
//   returnData = res.data.list;
//   tableData.value = returnData.slice(
//     (currentPage.value - 1) * pageSize.value,
//     currentPage.value * pageSize.value
//   );
//   //   page.total = res.data.pageTotal;
//   // page.total = 2;
//   // page.size = 1;
// };
// getData();
// 进度条相关
const percentage = ref(90);
const percentage3 = ref(100);
// 状态只能是 '', 'success', 'exception', 'warning'
const getStatus = computed(() => {
  if (percentage.value === 100) return "success";
  return ""; // 默认值
});
const getStatus3 = computed(() => {
  if (percentage3.value === 100) return "success";
  return ""; // 默认值
});
const activeName = ref("first");
// const activeName = ref("fourth");
const activeName1 = ref("first1");
const activeName2 = ref("first2");
const activeName3 = ref("first3");
const activeName4 = ref("first4");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  nextTick(() => {
    (document.activeElement as HTMLElement | null)?.blur?.();
    // console.log(tab, event);
  });
};
const handleClick1 = (tab: TabsPaneContext, event: Event) => {
  nextTick(() => {
    (document.activeElement as HTMLElement | null)?.blur?.();
    // console.log(tab, event);
  });
};
const handleClick2 = (tab: TabsPaneContext, event: Event) => {
  nextTick(() => {
    (document.activeElement as HTMLElement | null)?.blur?.();
    // console.log(tab, event);
  });
};
const handleClick3 = (tab: TabsPaneContext, event: Event) => {
  nextTick(() => {
    (document.activeElement as HTMLElement | null)?.blur?.();
    // console.log(tab, event);
  });
};
const handleClick4 = (tab: TabsPaneContext, event: Event) => {
  nextTick(() => {
    (document.activeElement as HTMLElement | null)?.blur?.();
    // console.log(tab, event);
  });
};
const buttons = [{ type: "primary", text: "⬅ 返回任务管理" }] as const;
import { ElMessage, ElMessageBox } from "element-plus";
import type { UploadProps, UploadUserFile } from "element-plus";

const fileList = ref<UploadUserFile[]>([
  {
    name: "element-plus-logo.svg",
    url: "https://element-plus.org/images/element-plus-logo.svg",
  },
  {
    name: "element-plus-logo2.svg",
    url: "https://element-plus.org/images/element-plus-logo.svg",
  },
]);

const handleRemove: UploadProps["onRemove"] = (file, uploadFiles) => {
  console.log(file, uploadFiles);
};

const handlePreview: UploadProps["onPreview"] = (uploadFile) => {
  console.log(uploadFile);
};

const handleExceed: UploadProps["onExceed"] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  );
};

const beforeRemove: UploadProps["beforeRemove"] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfer of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  );
};
const detection = () => {
  // console.log("启动检测");
  activeName.value = "second";
  const uploadStore = useUploadStore();
  console.log("接收到的文件：", uploadStore.files);
};
const transcription = () => {
  // console.log("启动转写");
  activeName.value = "third";
  const uploadStore = useUploadStore();
  console.log("接收到的文件：", uploadStore.files);
};
// 去文件查看页面
const toFile = (index) => {
  // console.log(123,index);
  router.push({ path: "file-view", query: { index } });
};
// 获取文件详情
const page = reactive({
  index: 1,
  size: 5,
  total: 0,
});
const getTaskDetail1 = async () => {
  // const res = await getTaskDetail(id.value, page.index, page.size);
  // console.log(12345, res);
  const tableData1 = [
    {
      filename: "111",
      size: "10kb",
      total_voice: "10min",
      effective_voice: "5min",
      language: "english",
      status: "0",
    },
    {
      filename: "222",
      size: "11kb",
      total_voice: "15min",
      effective_voice: "7min",
      language: "chinese",
      status: "1",
    },
    {
      filename: "333",
      size: "13kb",
      total_voice: "18min",
      effective_voice: "8min",
      language: "english",
      status: "3",
    },
    {
      filename: "334",
      size: "13kb",
      total_voice: "18min",
      effective_voice: "8min",
      language: "english",
      status: "3",
    },
    {
      filename: "335",
      size: "13kb",
      total_voice: "18min",
      effective_voice: "8min",
      language: "english",
      status: "3",
    },
    {
      filename: "336",
      size: "13kb",
      total_voice: "18min",
      effective_voice: "8min",
      language: "english",
      status: "3",
    },
    {
      filename: "337",
      size: "13kb",
      total_voice: "18min",
      effective_voice: "8min",
      language: "english",
      status: "3",
    },
  ];
  tableData.value = tableData1.slice(page.index - 1, page.index * page.size);
  page.total = tableData1.length;
  // if (res.data.code === 200) {
  //   console.log(119, res);
  //   page.total = res.data.data.total;
  //   console.log(139, page.total);

  //   returnData = res.data.data.details;
  //   // const username = localStorage.getItem("vuems_name");
  //   // const updatedData = returnData.map((item) => ({
  //   //   ...item,
  //   //   man: username,
  //   // }));
  //   const statusMap: { [key: number]: string } = {
  //     1: "空任务",
  //     2: "已检测",
  //     3: "已转写",
  //     4: "处理中",
  //     5: "暂停中",
  //   };

  //   const updatedTwoData = returnData.map((item) => ({
  //     ...item,
  //     // man: 999,
  //     status: statusMap[item.status] || item.status, // 如果status不在映射中，保留原值
  //   }));

  //   // tableData.value = updatedTwoData;

  //   // tableData.value = returnData.slice(
  //   //   (page.index - 1) * page.size,
  //   //   page.index * page.size
  //   // );
  // } else if (res.data.code === 401) {
  //   router.push("/login");
  // }
};
const route = useRoute();
onMounted(() => {
  const index = route.query.index;
  id.value = route.query.id as string;
  console.log("查询参数 index:", index);
  console.log("查询参数 id:", id.value);
  if (index == "1") {
    activeName.value = "first";
  } else if (index == "2") {
    activeName.value = "second";
  } else if (index == "3") {
    activeName.value = "third";
  } else if (index == "4") {
    activeName.value = "fourth";
    getTaskDetail1();
  }
});
</script>

<style scoped lang="scss">
.operationBox {
  position: relative;
  width: 100%;
  height: 100%;
}
.demo-tabs1,
.demo-tabs2,
.demo-tabs3,
.demo-tabs4 {
  width: 96%;
  margin: 0 auto;
  border: 1px solid #dcdfe6;
  padding: 20px;
  border-radius: 10px;
  box-sizing: border-box;
  width: 96%;
  margin: 0 auto;
  border: 1px solid #dcdfe6;
  padding: 20px;
  border-radius: 10px;
  box-sizing: border-box;
}
.demo-tabs1 > .el-tabs__content {
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.demo-tabs {
  box-sizing: border-box;
}
.demo-tabs > .el-tabs__content {
  padding: 20px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.el-tabs {
  background-color: #fff;
  height: 100%;
}
::v-deep(.el-tabs__item.is-active) {
  border-bottom-color: #e4e7ed !important;
}
.returnBtn {
  position: absolute;
  right: 10px;
  top: 5px;
}
.taskInfoUl {
  list-style: none;
  display: flex;
  justify-content: space-between;
}
.fileBox,
.fileBox2,
.fileBox3,
.fileBox4 {
  width: 96%;
  height: 400px;
  border-radius: 10px;
  box-sizing: border-box;
  border: 1px solid #dcdfe6;
  display: flex;
  padding: 20px;
  margin: 0 auto;
  margin-top: 20px;
  .fileList {
    width: 60%;
    height: 90%;
    // background-color: aqua;
    border-radius: 10px;
    border: 1px solid #dcdfe6;
    ul {
      list-style: none;
      width: 96%;
      margin: 0 auto;
      margin-top: 10px;
      li {
        margin: 10px 0;
        display: flex;
        align-items: center;
        position: relative;
        color: #909399;
        cursor: pointer;
        .icon1 {
          margin-right: 5px;
        }
        .icon2,
        .icon3 {
          position: absolute;
          right: 0;
        }
      }
    }
  }
  .fileAction {
    margin-left: 100px;
    .btn {
      display: block;
      margin: 20px auto;
    }
    .uploadBtn {
      position: relative;
      cursor: pointer;
      input {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: red;
        opacity: 0;
        cursor: pointer;
      }
    }
  }
}
.fileBox2,
.fileBox3,
.fileBox4 {
  display: block;
  .item {
    margin: 20px 0;
  }
}
.fileBox4 {
  height: 600px;
  overflow-y: auto;
}
::v-deep(.el-upload-list) {
  //  background-color: red;
  position: fixed;
  left: 11%;
  top: 35%;
  width: 49%;
}
.el-upload-list__item {
  margin: 10px 0;
}
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  max-width: 600px;
}
.operationBottom {
  margin-top: 20px;
  display: flex;
  .btn {
    margin-right: 10px;
  }
}
.dialog-footer {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>
