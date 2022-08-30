<template>
  <div>
    <div class="empty" v-show="isWeiXin">
      <van-empty image="error" :description="emptyDesc" />
      <div class="copy" v-show="isWeiXin && emptyDesc.includes('浏览器')">
        <van-button type="info" icon="passed" @click="copyLink">复制链接</van-button>
      </div>
    </div>
    <div v-show="!isWeiXin">
      <div class="head">
        <van-row type="flex">
          <van-col span="9">购买激活码</van-col>
        </van-row>
      </div>

      <div class="code-list">
        <div v-for="(item,key,index) in timeToPrice" class="code-list-in" :key="index" :class="{'activeCss':activeVar===index}" @click="clickTime(item,index)">
          <div class="time-txt">
            <span style="color: #5e5757;font-size: 15px">{{ item.desc }}</span>
            <span style="margin-left: 3px;color: #e3b05f;font-size: 15px">￥{{ item.price }}</span>
          </div>
          <div class="discount">
            邀请码优惠-￥<span>{{item.be_invite_price}}</span>
          </div>
        </div>
      </div>

      <div class="content">
        <van-form @submit="submit" class="data-form" validate-trigger="onBlur" validate-first :show-error="false" ref="forma">
          <van-field
              v-model="invite_code"
              name="邀请码"
              label="邀请码"
              placeholder="填写邀请码可享优惠"
              border
              :rules="[{ required: false}]"
              @blur="inputInviteCode"
              label-width="5em"
          />

          <van-field v-model="price" label="价格" readonly label-width="5em"/>
          <van-field v-model="invited_price" label="优惠" label-width="5em" readonly />
          <van-field
              v-model="email"
              name=""
              label="接收邮箱"
              placeholder="激活码通过邮件告知"
              clearable
              border
              required
              label-width="5em"
              :rules="[{required: true, message: '请输入正确邮箱',pattern: emailRex}]"
          />

          <van-field
              v-model="valid_code"
              name=""
              label="验证码"
              placeholder="请输入邮箱验证码"
              clearable
              border
              required
              label-width="5em"
              :rules="[{required: true, message: '请输入正确验证码',pattern:validCodeRex}]"
          >
            <template #button >
              <div class="email-btn">
                <div class="email-btn-in">
                  <van-button  type="info" :disabled="isSmsSend" class="email-btn-in" @click="clickSendCode" native-type="button" size="small">{{sendBtnText}}</van-button>
                </div>
              </div>
            </template>
          </van-field>

          <div></div>
        </van-form >
      </div>
      <div class="pay">
        <div class="real-price">
          <span>实付:</span><span class="price">￥{{real_price}}</span>
        </div>
        <div class="pay-button">
          <van-button  type="info" width="100%" loading-text="支付中..." :loading="isSubmit" @click="clickGoPay" :disabled="isSubmit">去支付</van-button>
        </div>
      </div>
      <div class="no-code" @click="clickInvite">
        <p>👉👉 没有邀请码？点击此向朋友获取 👈👈</p>
      </div>
    </div>

  </div>
</template>

<script>
import NProgress from "nprogress";
import {Toast} from "vant";
import {frontBaseUrl} from '../../constant'

export default {
  name: "UserBuyCode",
  data() {
    return {
      activeVar:null,
      isSubmit:false,
      timeToPrice:{},
      timeText:"未选择",
      price:"-",
      invited_price:"-",
      // 邀请码
      invite_code:"",
      // 实付价格
      real_price:"0",
      email:"",
      // 验证码
      valid_code:"",
      // 是否优惠
      is_discount:false,
      // 邮箱正则表达式
      emailRex:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
      validCodeRex:/^\d{6}$/,
      isValidEmail: false,
      // 是否已经发送了验证码
      isSmsSend: false,
      // 文本
      sendBtnText: '获取验证码',
      // 计时器对象
      timer: null,
      // 倒数60秒
      counter: 60,
      isWeiXin:false,
      emptyDesc:"请用浏览器打开此页面。点击复制链接到浏览器打开。"
    };
  },
  methods: {
    // 时长点击确认之后
    timeOnConfirm(value) {
      this.timeText = value
      const codeData = this.timeToPrice[value]
      if (this.invite_code !== "" && this.is_discount === true) {
        this.invited_price = codeData["be_invite_price"]
      } else {
        this.invited_price = 0
      }

      this.price = codeData["price"]
      if (this.invite_code !== "") {
        this.real_price = parseInt(this.price) - parseInt(this.invited_price)
      } else {
        this.real_price = parseInt(this.price)
      }

      this.price = "￥" + this.price
      this.invited_price = "-￥" + this.invited_price
    },


    // 邀请码输入之后校验邀请码
    async inputInviteCode() {
      if (this.checkWeiXinBrowser()) {
        return this.$notify({type:'warning',message:"请用浏览器打开此页面"})
      }

      if (this.invite_code === "") {
        return
      }
      const {data: res} = await this.$http.get('/check_invite_code?invite_code=' + this.invite_code)
      if (res.code === 1 ) {
        let msg = res.msg
        this.is_discount = false
        this.$notify({type: 'warning', message: msg})
      } else if (this.invite_code === "i000000"){
        this.is_discount = false
        this.$notify({type: 'warning', message: "此邀请码不享有优惠"})
      }
      else {
        this.is_discount = true
      }
      this.timeOnConfirm(this.timeText)
    },

    // 邮箱输入框点击校验
    clickSendCode() {
      if (this.emailRex.test(this.email) === true) {
        this.sendCode()
        this.isSmsSend = true
        this.countDown()
        this.isValidEmail = true
      } else {
        return this.$notify({type: 'warning', message: "请输入正确邮箱"})
      }
    },
    // 判断是不是移动端
    isMobile() {
      return !!window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
    },

    // 支付
    async submit() {
      if (this.checkWeiXinBrowser()) {
        return this.$notify({type:'warning',message:"请用浏览器打开此页面"})
      }

      const codeData = this.timeToPrice[this.timeText]
      if (codeData === undefined) {
        return this.$notify({type: 'warning', message: "请选择时长"})
      }
      const payData = {
        "code_type": codeData["code_type"],
        "invite_code": this.invite_code ? this.invite_code:"i000000",
        "email": this.email,
        "valid_code": this.valid_code,
        "platform": this.isMobile() ? "Mobile" : "PC"
      }

      this.isSubmit = true
      let res
      try {
        let tmp = await this.$http.post('/pay_query', payData,{headers: {'X-Requested-With': 'XMLHttpRequest'}})
        res = tmp.data
      } catch (err) {
        this.isSubmit = false
        NProgress.done()
        return this.$notify({type: 'warning', message: "服务器异常，稍后再试"})
      }
      this.isSubmit = false
      // 支付页面跳转
      if (res.code === 0) {
        this.setEmail(this.email)
        window.location.href = res.data.url
      }
      else if (res.code === 1) {
        let msg = res.msg
        this.$notify({type: 'warning', message: msg})
      } else {
        let msg = ''
        for (let key in res.data) {
          let s = res.data[key]
          s.forEach((item) => {
            msg += '，'
            msg += item
          })
        }
        msg = msg.replace('，', '')
        this.$notify({type: 'warning', message: msg})
      }
    },

    // 点击去支付
    clickGoPay() {
      // 防止还没有获取过验证码就直接去支付
      if (this.isValidEmail === false) {
        return this.$notify({type: 'warning', message: "请先获取验证码"})
      }
      this.$refs.forma.submit()
    },

    // 验证码倒计时
    countDown() {
      this.timer = setInterval(() => {
        this.sendBtnText = `${this.counter} 秒后获取`
        this.counter--
        if (this.counter < 0) {
          this.reset()
        }
      }, 1000)
    },
    // 重置验证码倒计时
    reset() {
      this.isSmsSend = false
      this.sendBtnText = '获取验证码'
      clearInterval(this.timer)
      this.counter = 60
      this.timer = null
    },
    // 发送验证码
    async sendCode() {
      if (this.checkWeiXinBrowser()) {
        return this.$notify({type:'warning',message:"请用浏览器打开此页面"})
      }

      const postData = {
        "email":this.email
      }
      try{
        let tmp = await this.$http.post('/post_valid_code',postData)

        this.$notify({type:'success',message:tmp.data.msg})
      }catch (err){
        NProgress.done()
        return this.$notify({type:'warning',message:"服务器异常，稍后再试"})
      }
    },
    clickTime(item,index) {
      this.activeVar=index
      this.timeOnConfirm(item["desc"])
    },
    checkWeiXinBrowser() {
      return /MicroMessenger/i.test(window.navigator.userAgent);
    },
    copyLink(){
      let oInput = document.createElement('input')
      oInput.value = frontBaseUrl + "b"
      document.body.appendChild(oInput)
      oInput.select()
      document.execCommand("Copy")
      oInput.style.display = 'none'
      Toast.success("复制成功")
    },
    clickInvite() {
      this.$router.push('/notice/12')
    },
    setEmail(email) {
      if (email !== "" && email !== null){
        window.localStorage.setItem("email",email)
      }
    },
    getEmail() {
      const email = window.localStorage.getItem("email")
      if (email !== null && email !== "") {
        this.email = email
      }
    }
  },
  async created() {
    if (this.checkWeiXinBrowser()) {
      this.isWeiXin = true
      return
    }

    if(!this.isMobile()) {
      this.isWeiXin = true
      this.emptyDesc = "请用手机浏览器打开此页面"
      return
    }

    const {data:res} = await this.$http.get('/code_info')
    let c
      for (const key in res.data) {
        let value = res.data[key]
        if (value["desc"] === "试用" || value["desc"]=== "兑换") {
          continue
        }
        value["code_type"] = key
        c = value["desc"]
        this.timeToPrice[value["desc"]] = value
      }

    let arr = Object.keys(this.timeToPrice);
    this.activeVar = arr.length - 1
    this.$forceUpdate()
    this.getEmail()
    this.timeOnConfirm(c)
  }
}
</script>

<style scoped lang="less">
.head {
  margin-top: 5%;
  margin-left: 4% ;
  font-size: 18px;
}
.content {
  margin-top: 5%;
  margin-left: 0 ;
  .van-field {
    font-size: 14px;
  }
  .invited-price {
    .van-field__control {
      color: #ea500a;
    }
  }
}
.pay {
  margin-top: 20px;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .price {
    font-size: 25px;
    color: #ea500a;
  }
  .pay-button {
    margin-left: 10px;
    width: 35%;
    .van-button {
      width: 100%;
    }
  }
}

.email-btn {
  width: 90px;
  height: 30px;
  position: relative;
  .email-btn-in{
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
}

.code-list {
  text-align: center;
  margin-top: 10px;
  margin-left: 3% ;
  margin-right: 4%;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  .code-list-in{
    box-sizing:border-box;
    border-radius: 5px;
    margin-right: 2px;
    margin-left: 2px;
    margin-top: 5px;
    border:1px solid #e3e4e6;
    width: 112px;
    height: 58px;
    .discount {
      margin-top: 3px;
      font-size: 10px;
      color: #999999;
    }
    .time-txt{
      margin-top: 10px;
    }
  }
}

.activeCss{
  border:2px solid #e3b05f !important;
}

.copy {
  margin-top: 30px;
  margin-left: 20px;
  margin-right: 20px;
  text-align: center;
  .van-button {
    width: 100%;
  }
}

.no-code {
  margin-top: 50px;
  text-align: center;
  color: #1989f7;
  font-size: 17px;
}
</style>
