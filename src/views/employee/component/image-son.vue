<template>
    <!-- 
    (自动上传)action	必选参数，上传的地址	string----当前项目 -手动上传
    show-file-list	是否显示已上传文件列表	boolean   false 不展示列表
    before-upload	上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。function(file)
    http-request 覆盖默认的上传行为，可以自定义上传的实现 接收一个函数
     -->
    <el-upload class="avatar-uploader" action="" :show-file-list="false" :before-upload="beforeAvatarUpload"
        :http-request="updateImg">

        <img v-if="value" :src="value" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>

<script>
import COS from "cos-js-sdk-v5"
export default {
    props: {
        value: {
            type: String,
            default: ""
        }
    },
    methods: {
        updateImg({ file }) {
            //对cos对象初始化
            const cos = new COS({
                //密钥id
                SecretId: 'AKIDHaHxDTiw0rZBpQaktFWcV9e7UeaswlLl',
                //密钥
                SecretKey: 'peREzlWBh17yrXUIvQ2XqujLk281kJuW'
            })

            cos.putObject({
                Bucket: 'jy-2210c-1320041675',//存储桶名称
                Region: 'ap-nanjing', //地域名称
                Key: file.name, // 图片名称
                StorageClass: "STANDARD", // 固定值
                Body: file//文件对象
            }, (err, data) => {
                //data 为成功的返回信息 err为错误信息
                if (data.statusCode == 200 && data.Location) {
                    //判断如果成功 就是触发input事件 将图片地址传给父组件
                    this.$emit('input', 'http://' + data.Location)
                } else {
                    this.$message.warning(err.Message)
                }
            })
        },
        beforeAvatarUpload(file) {
            const isJPG = ['image/jpeg', 'image/png', 'image/bmp'].includes(file.type)
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 jpeg  png  bmp 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    },
};
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px dashed #409EFF;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>