<template>
  <div>
    <p>
      <el-button size="mini" type="primary">添加权限</el-button>
    </p>

    <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="id" border default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
      <el-table-column prop="name" label="名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="code" label="标识" sortable width="180">
      </el-table-column>
      <el-table-column prop="description" label="描述">
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template v-slot="{ row }">
          <el-button size="mini" type="text" v-if="row.pid == 0" @click="addPer(row)">添加</el-button>
          <el-button size="mini" type="text" @click="editPer(row)">编辑</el-button>
          <el-button size="mini" type="text" @click="delPer(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <permission-box :titleText="titleText" :showPermissionDialog.sync="showPermissionDialog" :pid="pid" :type="type"
      @updatePermi="getPermission" ref="permissionbox"></permission-box>
  </div>
</template>

<script>
import { getPermissionApi, getDelPermissionApi } from '@/api/permission'
import { tansListToTreeData } from '@/utils/index'
import permissionBox from './component/permissionBox.vue'
export default {
  data() {
    return {
      tableData: [],
      showPermissionDialog: false,
      titleText: '',
      pid: null,
      type: null
    };
  },
  methods: {
    async getPermission() {
      let { data } = await getPermissionApi()
      this.tableData = tansListToTreeData(data, 0)

    },
    delPer(id) {
      this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await getDelPermissionApi({ id: id })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.getPermission()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    addPer(row) {
      this.showPermissionDialog = true
      this.titleText = '新增权限点'

      this.pid = row.id
      this.type = row.type + 1
    },
    async editPer(row) {
      this.showPermissionDialog = true
      this.titleText = '编辑权限点'
      this.pid = row.id
      await this.$nextTick()
      this.$refs['permissionbox'].getInfoPermission()
    }
  },
  computed: {},
  components: { permissionBox },
  filters: {},
  watch: {},
  created() { this.getPermission() },
  mounted() { },
};
</script>

<style lang="less" scoped></style>