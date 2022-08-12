<template>
  <div>
    <div class="head">
      <van-row type="flex">
        <van-col span="9">购买激活码</van-col>
      </van-row>
    </div>
    <div class="content">
      <van-form @submit="onSubmit" class="data-form" validate-trigger="onSubmit">
        <van-field
            readonly
            clickable
            label="时长"
            v-model="timeText"
            @click="showTimeSelect = true"
            is-link
        />
        <van-popup v-model="showTimeSelect" round position="bottom" :close-on-click-overlay="false">
          <van-picker
              show-toolbar
              :columns="timeList"
              @cancel="timeOnCancel"
              @confirm="timeOnConfirm"
          />
        </van-popup>
        <van-field
            v-model="invite_code"
            name="邀请码"
            label="邀请码"
            placeholder="填写邀请码可享优惠"
            clearable
            border
            :rules="[{ required: false}]"
            @blur="inputInviteCode"
        />

        <van-field v-model="price" label="价格" readonly/>
        <van-field v-model="invited_price" label="优惠" readonly />
        <div class="email">
          <van-field
              v-model="email"
              name=""
              label="接收邮箱"
              placeholder="激活码将通过邮件发送给你"
              clearable
              border
              :rules="[{required: true, message: '邮箱必填' }]"
              class="btn-email"
          />
          <van-button type="primary" round >发送验证码</van-button>
        </div>

      </van-form >
    </div>
    <van-divider style="padding-top: 10px;padding-left: 30px;padding-right: 15px"/>
    <div class="pay">
      <div class="real-price">
        <span>实付:</span><span class="price">￥{{real_price}}</span>
      </div>
      <div class="pay-button">
        <van-button round type="info" width="100%">去支付</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserBuyCode",
  data() {
    return {
      timeList:[],
      timeToPrice:{},
      timeText:"未选择",
      showTimeSelect:false,
      price:"-",
      invited_price:"-",
      invite_code:"",
      real_price:"0",
      email:""
    };
  },
  methods:{
    timeOnConfirm(value) {
      if (value === "未选择") {
        return
      }
      this.timeText = value
      const codeData = this.timeToPrice[value]
      if (this.invite_code !== ""){
        this.invited_price = codeData["invite_price"]
      }else {
        this.invited_price = 0
      }

      this.price = codeData["price"]
      if (this.invite_code !== ""){
        this.real_price = parseInt(this.price) - parseInt(this.invited_price)
      } else {
        this.real_price = parseInt(this.price)
      }

      this.price = "￥" + this.price
      this.invited_price = "-￥" + this.invited_price
      this.showTimeSelect = false
    },
    timeOnCancel() {
      this.timeText = "未选择"
      this.invited_price = "-"
      this.price = "-"
      this.real_price = "0"
      this.showTimeSelect = false
    },
    async inputInviteCode() {
      if (this.invite_code === "") {
        return
      }
      const {data:res} = await this.$http.get('/check_invite_code?invite_code='+this.invite_code)
      if (res.code === 1) {
        let msg = res.msg
        this.$notify({type:'warning',message:msg})
      }else{
        this.timeOnConfirm(this.timeText)
      }

    }
  },
  async created() {
    const {data:res} = await this.$http.get('/code_info')
      for (const key in res.data) {
        let value = res.data[key]
        if (value["desc"] === "试用") {
          continue
        }
        this.timeList.push(value["desc"])
        this.timeToPrice[value["desc"]] = value
      }
  }
}
</script>

<style scoped lang="less">
.head {
  margin-top: 5%;
  margin-left: 6% ;
  font-size: 18px;
}
.content {
  margin-top: 5%;
  margin-left: 3% ;
  .van-field {
    font-size: 15px;
  }
  .invited-price {
    .van-field__control {
      color: #ea500a;
    }
  }
}
.pay {
  margin-top: 30px;
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

.email {
  position: relative;
  .btn-email {
    position: absolute;
    right: 20px;
    bottom: 7px;
    width: 20%;
  }
}
</style>
