<template>
  <div>
    <el-tree :data="data" :props="defaultProps" :default-expand-all="true">
      <template slot-scope="{node,data}">

        <el-row class="departRow" type="flex" justify="space-between">
          <el-col :span="3">
            {{ node.label }}
          </el-col>
          <el-col :span="3" class="rightCol">
            <span>{{ data.managerName }}</span>
            <el-dropdown @command="commandEvent($event, data)">
              <span class="el-dropdown-link">
                操作<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                <el-dropdown-item command="del">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </template>
    </el-tree>
    <!-- sync修饰符可以监听子组件传过来的 update:属性名的事件 将父组件修改-->
    <Dialoading ref="Dialoading" :showDialog.sync="showDialog" @updateDepart="getDepartMent" :nodeId="nodeId"
      :textTitle="textTitle"></Dialoading>
  </div>
</template>

<script>
import { getDepartMentApi, getDelComoanyApi } from '@/api/department'
import { tansListToTreeData } from '@/utils/index'
import Dialoading from './components/Dialoading'
export default {
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      showDialog: false,
      nodeId: null,
      textTitle: '新增'
    };
  },
  methods: {
    async getDepartMent() {
      let { data } = await getDepartMentApi()
      this.data = tansListToTreeData(data, 0)

    },
    commandEvent(commandId, data) {
      if (commandId == 'add') {
        this.showDialog = true
        this.nodeId = data.id
        this.textTitle = '新增'
      } else if (commandId == 'edit') {
        this.showDialog = true
        this.textTitle = '编辑'
        this.nodeId = data.id // props更新是异步的
        this.$nextTick(() => {
          this.$refs['Dialoading'].editBackfill() //refs 获取的组件实例 调用方法是同步的
        })
      } else if (commandId == 'del') {
        this.$alert('您确定要删除吗?', '删除', {
          confirmButtonText: '确定',
          callback: async action => {
            await getDelComoanyApi({ id: data.id })
            this.$message({
              type: 'success',
              message: `删除成功`
            });
            this.getDepartMent()
          }
        });

      }
    }
  },
  computed: {},
  components: { Dialoading },
  filters: {},
  watch: {},
  created() {
    this.getDepartMent()
  },
  mounted() { },
};
</script>

<style lang="scss" scoped>
.departRow {
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 13px;

  .rightCol {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .el-dropdown-link {
      font-size: 13px;
    }
  }


}

.departRow:hover {
  color: #409EFF;

}

::v-deep {
  .el-tree-node__content {
    margin: 8px 0;
  }
}
</style>