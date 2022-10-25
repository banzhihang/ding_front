<template>
    <div>
      <van-form @submit="onSubmit" class="data-form" validate-trigger="onSubmit" validate-first :show-error="false">
        <!--    学工号-->
        <van-field
            v-model="student_number"
            name="学号"
            label="学号"
            placeholder=""
            clearable
            label-width="5em"
            required
            :border="false"
            :rules="[{ required: true, message: '学工号必填' }]"
        />

        <!--    密码-->
        <van-field
            v-model="password"
            type="password"
            name="密码"
            label-width="5em"
            label="密码"
            clearable
            required
            :border="false"
            placeholder=""
            :rules="[{ required: true, message: '密码必填' }]"
        />


        <!--    密码-->
        <van-field
            v-model="username"
            name="姓名"
            label="姓名"
            clearable
            label-width="5em"
            required
            :border="false"
            placeholder="管理员付款时会核对信息"
            :rules="[{ required: true, message: '收款人姓名必填'}]"
        />

        <van-field name="uploader" label="收款码" required  label-width="5em" :border="false">
          <template #input>
            <van-uploader v-model="fileList" :max-count="1" :after-read="imgAdd" max-size="2621440" @oversize="pictureTooBig"/>
            <div style="color: #999999">
              请勿使用截图
            </div>
          </template>
        </van-field>

        <!--    提交-->
        <div style="margin: 16px;">
          <van-button round block type="info" loading-text="提交中..." :loading="isSubmit" :disabled="isDisabled">提交</van-button>
        </div>
      </van-form>
    </div>
</template>

<script>
import NProgress from "nprogress";

export default {
  name: "PostExchangeApply",
  data() {
    return {
      student_number:"",
      password:"",
      username:"",
      fileList:[],
      url:"",
      isSubmit:false,
      isDisabled:false
    }
  },
  methods:{
      // 上传图片
      async imgAdd(file) {
        const formData = new FormData();
        formData.append('image', file.file);
        let res
        this.isDisabled = true
        try{
          let tmp = await this.$http.post('/dingding_upload',formData,{headers:{
              "content-type":"multipart/form-data"
            },
          })
          res = tmp.data
        } catch(err) {
          NProgress.done()
          this.isDisabled = false
          return this.$notify({type: 'warning', message: "服务器异常，稍后再试"})
        }
        this.isDisabled = false
        this.url = res.data.url
      },

    async onSubmit() {
      if (this.url === "") {
        return this.$notify({type:'warning',message:"请先上传收款二维码"})
      }
      const postData = {
        "username":this.student_number,
        "password":this.password,
        "url":this.url,
        "last_name":this.username
      }
      this.isSubmit = true

      let res
      try {
        let tmp = await this.$http.post('/exchange_apply', postData)
        res = tmp.data
      } catch (err) {
        this.isSubmit = false
        NProgress.done()
        return this.$notify({type: 'warning', message: "服务器异常，稍后再试"})
      }
      this.isSubmit = false

      if (res.code === 0){
        this.$notify({type:'success',message:res.msg})
      }else if (res.code === 1) {
        let msg = res.msg
        this.$notify({type:'warning',message:msg})
      }else {
        let msg = ''
        for (let key in res.data){
          let s = res.data[key]
          s.forEach((item)=>{
            msg += '，'
            msg += item
          })
        }
        msg = msg.replace('，','')
        this.$notify({type:'warning',message:msg})
      }
    },
    pictureTooBig(){
      let msg = "图片过大，最大为2.5兆，请重新上传"
      this.$notify({type:'warning',message:msg})
    },
    getNamePassword() {
      const student_number = window.localStorage.getItem("student_number")
      const password = window.localStorage.getItem("password")
      if (student_number !== null && student_number !== "") {
        this.student_number = student_number
      }
      if (password !== null && password !== "") {
        this.password = password
      }
    }
  },
  created() {
    this.student_number = this.$route.params.student_number
    this.password = this.$route.params.password
    if (this.student_number === "" || this.student_number === undefined || this.password === "" || this.password === undefined) {
      this.getNamePassword()
    }
  }
}
</script>

<style scoped lang="less">
.data-form {
  margin-top: 10px;
}


.van-field {
  margin-bottom: 5px;
  margin-top: 5px;
}
</style>
