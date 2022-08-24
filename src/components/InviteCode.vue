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
      <van-cell title="你的兑换密匙为" :value="exKey" />
      <van-cell title="可兑换金额为" :value="exCount" />
    </van-cell-group>

    <div style="margin:5px" v-if="showCode">
      <van-tabs color="#4187F2">
        <van-tab title="注意事项"  >
          <div class="content-in">
            <p>
              1.兑换密匙为兑换现金的唯一密匙,请勿泄漏
            </p>
            <van-divider></van-divider>
            <p>
              2.兑换现金请添加客服,出示邀请码和兑换密匙即可
            </p>
            <van-divider></van-divider>
            <p>
              3.兑换之后会清零可兑换金额
            </p>
            <van-divider></van-divider>
            <p>
              4.添加客服QQ{{masterQQNum}}兑换现金。二维码如下
            </p>
            <div class="image">
              <van-image
                  width="300"
                  height="300"
                  :src="masterQQUrl"
              />
            </div>
          </div>
        </van-tab>
      </van-tabs>
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
    }
  },
  async created() {
    await this.getConfig()
  }
}
</script>

<style scoped lang="less">
.data-form {
  margin-top: -10px;
  margin-left: 5px;
}
.van-field {
  margin-bottom: 20px;
  margin-top: 20px;
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

</style>
