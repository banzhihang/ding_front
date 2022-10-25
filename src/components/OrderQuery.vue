<template>
    <div>
      <div class="title">
          订单详情
      </div>
      <div class="pay-info">
        <div class="pay-info-in">
          <span>订单号</span>
          <span>{{order_id}}</span>
        </div>
        <div class="pay-info-in">
          <span>激活码</span>
          <span>{{code}}</span>
        </div>
        <div class="copy">
          <van-button type="info" icon="passed" @click="copyLink">复制激活码</van-button>
        </div>
      </div>

      <div style="margin:10px">
            <div style="text-align: center;margin-top: 50px;margin-bottom: 30px;font-size: 20px">
              激活步骤
            </div>
            <div class="content">
              <p>
                1.复制激活码，点击下方激活链接。注意，最后记得是点激活，不要点试用
              </p>
              <p @click="goToRegisterStep" style="color: blue;font-size: 18px">点击激活</p>
              <van-divider></van-divider>
              <p>
                2.重要信息已经通过邮件发送给你了，请查收邮箱，若收件箱中没有，请检查垃圾邮箱
              </p>
              <van-divider></van-divider>
              <p>
                3.若出现支付成功，却没有发放激活码的情况，请复制订单号联系客服QQ{{masterQQNum}}。二维码如下
              </p>
              <div class="image">
                <van-image
                    width="300"
                    height="300"
                    :src="masterQQUrl"
                />
              </div>
            </div>

      </div>

    </div>

</template>

<script>
import NProgress from "nprogress";
import {Toast} from "vant";

export default {
  name: "OrderQuery",
  data(){
    return{
      order_id:'',
      secret_key:'',
      code:"",
      times: null,
      masterQQNum:'997948107',
      masterQQUrl:"http://cdn.hotschool.ltd/new_qq.jpg"
    }
  },
  methods:{
    async queryPayResult(){
      const queryStr = "order_id=" + this.order_id + "&secret_key=" + this.secret_key
      let res

      try {
        let tmp = await this.$http.get('/pay_query?' + queryStr)
        res= tmp.data
      } catch (err) {
        NProgress.done()
        return this.$notify({type: 'warning', message: "服务器异常，稍后再试"})
      }

      let msg;
      if (res.code === 0) {
          this.code = res.data.code
          clearInterval(this.timer);
          this.timer = null;
      } else if (res.code === 1) {
        msg = res.msg
        this.$notify({type:'warning',message:msg})
      } else {
        msg = ''
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
    copyLink(){
      let code = this.code
      let oInput = document.createElement('input')
      oInput.value = code
      document.body.appendChild(oInput)
      oInput.select()
      document.execCommand("Copy")
      oInput.style.display = 'none'
      Toast.success("复制成功")
    },
    goToRegisterStep() {
      this.$router.push(
          {
            path:`/register_step`
          }
      )
    },
    async getMasterQQInfo(){
      const params = {
        'config_name':['master_qq','master_qq_url']
      }
      const {data:res} = await this.$http.post('/config',params)
      this.masterQQNum = res.data.master_qq
      this.masterQQUrl = res.data.master_qq_url
    }
  },
  async created() {
    let order_id = this.$route.query.order_id
    let secret_key = this.$route.query.secret_key
    this.order_id = order_id
    this.secret_key = secret_key
    this.timer = window.setInterval(() => { setTimeout(() => { this.queryPayResult() }, 0) }, 5000)
    this.queryPayResult()
    this.getMasterQQInfo()
  },
  destroyed() {
    clearInterval(this.timer);
    this.timer = null;
  }
}
</script>

<style scoped lang="less">
.pay-info {
  margin-top: 10px;
  margin-right: 20px;
  margin-left: 20px;

  .pay-info-in {
    &:first-child{
      margin-top: 30px;
    }
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }

}
.title {
  margin-top: 20px;
  text-align: center;
  font-size: 20px;
}

.content {
  margin-left: 10px;
  margin-right: 10px;
}
.image {
  margin-top: 10px;
  text-align: center;
}

.copy {
  margin-top: 30px;
  text-align: center;
  .van-button {
    width: 100%;
    border-radius: 10px;
  }
}
</style>
