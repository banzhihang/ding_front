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
     <router-link to="/register_step">
       <div style="height: 25px">
         <van-notice-bar mode="closeable" left-icon="info-o" background="#ffffff" color="#4187F2" :scrollable="false" @click="">
           激活之前请点击本链接查看激活教程。
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
          :border="false"
          label-width="5em"
          :rules="[{ required: true, message: '学工号必填' }]"
      />

      <!--    密码-->
      <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          clearable
          required
          :border="false"
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
          label-width="5em"
          required
          :border="false"
          placeholder=""
          :rules="[{ required: true, message: '姓名必填' }]"
      />

      <!--    激活码-->
      <van-field
          v-model="code"
          name="激活码"
          label="激活码"
          required
          label-width="5em"
          placeholder="一个激活码只能使用一次"
          clearable
          :border="false"
          :rules="[{ required: true, message: '激活码必填' }]"
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
          :border="false"
          placeholder="重要信息会通过邮件告知"
          :rules="[{required: true, message: '请输入正确邮箱',pattern: emailRex}]"
      />


      <van-field
          v-model="valid_code"
          name=""
          label="验证码"
          placeholder="请输入邮箱验证码"
          clearable
          :border="false"
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
      <van-field name="radio" label="在校地点" label-width="5em" :border="false">
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

<!--      &lt;!&ndash;早读打卡&ndash;&gt;-->
<!--      <van-field name="radio" label="早读打卡">-->
<!--        <template #input>-->
<!--          <van-radio-group v-model="is_morning_read" direction="horizontal">-->
<!--            <van-radio name="0">否</van-radio>-->
<!--            <van-radio name="1" @click="clickMorningRead">是</van-radio>-->
<!--          </van-radio-group>-->
<!--        </template>-->
<!--      </van-field>-->

<!--      &lt;!&ndash;    照片查寝&ndash;&gt;-->
<!--      <van-field name="radio" label="照片查寝">-->
<!--        <template #input>-->
<!--          <van-radio-group v-model="is_alter_photo" direction="horizontal">-->
<!--            <van-radio name="0" @click="showAlterPhoto=false;waitUploadPhoto=[];fileList=[]">否</van-radio>-->
<!--            <van-radio name="1" @click="showAlterPhoto=true;">是</van-radio>-->
<!--          </van-radio-group>-->
<!--        </template>-->
<!--      </van-field>-->
<!--      <van-field name="uploader" label="选择照片" v-show="showAlterPhoto">-->
<!--        <template #input>-->
<!--          <van-uploader v-model="fileList" :max-count="5" :after-read="afterUpLoadPhoto" multiple/>-->
<!--        </template>-->
<!--      </van-field>-->
<!--      <div style="margin: 16px;">-->
<!--        <van-button round block type="primary" native-type="button" v-show="showAlterPhoto"-->
<!--                    @click="upLoadPhoto" loading-text="上传中..." :loading="isUploadPhoto">上传照片</van-button>-->
<!--      </div>-->

      <!--    晨检时间-->
      <van-field
          readonly
          clickable
          label="健康打卡"
          v-model="morningText"
          @click="showSignMorningSelect = true"
          is-link
          :border="false"
          label-width="5em"
      />
      <van-popup v-model="showSignMorningSelect" round position="bottom" :close-on-click-overlay="false">
        <van-picker
            show-toolbar
            :columns="signMorningColumns"
            @cancel="showSignMorningSelect = false;morningText='07:45-08:30 (随机时间不固定)'"
            @confirm="morningOnConfirm"
        />
      </van-popup>

<!--      &lt;!&ndash;    晚检时间&ndash;&gt;-->
<!--      <van-field-->
<!--          readonly-->
<!--          clickable-->
<!--          label="晚检时间"-->
<!--          v-model="nightText"-->
<!--          @click="showSignNightSelect = true"-->
<!--          is-link-->
<!--      />-->
<!--      <van-popup v-model="showSignNightSelect" round position="bottom">-->
<!--        <van-picker-->
<!--            show-toolbar-->
<!--            :columns="signNightColumns"-->
<!--            @cancel="showSignNightSelect = false;nightText='19:15-20:00 (随机时间不固定)'"-->
<!--            @confirm="showSignNightSelect = false"-->
<!--        />-->
<!--      </van-popup>-->

      <!--    查寝时间-->
      <van-field
          readonly
          clickable
          v-model="attenText"
          label="查寝时间"
          @click="showAttenSelect = true"
          is-link
          :border="false"
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
    <div class="no-code" @click="clickBuy">
      <p>👉👉 没有激活码？点击此处购买 👈👈</p>
    </div>
  </div>
</template>

<script>
import {Dialog} from "vant";
import NProgress from "nprogress";

export default {
  name: "Register",
  created() {
    Dialog.alert({
      message: '激活之前请点击顶部链接查看激活教程，否则会激活失败！',
      confirmButtonColor:'#4187F2',
      theme: 'round-button',
    })
    this.getNamePassword()
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
      // is_morning_read:'0',
      // 是否选择修改照片
      // is_alter_photo:'0',
      // showAlterPhoto:false,
      // 待上传图片数组(base64格式)
      // waitUploadPhoto: [],
      // // 等待提交图片名数组
      // waitSubmitPhoto: [],
      // 是否在上传照片
      // isUploadPhoto:false,
      // 是否在提交
      isSubmit:false,
      // 激活码
      code:'',
      // 邮箱
      email:'',
      // 学工号
      student_number: '',
      // 密码
      password: '',
      // 晨检选项
      signMorningColumns:['07:45-08:30 (随机时间不固定)','不健康打卡',
        '08:45-09:30 (随机时间不固定)','09:45-10:30 (随机时间不固定)','11.15-11.55 (随机时间不固定)',
        '13.15-13.55 (随机时间不固定)','15.15-15.55 (随机时间不固定)','17.00-17.25 (随机时间不固定)','17.35-17.50 (随机时间不固定)'],
      // 晚检选项
      // signNightColumns:['19:15-20:00 (随机时间不固定)'],
      // 是否显示晨检选项
      showSignMorningSelect:false,
      // 是否显示晚检选项
      // showSignNightSelect:false,
      // 晚检选项区显示内容
      // nightText:'19:15-20:00 (随机时间不固定)',
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
      // 预览图片数组
      // fileList:[],
      // exchange_code:""
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
      let data = {
        student_number: this.student_number,
        password: this.password,
        username: this.username,
        school: this.school,
        email: this.email,
        morning_time: this.morning_time,
        attendance_time: this.attendance_time,
        code: this.code,
        valid_code:this.valid_code
      }

      this.isSubmit = true
      let res;
      try{
        let tmp = await this.$http.post('/register',data)
        res = tmp.data
      }catch (err){
        this.isSubmit = false
        NProgress.done()
        return this.$notify({type:'warning',message:"服务器异常，稍后再试"})
      }

      this.isSubmit = false

      if (res.code === 0){
        this.setNamePassword(this.student_number,this.password,this.email,this.username)
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
      switch (this.morningText) {
        case '07:45-08:30 (随机时间不固定)':
          this.morning_time = 7
          break
        case '08:45-09:30 (随机时间不固定)':
          this.morning_time = 8
          break
        case '09:45-10:30 (随机时间不固定)':
          this.morning_time = 9
          break
        case '不健康打卡':
          this.morning_time = -1
          break
        case "不修改":
          this.morning_time = -2
          break
        case '11.15-11.55 (随机时间不固定)':
          this.morning_time = 11
          break
        case '13.15-13.55 (随机时间不固定)':
          this.morning_time = 13
          break
        case '15.15-15.55 (随机时间不固定)':
          this.morning_time = 15
          break
        case '17.00-17.25 (随机时间不固定)':
          this.morning_time = 17
          break
        case '17.35-17.50 (随机时间不固定)':
          this.morning_time = 1730
          break
      }
      this.morningText = value
      this.showSignMorningSelect = false
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
    // 点击购买
    clickBuy() {
     this.$router.push('/b')
    },
    setNamePassword(student_number,password,email,username){
      if (student_number !== "" && student_number !== null){
        window.localStorage.setItem("student_number",student_number)
      }
      if (password !== "" && password !== null){
        window.localStorage.setItem("password",password)
      }
      if (email !== "" && email !== null){
        window.localStorage.setItem("email",email)
      }
      if (username !== "" && username !== null){
        window.localStorage.setItem("username",username)
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
}

.head-link {
  margin-left: -8px;
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

.no-code {
  margin-top: 20px;
  text-align: center;
  color: #1989f7;
  font-size: 17px;
}
</style>
