<template>
    <div>
        <el-dialog :title="textTitle" :visible="showDialog" @close="closeEvent">
            <el-form ref="ruleFrom" :model="formData" :rules="rules" label-width="120px">
                <el-form-item label="部门名称" prop="name">
                    <el-input v-model="formData.name" placeholder="2~10字符" style="width: 80%;" size="mini" />
                </el-form-item>
                <el-form-item label="部门编码" prop="code">
                    <el-input v-model="formData.code" placeholder="2~10字符" style="width: 80%;" size="mini" />
                </el-form-item>
                <el-form-item label="部门负责人" prop="managerId">
                    <el-select v-model="formData.managerId" placeholder="请选择负责人" style="width: 80%;">
                        <el-option v-for="item in simpleUserList" :label="item.username" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="部门介绍" prop="introduce">
                    <el-input v-model="formData.introduce" placeholder="2~10字符" style="width: 80%;" type="textarea"
                        size="mini" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center;">
                <el-button @click="closeEvent">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getDepartMentApi, getSimpleUserApi, getAddCompanyApi, getEditcompanyApi, getInfoCompanyApi } from '@/api/department'
export default {
    props: {
        showDialog: {
            type: Boolean,
            default: false
        },
        nodeId: {
            type: Number,
            default: null
        },
        textTitle: {
            type: String,
            default: ''
        }
    },
    data() {
        const validateCode = async (rule, value, callback) => {
            let { data } = await getDepartMentApi()
            if (this.textTitle == '新增') {
                if (data.some(item => item.code === value)) {
                    callback(new Error("部门已有编码"))
                } else {
                    callback()
                }
            } else {
                callback()
            }

        }

        const validateName = async (rule, value, callback) => {
            let { data } = await getDepartMentApi()
            if (this.textTitle == '新增') {
                if (data.some(item => item.name === value)) {
                    callback(new Error("已有此部门"))
                } else {
                    callback()
                }
            } else {
                callback()
            }

        }
        return {
            formData: {
                code: "", //编码
                introduce: "",//部门介绍
                managerId: "",//负责人
                name: "",//名称
                pid: ""//父级id 
            },
            rules: {
                code: [
                    { required: true, message: '编码不能为空', trigger: "blur" },
                    { min: 2, max: 10, message: "编码最小为2,最大为10", trigger: "blur" },
                    { validator: validateCode }
                ], //编码
                introduce: [
                    { required: true, message: '部门介绍不能为空', trigger: "blur" },
                    { min: 1, max: 100, message: "部门介绍最小为1,最大为100", trigger: "blur" }
                ],//部门介绍
                managerId: [
                    { required: true, message: '负责人不能为空', trigger: "change" },
                ],//负责人
                name: [
                    { required: true, message: '名称不能为空', trigger: "blur" },
                    { min: 2, max: 10, message: "名称最小为2,最大为10", trigger: "blur" },
                    { validator: validateName }
                ],//名称
            },
            simpleUserList: [],
            // departmentId: null,
            // createTime: null,
            // managerName: ''
        };
    },
    methods: {
        closeEvent() {
            //清空表单数据
            this.$refs['ruleFrom'].resetFields()
            
            this.$emit('update:showDialog', false)
        },
        async getSimpleUser() {
            let { data } = await getSimpleUserApi()
           
            this.simpleUserList = data
        },
        onSubmit() {
            this.$refs['ruleFrom'].validate(async (valid) => {
                if (valid) {

                    if (this.textTitle == '新增') {
                        await getAddCompanyApi({ ...this.formData, pid: this.nodeId })
                        //消息提示
                        this.$message.success('添加部门成功')
                    } else {
                        await getEditcompanyApi({ ...this.formData })
                        this.$message.success('更新部门成功')
                    }
                    //更新数据
                    this.$emit('updateDepart')
                    //关闭弹框
                    this.closeEvent()
                }
            })
        },
        async editBackfill() {
            let { data } = await getInfoCompanyApi({ id: this.nodeId })
            this.formData = data
        }
    },
    computed: {},
    components: {},
    filters: {},
    watch: {},
    created() { this.getSimpleUser() },
    mounted() { },
};
</script>

<style lang="less" scoped></style>