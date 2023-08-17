<template>
  <div class="login">
    <div class="imgBox">
    </div>
    <div class="right">
      <p class="title"><b>登录</b></p>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="mobile">
          <el-input v-model="ruleForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="ruleForm.password" placeholder="请输密码" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item prop="isAgree">
          <el-checkbox-group v-model="ruleForm.isAgree">
            <el-checkbox label="0" name="checked">用户平台使用协议</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" style="width: 100%;;" class="el-button-login" @click="submitForm">登录</el-button>
        </el-form-item>
      </el-form>
      <p style="color:red; font-size: 13px;">仅用于IT培训教学使用，为保障您的个人信息安全，请勿向平台录入任何个人敏感信息 (如手机号、身份证号等)!</p>
    </div>
  </div>
</template>

<script>
import { mapActions} from 'vuex';
export default {
  data() {
    const validateFn = (rule,value,callback) => {
        // value 要校验的值
        // rule 校验规则
        // callback 回调函数
        value? callback() : callback(new Error('您必须勾选用户的使用协议'))
    }
    return {
      ruleForm: {
        mobile: '13800000002',
        password: 'hm#qd@23!',
        isAgree: true
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3-9][0-9]{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 位之间', trigger: 'blur' }
        ],
        isAgree: [
          //自定义校验规则
          { validator: validateFn }
        ],
      },
    };
  },
  methods: {
    ...mapActions('user',['login']),
    submitForm() {
      //validate  对整个表单进行校验的方法，参数为一个回调函数  两个参数 是否校验成功Boolean 和 未通过校验的字段 Object
      //通过this.$refs获取表单实例
      this.$refs['ruleForm'].validate( async (valid) => {
        if (valid) {
          await this.login(this.ruleForm)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  
  },
  computed: {
   
  },
  components: {},
  filters: {},
  watch: {},
  created() { },
  mounted() { },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .imgBox {
    width: 60%;
    background: url(../../assets/login.png) no-repeat;
    height: 100vh;
    background-size: 100%;
  }

  .right {
    width: 28%;
    margin-right: 55px;

    .title {
      font-size: 25px;
    }
  }
}

.el-button-login {
  background-color: #2752fb;
  color: #fff;
  height: 40px;
}

.el-button-login:hover {
  opacity: 0.6;
}
</style>


<!-- 
  Number.isInteger() 判断是否是数字
 -->