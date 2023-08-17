<template>
    <el-dialog :title="titleText" :visible="showPermissionDialog" @close="closeEvent">
        <el-form label-width="100px" :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item label="权限名称" prop="name">
                <el-input v-model="ruleForm.name" size="mini" style="width:80%;" />
            </el-form-item>
            <el-form-item label="权限标识" prop="code">
                <el-input v-model="ruleForm.code" size="mini" style="width:80%;" />
            </el-form-item>
            <el-form-item label="权限描述">
                <el-input v-model="ruleForm.description" size="mini" style="width:80%;" />
            </el-form-item>
            <el-form-item label="开启">
                <el-switch v-model="ruleForm.enVisible" :inactive-value="0" active-value="1"></el-switch>
            </el-form-item>
        </el-form>

        <div style="text-align: center;">
            <el-button size="mini" type="primary" @click="onsubmit">确定</el-button>
            <el-button size="mini" type="default" @click="closeEvent">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { getAddPermissionApi, getInfoPermissionApi ,getEditPermissionApi} from '@/api/permission'
export default {
    props: {
        titleText: {
            type: String,
            default: ''
        },

        showPermissionDialog: {
            type: Boolean,
            default: false
        },

        type: {
            type: Number,
            default: null
        },

        pid: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            ruleForm: {
                code: "",
                description: "",
                enVisible: "",
                name: "",
            },
            rules: {
                code: [
                    { required: true, message: '权限标识不能为空', trigger: 'blur' },
                ],
                name: [
                    { required: true, message: '权限名称不能为空', trigger: 'blur' },
                ]
            }
        };
    },
    methods: {
        closeEvent() {
            this.$emit('update:showPermissionDialog', false)
            this.$refs['ruleForm'].resetFields()
        },
        onsubmit() {

            this.$refs['ruleForm'].validate(async (valid) => {
                if (valid) {
                    
                    if(this.ruleForm.id){
                        //编辑
                        await getEditPermissionApi(this.ruleForm)
                        this.$message.success('修改权限成功')
                    }else{
                        //添加
                        await getAddPermissionApi({ ...this.ruleForm, pid: this.pid, type: this.type })
                    this.$message.success('添加权限成功')
                    }
                    
                    this.closeEvent()
                    this.$emit('updatePermi')
                }
            })
        },
        async getInfoPermission() {
            let { data } = await getInfoPermissionApi({ id: this.pid })
            this.ruleForm = data
        }
    },
    computed: {},
    components: {},
    filters: {},
    watch: {},
    created() { },
    mounted() { },
};
</script>

<style lang="less" scoped></style>