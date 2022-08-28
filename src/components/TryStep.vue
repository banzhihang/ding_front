<template>
  <div style="margin:10px">
    <van-tabs color="#4187F2">
      <van-tab title="试用步骤"  >
        <div class="content">
          <p>
            1.通知群有多个，若已添加其他通知群，则无需重复添加。QQ群{{ QQNumber}}。或扫描下方二维码添加。
          </p>
          <img style="width:20rem;" :src='QQPictuerUrl' alt="">
          <van-divider></van-divider>
          <p>
            2.无需钉钉账号密码，只需西大办事大厅账号密码。请点击下方链接登录西大办事大厅确定账号密码。
          </p>
          <img style="width:22rem;" src='http://cdn.hotschool.ltd/%E5%8A%9E%E4%BA%8B%E5%A4%A7%E5%8E%85.jpg' alt="">
          <div style="margin-top: 5px;font-size: 18px">
            <a href="https://uaaap.swu.edu.cn/cas/login?service=http%3A%2F%2Fi.swu.edu.cn%2FPersonalApplications%2FviewPageV3">点击登录办事大厅</a>
          </div>
          <van-divider></van-divider>
          <p>
            3.确保成功登录一次，若忘记密码请找回。登录成功所用密码即为所需账号密码。点击下方链接试用
          </p>

          <p style="color: #ff9a00">
            信息提交成功后确保收到邮件才算成功！
          </p>
          <router-link to="/home">
            <p style="color: blue;font-size: 18px">点击链接完成试用</p>
          </router-link>

        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "TryStep",
  data () {
    return{
      QQNumber:'',
      QQPictuerUrl:'',
    }
  },
  async created() {
    const params = {
      'config_name':['qq_group_qr_code_url','qq_group_number']
    }
    const {data:res} = await this.$http.post('/config',params)
    this.QQNumber = res.data.qq_group_number
    this.QQPictuerUrl = res.data.qq_group_qr_code_url
  }
}
</script>

<style scoped>

</style>
