<template>
    <div>
        <el-dialog title="分配权限" :visible="allocationdialog" @close="closePermi">
            <el-tree :default-checked-keys="allocation" show-checkbox :data="permissionList" :props="defaultProps"
                default-expand-all node-key="id"></el-tree>


            <span slot="footer">
                <el-button type="default" size="mini" @click="closePermi">取消</el-button>
                <el-button type="primary" size="mini" @click="confirmPermi">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getRoulePermissionApi, getRouleInfoApi, getEditPermissionApi } from '@/api/role'
import { tansListToTreeData } from '@/utils/index'
export default {
    props: {
        allocationdialog: {
            type: Boolean,
            default: false
        },
        allocationId: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            permissionList: [],
            defaultProps: {
                children: "children",
                label: "name"
            },
            allocation: []
        };
    },
    methods: {
        async getRoulePermission() {
            let { data } = await getRoulePermissionApi()
            this.permissionList = tansListToTreeData(data, 0)
        },
        async getRouleInfo() {

            let { data } = await getRouleInfoApi({ id: this.allocationId })

                this.allocation = data.permIds
                console.log(this.allocation);
            
        },
        closePermi() {
            this.$emit('update:allocationdialog', false)
            this.allocation=[]
        },
        async confirmPermi() {
            await getEditPermissionApi({ id: this.allocationId, permIds: this.allocation })
            this.$message.success('分配角色权限成功')
            this.closePermi()
        }
    },
    computed: {},
    components: {},
    filters: {},
    watch: {},
    created() {
        this.getRoulePermission()
        console.log(this.allocationId);
    },
    mounted() { },
};
</script>

<style lang="less" scoped></style>