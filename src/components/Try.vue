<template>
  <div>
    <div class="head-link">
      <router-link to="/hand">
        <div style="height: 30px">
          <van-notice-bar mode="closeable" left-icon="info-o" background="#ffffff" color="#4187F2" :scrollable="false">
            新增手动打卡，点击本链接使用。
          </van-notice-bar>
        </div>
      </router-link>
    <router-link to="/try_step">
      <div style="height: 25px">
        <van-notice-bar mode="closeable" left-icon="info-o" background='#ffffff' color="#4187F2" :scrollable="false" @click="">
          试用之前请点击本链接查看试用教程。
        </van-notice-bar>
      </div>
    </router-link>
    </div>
    <van-form @submit="onSubmit" class="data-form" validate-trigger="onSubmit" validate-first :show-error="false" ref="forma">
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
      <!--姓名-->
      <van-field
          v-model="username"
          name="姓名"
          label="姓名"
          clearable
          required
          label-width="5em"
          placeholder=""
          :rules="[{ required: true, message: '姓名必填' }]"
      />

      <!--    邀请码-->
      <van-field
          v-model="invite_code"
          name="邀请码"
          label="邀请码"
          placeholder="填写邀请码试用时间增加15天"
          clearable
          label-width="5em"
      />

      <!--    邮箱-->
      <van-field
          v-model="email"
          type="email"
          name="邮箱"
          label="邮箱"
          clearable
          label-width="5em"
          required
          placeholder="重要信息会通过邮件告知"
          :rules="[{required: true, message: '请输入正确邮箱',pattern: emailRex}]"
      />
      <van-field
          v-model="valid_code"
          name=""
          label="验证码"
          placeholder="请输入邮箱验证码"
          clearable
          border
          label-width="5em"
          required
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



      <!--    在校地点-->
      <van-field name="radio" label="在校地点" label-width="5em">
        <template #input>
          <van-radio-group v-model="selectSchool" direction="horizontal">
            <van-radio name="西南大学荣昌校区" @click="showBeiPei=false;schoolText='北碚';school='西南大学荣昌校区'">荣昌</van-radio>
            <van-radio name="西南大学" @click="showBeiPei=true">{{schoolText}}</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-popup v-model="showBeiPei" round position="bottom" :close-on-click-overlay="false">
        <van-picker
            show-toolbar
            :columns="schoolColumns"
            @cancel="showBeiPei=false;school='西南大学荣昌校区';schoolText='北碚';selectSchool='西南大学荣昌校区'"
            @confirm="schoolOnConfirm"
        />
      </van-popup>


      <!--    晨检时间-->
      <van-field
          readonly
          clickable
          label="健康打卡"
          v-model="morningText"
          @click="showSignMorningSelect = true"
          is-link
          label-width="5em"
      />
      <van-popup v-model="showSignMorningSelect" round position="bottom" :close-on-click-overlay="false" label-width="5em">
        <van-picker
            show-toolbar
            :columns="signMorningColumns"
            @cancel="showSignMorningSelect = false;morningText='07:45-08:30 (随机时间不固定)'"
            @confirm="morningOnConfirm"
        />
      </van-popup>



      <!--    查寝时间-->
      <van-field
          readonly
          clickable
          label="查寝时间"
          v-model="attenText"
          @click="showAttenSelect = true"
          is-link
          label-width="5em"
      />
      <van-popup v-model="showAttenSelect" round position="bottom" :close-on-click-overlay="false">
        <van-picker
            show-toolbar
            :columns="attenColumns"
            @cancel="showAttenSelect = false;attenText='19:10-19:25 (随机时间不固定)'"
            @confirm="attenOnConfirm"
        />
      </van-popup>

      <!--    提交-->
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="button" loading-text="提交中..." :loading="isSubmit" @click="clickSubmit" :disabled="isSubmit"
        >提交</van-button>
      </div>
    </van-form>
    <div class="no-code" @click="clickInvite">
      <p>👉👉 没有邀请码？点击此向朋友获取 👈👈</p>
    </div>
  </div>

</template>

<script>
import {Dialog} from "vant";
import NProgress from "nprogress";

export default {
  name: "Try",
  created() {
    Dialog.alert({
      message: '试用之前请点击顶部链接查看试用教程，否则会试用失败！',
      confirmButtonColor:'#4187F2',
      theme: 'round-button',
    })
  },
  data () {
    return {
      username:'',
      // 校区选择
      schoolColumns: ['李园', '桃园', '梅园', '杏园', '橘园', '楠园', '竹园', '柑桔研究所'],
      // 在校地点当前选中的radio
      selectSchool:'西南大学荣昌校区',
      // 校区选项区显示内容
      schoolText:'北碚',
      // 是否显示北培校区弹出框
      showBeiPei:false,
      // 是否早读
      is_morning_read:'0',
      // 是否选择修改照片
      is_alter_photo:'0',
      showAlterPhoto:false,
      // 待上传图片数组(base64格式)
      waitUploadPhoto: [],
      // 等待提交图片名数组
      waitSubmitPhoto: [],
      // 是否在上传照片
      isUploadPhoto:false,
      // 是否在提交
      isSubmit:false,
      // 邮箱
      email:'',
      // 学工号
      student_number: '',
      // 密码
      password: '',
      // 晨检选项
      signMorningColumns:['07:45-08:30 (随机时间不固定)','不晨检','08:45-09:30 (随机时间不固定)','09:45-10:30 (随机时间不固定)'],
      // 晚检选项
      signNightColumns:['19:15-20:00 (随机时间不固定)'],
      // 是否显示晨检选项
      showSignMorningSelect:false,
      // 是否显示晚检选项
      showSignNightSelect:false,
      // 晚检选项区显示内容
      nightText:'19:15-20:00 (随机时间不固定)',
      // 晨检选项区显示内容
      morningText:'07:45-08:30 (随机时间不固定)',
      // 查寝选项
      attenColumns: ['19:10-19:25 (随机时间不固定)','不查寝', '20:10-20:25 (随机时间不固定)', '21:10-21:25 (随机时间不固定)', '21:40-21:55 (随机时间不固定)', '22:10-22:25 (随机时间不固定)', '22:40-22:55 (随机时间不固定)'],
      // 查寝选项区显示内容
      attenText:'19:10-19:25 (随机时间不固定)',
      // 是否显示查寝选项区
      showAttenSelect:false,
      // 查寝参数
      attendance_time:7,
      morning_time: 7,
      school:'西南大学荣昌校区',
      invite_code:"",
      valid_code:'',
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
    }
  },
  methods:{
    async onSubmit() {
      var invite_code
      if (this.invite_code === "") {
        invite_code = "i000000"
      } else {
        invite_code = this.invite_code
      }
      let data = {
        student_number: this.student_number,
        password: this.password,
        username: this.username,
        school: this.school,
        email: this.email,
        morning_time: this.morning_time,
        attendance_time: this.attendance_time,
        invite_code:invite_code,
        valid_code:this.valid_code
      }

      this.isSubmit = true
      let res;
      try{
         let tmp = await this.$http.post('/try',data)
         res = tmp.data
      }catch (err){
        this.isSubmit = false
        NProgress.done()
        return this.$notify({type:'warning',message:"服务器异常，稍后再试"})
      }

      this.isSubmit = false
      if (res.code === 0){
        this.setNamePassword(this.student_number,this.password)
        this.$notify({type:'success',message:res.msg})
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

    // 选择在校地点时，选择北碚，弹出选项框，最后点击确认时的操作
    schoolOnConfirm(value) {
      this.schoolText = value
      this.showBeiPei = false
      switch (value){
        case '李园':
          this.school = '西南大学李园'
          break
        case '桃园':
          this.school = '西南大学桃园'
          break
        case '梅园':
          this.school = '西南大学梅园'
          break
        case '杏园':
          this.school = '西南大学杏园'
          break
        case '橘园':
          this.school = '西南大学橘园'
          break
        case '楠园':
          this.school = '西南大学楠园'
          break
        case '竹园':
          this.school = '西南大学竹园'
          break
        case '柑桔研究所':
          this.school = '西南大学柑桔研究所'
          break
      }
    },

    // 上传图片后操作(指本地上传完成后，并非指上传到服务器)
    afterUpLoadPhoto(photo) {
      if (Array.isArray(photo)){
        photo.forEach((item,index) =>{
          let canvas = document.createElement("canvas");
          let context = canvas.getContext("2d");
          let img = new Image();
          img.src = item.content;
          img.onload = () => {
            canvas.width = 400;
            canvas.height = 300;
            context.drawImage(img, 0, 0, 400, 300);
            // 将绘制完成的图片重新转化为base64编码，file.file.type为图片类型，0.92为默认压缩质量
            item.content = canvas.toDataURL('image/jpeg', 0.5);
            this.waitUploadPhoto.push(item.content.substring(23))
          };
        })
      }else{
        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");
        let img = new Image();
        img.src = photo.content;
        img.onload = () => {
          canvas.width = 400;
          canvas.height = 300;
          context.drawImage(img, 0, 0, 400, 300);
          // 将绘制完成的图片重新转化为base64编码，file.file.type为图片类型，0.92为默认压缩质量
          photo.content = canvas.toDataURL('image/jpeg', 0.5);
          this.waitUploadPhoto.push(photo.content.substring(23))
        };
      }
    },
    // 上传照片提交按钮触发事件
    async upLoadPhoto() {
      if (this.student_number === ''|| this.password === '') {
        this.$notify({type:'warning',message:'账号密码必填'})
        return
      }else if (this.waitUploadPhoto.length === 0){
        this.$notify({type:'warning',message:'未选择任何照片'})
        return
      }

      let data = {
        image:JSON.stringify(this.waitUploadPhoto),
        student_number:this.student_number,
        password:this.password
      }
      this.isUploadPhoto =true
      let res
      try {
        let tmp = await this.$http.post('/upload',data)
        res = tmp.data
      }catch (err){
        this.isUploadPhoto = false
        NProgress.done()
        return this.$notify({type:'warning',message:"服务器异常，稍后再试"})
      }

      this.isUploadPhoto = false
      let msg;

      if (res.code === 0) {
        this.$notify({type:'success',message:'图片上传成功，接下来请点击提交'})
        this.waitUploadPhoto = []
        this.waitSubmitPhoto = res.data['image_name']
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

    // 查寝时间选择后确认
    attenOnConfirm(value) {
      this.attenText = value
      switch (this.attenText) {
        case "19:10-19:25 (随机时间不固定)":
          this.attendance_time = 7
          break
        case "20:10-20:25 (随机时间不固定)":
          this.attendance_time = 8
          break
        case "21:10-21:25 (随机时间不固定)":
          this.attendance_time = 9
          break
        case "21:40-21:55 (随机时间不固定)":
          this.attendance_time = 930
          break
        case "22:10-22:25 (随机时间不固定)":
          this.attendance_time = 10
          break
        case "22:40-22:55 (随机时间不固定)":
          this.attendance_time = 1030
          break
        case "不查寝":
          this.attendance_time = -1
          break
      }
      this.showAttenSelect = false
    },
    morningOnConfirm(value) {
      switch (value) {
        case '07:45-08:30 (随机时间不固定)':
          this.morning_time = 7
          break
        case '08:45-09:30 (随机时间不固定)':
          this.morning_time = 8
          break
        case '09:45-10:30 (随机时间不固定)':
          this.morning_time = 9
          break
        case '不晨检':
          this.morning_time = -1
          break
      }
      this.morningText = value
      this.showSignMorningSelect = false
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
    // 点击提交
    clickSubmit() {
      // 防止还没有获取过验证码就直接去支付
      if (this.isValidEmail === false) {
        return this.$notify({type: 'warning', message: "请先获取验证码"})
      }
      this.$refs.forma.submit()
    },
    setNamePassword(student_number,password){
      if (student_number !== "" && student_number !== null){
        window.sessionStorage.setItem("student_number",student_number)
      }
      if (password !== "" && password !== null){
        window.sessionStorage.setItem("password",password)
      }
    },
    clickInvite() {
      this.$router.push('/notice/12')
    },
  }
}
</script>

<style scoped lang="less">
.van-field {
  margin-bottom: 5px;
  margin-top: 5px;
}

.notice-swipe {
  height: 40px;
  line-height: 40px;
}
.van-notice-bar {
  padding-left: 15px;
}
.data-form {
  margin-top: 10px;
  margin-left: 3px;
}

.head-link {
  margin-left: -7px;
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

.no-code {
  margin-top: 20px;
  text-align: center;
  color: #1989f7;
  font-size: 17px;
}
</style>
