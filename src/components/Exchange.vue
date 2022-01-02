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
      isSubmit: false
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
  },
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
.content {
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 50px;
}

</style>
