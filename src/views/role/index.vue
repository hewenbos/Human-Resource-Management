<template>
  <div>
    <p>
      <el-button type="primary" @click="addRole" size="mini">添加角色</el-button>
    </p>
    <el-table :data="rowList" style="width: 100%">
      <el-table-column label="序号" width="50">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="角色">

        <template v-slot="{ row }">
          <el-input v-model="row.editRow.name" v-if="row.isEdit" />
          <span v-else>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="启用">
        <template v-slot="{ row }">
          <el-switch v-if="row.isEdit" v-model="row.editRow.state" active-color="#13ce66" inactive-color="#ff4949"
            :active-value="1" :inactive-value="0">
          </el-switch>

          <span v-else>{{ row.state == 1 ? '启用' : row.state == 0 ? '未启用' : '无' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述">
        <template v-slot="{ row }">
          <el-input v-model="row.editRow.description" v-if="row.isEdit" />
          <span v-else>{{ row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <div v-if="!scope.row.isEdit">
            <el-button type="text" size="small" @click="allocation(scope.row.id)">分配权限</el-button>
            <el-button style="margin-right: 10px;" type="text" size="small" @click="editEvent(scope.row)">编辑</el-button>



            <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="determineDel(scope.row)">
              <el-button type="text" size="small" slot="reference">删除</el-button>
            </el-popconfirm>
          </div>
          <div v-if="scope.row.isEdit">
            <el-button type="primary" plain size="small" @click="determine(scope.row)">确定</el-button>
            <el-button type="primary" plain size="small" @click="cancellation(scope.row)">取消</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>


    <div style="text-align: center; margin: 15px 0;">
      <el-pagination :page-size="5" :current-page.sync="page.page" @current-change="handleCurrentChange"
        layout="prev, pager, next" :total="page.total">
      </el-pagination>
    </div>


    <Dialog :dialogVisible.sync="dialogVisible" @noticeFather="getRoleList"></Dialog>
    <allocationDialog :allocationdialog.sync="allocationdialog" ref="allocations" :allocationId="allocationId">
    </allocationDialog>
  </div>
</template>

<script>
import { getRoleListApi, getRoleEditApi, getDelRoleApi } from '@/api/role'
import Dialog from './component/index'
import allocationDialog from './component/allocationDialog.vue';
export default {
  data() {
    return {
      page: {
        page: 1,
        pagesize: 5,
        total: 0
      },
      rowList: [],
      dialogVisible: false,
      allocationdialog: false,
      allocationId: null
    };
  },
  methods: {
    //角色列表接口
    async getRoleList() {
      let { data: { rows, total } } = await getRoleListApi(this.page)
      this.page.total = total
      this.rowList = rows


      this.rowList.forEach(item => {
        //因为v2直接添加属性不是响应式的所以 要使用this,.$set来添加
        //给所有数据添加编辑状态
        this.$set(item, 'isEdit', false)


        //添加一份要修改的数据, 如果使用原数据点击取消就会改变原数据
        this.$set(item, 'editRow', {
          name: item.name,
          state: item.state,
          description: item.description
        })
      })
    },


    editEvent(row) {
      //让编辑状态为true
      row.isEdit = true
      //点击编辑 让editrow里的数据 和 原数据一致
      row.editRow.state = row.state
      row.editRow.name = row.name
      row.editRow.description = row.description
    },

    cancellation(row) {
      row.isEdit = false
    },

    async determine(row) {
      //点击确定判断 是否为空
      if (!row.editRow.name || !row.editRow.description) {
        //为空弹出提示
        this.$message.warning('角色和描述不能为空')
      } else {
        //否则调用接口
        await getRoleEditApi({ ...row.editRow, id: row.id })
        this.$message.success('更新角色成功')
        //使用浅拷贝 让原数据与 editRow数据一致
        Object.assign(row, {
          ...row.editRow,
          isEdit: false
        })
      }
    },

    handleCurrentChange(currentPage) {
      this.page.page = currentPage
      this.getRoleList()
    },
    async determineDel(row) {
      console.log(111);
      await getDelRoleApi({ id: row.id })
      this.$message.success('删除角色成功')
      this.getRoleList()
    },


    addRole() {
      this.dialogVisible = true
    },
    allocation(id) {
      this.allocationdialog = true
      this.allocationId = id
      this.$nextTick(() => {
        this.$refs['allocations'].getRouleInfo()
      })

    }

  },
  computed: {},
  components: { Dialog, allocationDialog },
  filters: {},
  watch: {},
  created() { this.getRoleList() },
  mounted() { },
};
</script>

<style lang="less" scoped></style>