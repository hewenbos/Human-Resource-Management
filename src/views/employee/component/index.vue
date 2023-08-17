<template>
    <el-cascader size="mini" style="width: 80%;" separator="-" :value="value" :options="options" :props="defaultProps"
        @change="handleChange"></el-cascader>
</template>

<script>
import { getDepartMentApi } from '@/api/department'
import { tansListToTreeData } from '@/utils/index'
export default {
    props: {
        value: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            options: [],
            defaultProps: {
                label: "name",
                value: "id"
            }
        };
    },
    methods: {
        handleChange(v) {
            if (v.length > 0) {
                this.$emit('input', v[v.length - 1])
            } else {
                this.$emit('input', null)
            }
        },
        async getDepartMent() {
            let { data } = await getDepartMentApi()
            this.options = tansListToTreeData(data, 0)
        }
    },
    computed: {},
    components: {},
    filters: {},
    watch: {},
    created() { this.getDepartMent() },
    mounted() { },
};
</script>

<style lang="less" scoped></style>