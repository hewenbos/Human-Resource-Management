<template>
  <div>
    <div class="header">
      <el-input style="width: 200px;" v-model="paramsUser.keyword" @input="searchChange" size="mini"
        prefix-icon="el-icon-search" placeholder="请输入员工姓名"></el-input>
      <div>
        <el-button  type="primary" size="mini" @click="$router.push('employee/detail')">添加员工</el-button>
        <el-button size="mini" @click="dialogVisible = true">excel导入</el-button>
        <el-button size="mini" @click="excelExport">excel导出</el-button>
      </div>
    </div>

    <div class="employeeMain">
      <div class="employeeLeft">
        <el-tree ref="tree" node-key="id" :data="TreeDate" :props="defaultProps" default-expand-all
          :expand-on-click-node="false" highlight-current @current-change="treeChange"></el-tree>
      </div>
      <div class="employeeRight">
        <el-table :data="userList" style="width: 100%" align="center">
          <el-table-column prop="date" label="头像" width="80">
            <template v-slot="{ row }">
              <el-avatar v-if="row.staffPhoto" :src="row.staffPhoto"></el-avatar>
              <el-avatar v-else> {{ row.username ? row.username.charAt(0) : '' }} </el-avatar>
            </template>
          </el-table-column>
          <el-table-column prop="username" label="姓名" width="100">
          </el-table-column>
          <el-table-column prop="mobile" label="手机号" width="120">
          </el-table-column>
          <el-table-column prop="workNumber" label="工号" width="120">
          </el-table-column>
          <el-table-column prop="formOfEmployment" label="聘用形式">
            <template v-slot="{ row }">
              <span>{{ row.formOfEmployment == 1 ? '正式' : '非正式' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="departmentName" label="部门" width="120">
          </el-table-column>
          <el-table-column prop="timeOfEntry" label="入职时间">
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template v-slot="{ row }">
              <el-button size="mini" type="text" @click="$router.push(`employee/detail/${row.id}`)">查看</el-button>
              <el-button size="mini" type="text" @click="roleEvent(row.id)">角色</el-button>
              <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="delStaff(row.id)">
                <el-button slot="reference" size="mini" type="text">删除</el-button>
              </el-popconfirm>

            </template>
          </el-table-column>
        </el-table>


        <div style="text-align: center;">
          <el-pagination :page-size="paramsUser.pagesize" :current-page="paramsUser.page"
            @current-change="handleCurrentChange" layout="total, prev, pager, next" :total="total">
          </el-pagination>
        </div>


        <exportFile :dialogVisible.sync="dialogVisible" @renewData="getEmployeeUser"></exportFile>
        <role-son :showroleDialog.sync="showroleDialog" :roleId="roleId" ref="role"></role-son>
      </div>
    </div>
  </div>
</template>

<script>
import { getEmployeeUserApi, getEmployeeDel, getUserExoprtApi } from '@/api/employee'
import { getDepartMentApi } from '@/api/department'
import { tansListToTreeData } from '@/utils/index'
import { saveAs } from 'file-saver'
import exportFile from './component/exportFile.vue'
import roleSon from './component/role-son.vue'
export default {
  data() {
    return {
      TreeDate: [],
      defaultProps: {
        "children": "children",
        "label": "name"
      },
      paramsUser: {
        departmentId: 1,
        page: 1,
        pagesize: 5,
        keyword: '',
      },
      total: 0,
      userList: [],
      timer: null,
      dialogVisible: false,
      showroleDialog: false,
      roleId:null
    };
  },
  methods: {
    async getDepartMent() {
      let { data } = await getDepartMentApi()
      this.TreeDate = tansListToTreeData(data, 0)


      this.paramsUser.departmentId = this.TreeDate[0].id

      this.$nextTick(() => {
        //tree树组件是异步所以放在 $nextTick
        this.$refs['tree'].setCurrentKey(this.paramsUser.departmentId)
      })
    },
    treeChange(node) {
      this.paramsUser.departmentId = node.id
      this.paramsUser.page = 1
      this.getEmployeeUser()
    },
    async getEmployeeUser() {
      let { data: { rows, total } } = await getEmployeeUserApi(this.paramsUser)
      this.total = total
      this.userList = rows
    },
    searchChange() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.paramsUser.page = 1
        this.getEmployeeUser()
      }, 300)
    },
    handleCurrentChange(currentPage) {
      this.paramsUser.page = currentPage
      this.getEmployeeUser()
    },
    async delStaff(id) {
      await getEmployeeDel({ id: id })
      this.$message.success('删除员工成功')
      this.getEmployeeUser()
    },
    async excelExport() {
      let res = await getUserExoprtApi()
      console.log(res);
      saveAs(res, '员工信息表.xlsx')
    },
    roleEvent(id) {
      this.showroleDialog = true
      this.roleId = id

      this.$nextTick(()=>{
        this.$refs['role'].getEmployeeInfo()
      })
    }
  },
  computed: {},
  components: { exportFile, roleSon },
  filters: {},
  watch: {},
  created() { this.getDepartMent(), this.getEmployeeUser() },
  mounted() { },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.employeeMain {
  margin-top: 10px;
  display: flex;

  // align-items: center;
  .employeeLeft {
    width: 270px;
  }

  .employeeRight {
    flex: 1;
  }
}

::v-deep {
  .el-tree-node__content {
    margin: 5px 0;
  }

  .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    color: #2752fb;
  }
}
</style>