<template>
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
        required
        label-width="5em"
        placeholder="西大办事大厅密码"
        :rules="[{ required: true, message: '密码必填' }]"
    />

    <!--    提交-->
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit" loading-text="查询中..." :loading="isSubmit"
      >查询</van-button>
    </div>

    <van-cell-group class="invite-info" v-show="showCode" style="margin-top: 30px">
      <van-cell title="你的邀请码为" :value="exCode" />
      <van-cell title="可提现金额为" :value="exCount" />
    </van-cell-group>

    <div style="margin:5px" v-if="showCode">
      <van-tabs color="#4187F2">
        <van-tab title="注意事项"  >
          <div class="content-in">
            <p>
              1.提现现金请点击下方提交提现申请，上传收款码提交即可
            </p>
            <van-divider></van-divider>
            <p>
              2.管理员收到提现申请之后会向你上传的收款码支付
            </p>
            <van-divider></van-divider>
          </div>
        </van-tab>
      </van-tabs>
      <div class="apply">
        <van-button type="info" native-type="button" @click="getToHistory">查看提现历史</van-button>
        <van-button type="info" native-type="button" @click="goToApply">提交提现申请</van-button>
      </div>
    </div>
  </van-form>
</template>

<script>

export default {
  name: "InviteCode",
  data () {
    return {
      showCode:false,
      student_number:'',
      password:'',
      exCode: '',
      exKey:'',
      exCount:0,
      isSubmit: false,
      masterQQNum:'997948107',
      masterQQUrl:"http://cdn.hotschool.ltd/new_qq.jpg",
    }
  },
  methods: {
    async onSubmit() {
      let data = {
        username: this.student_number,
        password: this.password,
      }

      this.isSubmit = true
      let {data:res} = await this.$http.post('/invite_code',data)
      this.isSubmit = false

      if (res.code === 0){
        this.exCode = res.data.code
        this.exKey = res.data.key
        this.exCount = res.data.balance
        this.showCode = true
        this.setNamePassword(this.student_number,this.password)
      }else if (res.code === 1) {
        let msg = res.msg
        this.$notify({type:'success',message:msg})
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
    async getConfig(){
      const params = {
        'config_name':['master_qq','master_qq_url']
      }
      const {data:res} = await this.$http.post('/config',params)
      this.masterQQNum = res.data.master_qq
      this.masterQQUrl = res.data.master_qq_url
    },
    getToHistory() {
      this.$router.push({
          name:"PostExchangeList",
          params:{
            "student_number":this.student_number,
            "password":this.password
          }
      })
    },
    goToApply() {
      if (this.exCount === 0) {
        return this.$notify({type:'warning',message:"可兑换余额为0，无法提交兑换申请"})
      }
      this.$router.push({
        name:"PostExchangeApply",
        params:{
          "student_number":this.student_number,
          "password":this.password
        }
      })
    },
    setNamePassword(student_number,password){
      if (student_number !== "" && student_number !== null){
        window.sessionStorage.setItem("student_number",student_number)
      }
      if (password !== "" && password !== null){
        window.sessionStorage.setItem("password",password)
      }
    },
    getNamePassword() {
      const student_number = window.sessionStorage.getItem("student_number")
      const password = window.sessionStorage.getItem("password")
      if (student_number !== null && student_number !== "") {
        this.student_number = student_number
      }
      if (password !== null && password !== "") {
        this.password = password
      }
    }
  },
  async created() {
    this.getNamePassword()
  }
}
</script>

<style scoped lang="less">
.data-form {
  margin-top: 10px;
  margin-left: 5px;
}
.van-field {
  margin-bottom: 5px;
  margin-top: 5px;
}

.content-in {
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 50px;
}

.image {
  margin-top: 10px;
  text-align: center;
}

.apply {
  display: flex;
  justify-content: space-around;
}

</style>
