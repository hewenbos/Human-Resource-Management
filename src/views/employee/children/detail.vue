<template>
  <div>
    <div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">

        <el-row>
          <el-col :span="8" style="margin-left: 170px;">
            <el-form-item label="姓名" prop="username">
              <el-input v-model="ruleForm.username" size="mini" style="width: 80%;" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" style="margin-left: 170px;">
            <el-form-item label="工号">
              <el-input v-model="ruleForm.workNumber" size="mini" disabled style="width: 80%;" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" style="margin-left: 170px;">
            <el-form-item label="手机" prop="mobile">
              <el-input v-model="ruleForm.mobile" size="mini" style="width: 80%;" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" style="margin-left: 170px;">
            <el-form-item label="部门" prop="departmentId">
              <cascader v-model="ruleForm.departmentId"></cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" style="margin-left: 170px;">
            <el-form-item label="聘用形式" prop="formOfEmployment">
              <el-select v-model="ruleForm.formOfEmployment" size="mini" style="width: 80%;">
                <el-option label="正式" :value="1"></el-option>
                <el-option label="非正式" :value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" style="margin-left: 170px;">
            <el-form-item label="入职时间" prop="timeOfEntry">
              <el-date-picker value-format="yyyy-MM-dd" size="mini" style="width: 80%;" v-model="ruleForm.timeOfEntry"
                type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" style="margin-left: 170px;">
            <el-form-item label="转正时间" prop="correctionTime">
              <el-date-picker size="mini" style="width: 80%;" v-model="ruleForm.correctionTime" type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" style="margin-left: 170px;">
            <el-form-item label="上传头像" prop="correctionTime">
              <image-son v-model="ruleForm.staffPhoto"></image-son>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" style="margin-left: 170px;">
            <el-form-item>
              <template v-slot="{ row }">
                <el-button size="mini" type="primary" @click="onSubmit">保存</el-button>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

    </div>
  </div>
</template>

<script>
import { getEmployeeAddApi, getEmployeeInfoApi ,getEmployeeEditApi} from '@/api/employee'
import cascader from '../component/index'
import imageSon from '../component/image-son.vue';
export default {
  data() {
    const timevalidate = (rule, value, callback) => {
      if (this.ruleForm.timeOfEntry) {
        if (new Date(this.ruleForm.timeOfEntry) > new Date(value)) {
          callback(new Error('转正时间不能小于入职时间'))
          return
        }
      }

      callback()
    }
    return {
      ruleForm: {
        correctionTime: "",
        departmentId: null,
        formOfEmployment: '',
        mobile: "",
        staffPhoto: "",
        timeOfEntry: "",
        username: "",
        workNumber: "",
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { pattren: /^[\u4e00-\u9fa5]{2,5}$/, message: '用户名必须为中文', trigger: 'blur' },
          { min: 2, max: 5, message: '用户名最小为2位,最大为5位', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattren: /^1[3-9]\d{9}$/, message: '手机号格式错误', trigger: 'blur' },
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'change' },
        ],
        timeOfEntry: [
          { required: true, message: '入职时间不能为空', trigger: 'blur' },
        ],
        correctionTime: [
          { required: true, message: '转正时间不能为空', trigger: 'blur' },
          { validator: timevalidate }
        ],
        departmentId: [
          { required: true, message: '部门不能为空', trigger: 'blur' },
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          if (!this.$route.params.id) {

            await getEmployeeAddApi(this.ruleForm)
            this.$message.success('添加员工成功')
          } else {
            await getEmployeeEditApi(this.ruleForm)
            this.$message.success('编辑员工成功')
          }

          this.$router.push('/employee')
        }
      })
    },
    async getEmployeeInfo() {
     let {data} = await getEmployeeInfoApi({id:this.$route.params.id})
     this.ruleForm = data
    }
  },
  computed: {},
  components: { cascader ,imageSon},
  filters: {},
  watch: {},
  created() { this.$route.params.id && this.getEmployeeInfo() },
  mounted() { },
};
</script>

<style lang="less" scoped></style>


<!-- 
  封装级联选择器 options数据  props配置项  separator分割符 value选中项绑定值
  使用 v-model 绑定组件  v-model 是input事件 和 value属性 的简写 
  在 父组件的子组件标签上面使用 v-model="属性名"
  在子组件内部 用 props接收 value  绑定给级联选择器的value
  级联选择器触发change事件  自带一个参数选中节点的值 是一个数组 
  判断是否有值 有值取最后一位 通过 this.$emit触发input事件 将值传给父组件的 v-model
  没有值  通过 this.$emit触发input事件值为 null  将值传给父组件的 v-model
 -->