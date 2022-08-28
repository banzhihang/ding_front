<template>
  <div>
    <van-form @submit="onSubmit" class="data-form" validate-trigger="onSubmit" >
      <!--    学工号-->
      <van-field
          v-model="student_number"
          name="学号"
          label="学号"
          placeholder=""
          clearable
          required
          label-width="5em"
          :rules="[{ required: true, message: '学号必填' }]"
      />

      <!--    密码-->
      <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          clearable
          label-width="5em"
          required
          placeholder="今日校园密码"
          :rules="[{ required: true, message: '密码必填' }]"
      />

      <!--    提交-->
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit" loading-text="提交中..." :loading="isSubmit"
        >提交</van-button>
      </div>

      <van-cell-group class="invite-info" v-show="showCode" style="margin-top: 30px">
        <van-cell title="你的兑换码为" :value="exCode" />
      </van-cell-group>
    </van-form>
    <div>
      <div style="margin:15px" v-if="showCode">
        <van-tabs color="#4187F2">
          <van-tab title="注意事项"  >
            <div class="content-in">
              <p>
                1.你是今日校园永久激活码用户，只需补足<span style="color: red"> ￥{{gapPrice}} </span>元即可获得钉钉打卡四年激活码
              </p>
              <van-divider></van-divider>
            </div>
          </van-tab>
        </van-tabs>
        <div class="apply">
          <van-button type="info" native-type="button" @click="goExchangePay" icon-position="right" icon="guide-o">去补足差价</van-button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  name: "Exchange",
  data () {
    return {
      showCode:false,
      student_number:'',
      password:'',
      exCode: '',
      isSubmit: false,
      gapPrice:0
    }
  },
  methods: {
    async onSubmit() {
      let data = {
        username: this.student_number,
        password: this.password,
      }

      this.isSubmit = true
      let {data:res} = await this.$http.post('/ex_code',data)
      this.isSubmit = false

      if (res.code === 0){
        this.exCode = res.data.code
        this.gapPrice = res.data.gap_price
        window.sessionStorage.setItem("exchange_code",this.exCode)
        window.sessionStorage.setItem("price",this.gapPrice)
        this.showCode = true
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
    goExchangePay() {
      this.$router.push('/exchange_pay')
    }
  },
}
</script>

<style scoped lang="less">
.data-form {
  margin-top: 10px;
  margin-left: 3px;
}
.van-field {
  margin-bottom: 5px;
  margin-top: 5px;
}
.content {
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 50px;
}

.apply {
  display: flex;
  justify-content: flex-end;
  margin-right: 15px;
}

</style>
