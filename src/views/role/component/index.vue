<template>
    <div>
        <el-dialog title="新增角色" :visible="dialogVisible" width="30%" @close="closeEvent">
            <el-form ref="ruleFrom" label-width="80px" :model="rouleFrom" :rules="rules">
                <el-form-item label="角色名称" prop="name">
                    <el-input style="width: 80%;" v-model="rouleFrom.name" size="mini" placeholder="请输入角色名称" />
                </el-form-item>
                <el-form-item label="启用">
                    <el-switch style="width: 80%;" v-model="rouleFrom.state" size="mini" :inactive-value="0"
                        active-value="1"></el-switch>
                </el-form-item>
                <el-form-item label="角色名称" prop="description">
                    <el-input style="width: 80%;" v-model="rouleFrom.description" size="mini" placeholder="请输入角色描述"
                        type="textarea" />
                </el-form-item>
            </el-form>
            <span slot="footer">
                <div style="text-align: center;">
                    <el-button @click="closeEvent" size="mini">取 消</el-button>
                    <el-button type="primary" size="mini" @click="onSubmit">确 定</el-button>
                </div>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {getAddRoleApi} from '@/api/role'
export default {
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            rouleFrom: {
                name: '',
                state: 0,
                description: ''
            },
            rules: {
                name: [
                    { required: true, message: '角色名称不能为空', trigger: 'blur' }
                ],
                description: [
                    { required: true, message: '角色描述不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        closeEvent() {
            this.$refs['ruleFrom'].resetFields()
            this.$emit('update:dialogVisible', false)
        },
        onSubmit() {
            this.$refs['ruleFrom'].validate(async(valid) => {
                if (valid) {
                    await getAddRoleApi(this.rouleFrom)
                    this.$message.success('添加角色成功')
                    this.$emit('noticeFather')
                    this.closeEvent()
                }
            })
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