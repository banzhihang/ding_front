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

<!--    手动打卡类型-->
    <van-field name="radio" label="类型" label-width="5em">
      <template #input>
        <van-radio-group v-model="type" direction="horizontal">
          <van-radio name="健康打卡">健康打卡</van-radio>
          <van-radio name="查寝">查寝</van-radio>
        </van-radio-group>
      </template>
    </van-field>

    <!--    提示内容-->
    <div style="margin:10px">
      <van-tabs color="#4187F2">
        <van-tab title="注意事项"  >
          <div class="content">
<!--            <p>-->
<!--              1.应用场景：今天下午15.00~15.30你们在xx教有个会议，你们老师发布了一个只能在xx教签到的定位签到，此时在15.00之后提交手动打卡请求，系统就会帮你完成打卡，你就不用跑去xx教室了。-->
<!--            </p>-->
            <van-divider></van-divider>
            <p>
              1.提交时间必须在签到允许的时间范围内，提前提交会导致检测不到任务，导致打卡失败。
            </p>
            <van-divider></van-divider>
            <p>
              2.若已经超过打卡的截止时间，会提示检测不到任务。不支持补签。
            </p>
          </div>
        </van-tab>
      </van-tabs>
    </div>


    <!--    提交-->
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit" loading-text="提交中..." :loading="isSubmit"
      >提交</van-button>
    </div>
  </van-form>
</template>

<script>
import {Dialog} from "vant";

export default {
  name: "Hand",
  created() {
    Dialog.alert({
      message: '本功能仅向已试用或者已激活的用户开放',
      confirmButtonColor:'#4187F2',
      theme: 'round-button',
    })
    this.getNamePassword()
  },
  data () {
    return {
      student_number:'',
      password:'',
      type: '未选择',
      isSubmit: false
    }
  },
  methods: {
    async onSubmit() {
      if (this.type === "未选择") {
        let msg = "请选择打卡类型"
        return this.$notify({type:'warning',message:msg})
      }
      let data = {
        student_number: this.student_number,
        password: this.password,
        type: this.type
      }

      this.isSubmit = true
      let {data:res} = await this.$http.post('/hand_op',data)
      this.isSubmit = false

      if (res.code === 0){
        this.$notify({type:'success',message:res.msg})
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
    getNamePassword() {
      const student_number = window.localStorage.getItem("student_number")
      const password = window.localStorage.getItem("password")
      const email = window.localStorage.getItem("email")
      const username = window.localStorage.getItem("username")
      if (student_number !== null && student_number !== "") {
        this.student_number = student_number
      }
      if (password !== null && password !== "") {
        this.password = password
      }
      if (email !== null && email !== "") {
        this.email = email
      }
      if (username !== null && username !== "") {
        this.username = username
      }
    },
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
  margin-bottom: 30px;
}

</style>
