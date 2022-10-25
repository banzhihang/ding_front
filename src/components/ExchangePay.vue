<template>
    <div>
      <div class="empty" v-show="isWeiXin">
        <van-empty image="error" :description="emptyDesc" />
        <div class="copy" v-show="isWeiXin && emptyDesc.includes('浏览器')">
          <van-button type="info" icon="passed" @click="copyLink">复制链接</van-button>
        </div>
      </div>
      <div v-show="!isWeiXin">
        <div class="content">
          <van-form @submit="submit" class="data-form" validate-trigger="onBlur" validate-first :show-error="false" ref="forma">
            <van-field
                v-model="exchange_code"
                name="兑换码"
                label="兑换码"
                placeholder=""
                border
                :border="false"
                label-width="5em"
                :rules="[{ required: true, message: '请输入正确兑换码'}]"
            />

            <van-field v-model="showPrice" label="价格" readonly label-width="5em" :border="false"/>
            <van-field
                v-model="email"
                name=""
                label="接收邮箱"
                placeholder="激活码通过邮件告知"
                clearable
                :border="false"
                label-width="5em"
                :rules="[{required: true, message: '请输入正确邮箱',pattern: emailRex}]"
            />

            <van-field
                v-model="valid_code"
                name=""
                label="验证码"
                placeholder="请输入邮箱验证码"
                clearable
                label-width="5em"
                :border="false"
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
            <span>实付:</span><span class="price">￥{{price}}</span>
          </div>
          <div class="pay-button">
            <van-button  type="info" width="100%" loading-text="支付中..." :loading="isSubmit" @click="clickGoPay" :disabled="isSubmit">去支付</van-button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import NProgress from "nprogress";
import {frontBaseUrl} from "../../constant";
import {Toast} from "vant";

export default {
  name: "ExchangePay",
  data(){
    return{
      exchange_code:'',
      price:"50",
      showPrice:"",
      // 验证码
      valid_code:"",
      email:"",
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
      emptyDesc:"请用浏览器打开此页面。点击复制链接到浏览器打开。",
      isSubmit:false,
    }
  },
  methods:{
    getExCodePrice() {
      const exchange_code = window.localStorage.getItem("exchange_code")
      const price = window.localStorage.getItem("price")
      if (exchange_code !== null && exchange_code !== "") {
        this.exchange_code = exchange_code
      }
      if (price !== null && price !== "") {
        this.price = price
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
        this.sendBtnText = `${this.counter}秒获取`
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

    checkWeiXinBrowser() {
      var isIosQQ = ( /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) && /\sQQ/i.test(navigator.userAgent));
      var isAndroidQQ = ( /(Android)/i.test(navigator.userAgent) && /MQQBrowser/i.test(navigator.userAgent) && /\sQQ/i.test((navigator.userAgent).split('MQQBrowser')));
      return /MicroMessenger/i.test(window.navigator.userAgent) || isAndroidQQ || isIosQQ
    },
    // 判断是不是移动端
    isMobile() {
      return !!window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
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
    copyLink(){
      let oInput = document.createElement('input')
      oInput.value = frontBaseUrl + "exchange"
      document.body.appendChild(oInput)
      oInput.select()
      document.execCommand("Copy")
      oInput.style.display = 'none'
      Toast.success("复制成功")
    },
    async submit() {
      if (this.checkWeiXinBrowser()) {
        return this.$notify({type:'warning',message:"请用浏览器打开此页面"})
      }

      const payData = {
        "exchange_code":this.exchange_code,
        "email": this.email,
        "valid_code": this.valid_code,
        "platform": this.isMobile() ? "Mobile" : "PC"
      }

      this.isSubmit = true
      let res
      try {
        let tmp = await this.$http.post('/ex_pay', payData,{headers: {'X-Requested-With': 'XMLHttpRequest'}})
        res = tmp.data
      } catch (err) {
        this.isSubmit = false
        NProgress.done()
        return this.$notify({type: 'warning', message: "服务器异常，稍后再试"})
      }
      this.isSubmit = false
      // 支付页面跳转
      if (res.code === 0) {
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
  },
  created() {
    if (this.checkWeiXinBrowser()) {
      this.isWeiXin = true
      return
    }
    if(!this.isMobile()) {
      this.isWeiXin = true
      this.emptyDesc = "请用手机浏览器打开此页面"
      return
    }
    this.getExCodePrice()
    this.showPrice = "￥" + this.price
  },

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
}

.pay {
  margin-top: 40px;
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
      border-radius: 8px;
    }
  }
}

.email-btn {
  width: 80px;
  height: 30px;
  position: relative;
  .email-btn-in{
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    .van-button {
      border-radius: 5px;
    }
  }
}

.copy {
  margin-top: 30px;
  margin-left: 20px;
  margin-right: 20px;
  text-align: center;
  .van-button {
    width: 100%;
    border-radius: 10px;
  }
}
</style>
