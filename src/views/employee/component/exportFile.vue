<template>
    <el-dialog title="员工导入" :visible="dialogVisible" width="35%" @close="$emit('update:dialogVisible', false)">

        <el-row type="flex" justify="center">
            <div class="dialogBox">
                <input ref="fileInput" @change="fileChange" class="dialogInput" type="file" />

                <i class="el-icon-upload"></i>
                <p style="margin: 0;"><el-button type="text" @click="download">下载导入模块</el-button></p>
                <p>
                    将文件拖到此处或
                    <el-button type="text" @click="clickFile">点击上传</el-button>
                </p>
            </div>
        </el-row>
        <el-row type="flex" justify="end">
            <el-button type="primary" size="mini" @click="$emit('update:dialogVisible', false)">取消</el-button>
        </el-row>
    </el-dialog>
</template>

<script>
import { saveAs } from 'file-saver'
import { getUserImportApi, getDownloadApi } from '@/api/employee'
export default {
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        clickFile() {
            this.$refs['fileInput'].click()
        },
        async fileChange(event) {
            //文件信息
            console.log(event.target.files);

            const formdata = new FormData()
            //将文件信息转为FormData对象
            formdata.append('file', event.target.files[0])

            try {
                //可能报错的代码
                await getUserImportApi(formdata)

                //刷新数据
                this.$emit('renewData')

                //关闭弹框
                this.$emit('update:dialogVisible', false)

                //弹出提示
                this.$message.success('导入用户数据成功')


            } catch (error) {
                //报错要执行的代码
                console.log(new Error('导入出错'));
            } finally {
                //不管成功 还是 报错 都会执行
            }
        },
        async download() {
          let res =  await getDownloadApi()
          console.log(res);
          saveAs(res,'员工导入模板.xlsx')
        }
    }
};
</script>

<style lang="scss" scoped>
.dialogBox {
    width: 300px;
    height: 188px;
    border: 1px dashed #ccc;
    border-radius: 4px;
    margin: 10px 0;
    text-align: center;

    .dialogInput {
        display: none;
    }

    .el-icon-upload {
        font-size: 80px;
        color: #ccc;
    }
}
</style>