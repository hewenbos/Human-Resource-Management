<template>
  <el-dialog title="分配角色" :visible="showroleDialog" @close="closeEvent">
    <el-checkbox-group v-model="roleIds">
      <el-checkbox :label="item.id" v-for="item in checkList" :key="item.id">{{ item.name }}</el-checkbox>
    </el-checkbox-group>

    <span slot="footer">
      <el-button type="default" size="mini" @click="closeEvent">取消</el-button>
      <el-button type="primary" size="mini" @click="confirmEvent">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRoleInfoApi, getEmployeeInfoApi, getAssginApi } from '@/api/employee'
export default {
  props: {
    showroleDialog: {
      type: Boolean,
      default: false
    },
    roleId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      checkList: [],
      roleIds: []
    };
  },
  methods: {
    async getRoleInfo() {
      try {
        let { data } = await getRoleInfoApi()
        this.checkList = data
      } catch (error) {
        console.log(error);
      }
    },
    async getEmployeeInfo() {

      try {
        let { data } = await getEmployeeInfoApi({ id: this.roleId })
        this.roleIds = data.roleIds
      } catch (error) {
        console.log(new Error(error));
      }
    },

    closeEvent() {
      this.$emit('update:showroleDialog', false)
      this.roleIds = []
    },
    async confirmEvent() {
      await getAssginApi({id:this.roleId,roleIds:this.roleIds})
      this.$message.success('分配角色成功')
      this.closeEvent()
    }
  },
  computed: {},
  components: {},
  filters: {},
  watch: {},
  created() { this.getRoleInfo() },
  mounted() { },
};
</script>

<style lang="less" scoped></style>