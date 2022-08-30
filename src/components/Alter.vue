<template>
  <div class="body-x">
    <div class="head-link">
      <router-link to="/hand">
        <van-notice-bar mode="closeable" left-icon="info-o" background="#ffffff" color="#4187F2" :scrollable="false">
          新增手动打卡，点击本链接使用。
        </van-notice-bar>
      </router-link>
    </div>
    <van-form @submit="onSubmit" class="data-form" validate-trigger="onSubmit" validate-first :show-error="false">
      <!--    学工号-->
      <van-field
          v-model="student_number"
          name="学号"
          label="学号"
          placeholder=""
          clearable
          required
          border
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
      <!--    新邮箱-->
      <van-field
          v-model="email"
          type="email"
          name="新邮箱"
          label="新邮箱"
          clearable
          label-width="5em"
          placeholder="不修改邮箱请不要填写"
          :rules="[{required: isAlterEmail, message: '请输入正确邮箱',pattern: isAlterEmail?emailRex:''}]"
          v-show="isAlterEmail"
      />

      <van-field
          v-model="valid_code"
          name=""
          label="验证码"
          placeholder="请输入邮箱验证码"
          clearable
          border
          label-width="5em"
          :rules="[{required: isAlterEmail, message: '请输入正确验证码',pattern: isAlterEmail?validCodeRex:''}]"
          v-show="isAlterEmail"
      >
        <template #button >
          <div class="email-btn">
            <div class="email-btn-in">
              <van-button  type="info" :disabled="isSmsSend" class="email-btn-in" @click="clickSendCode" native-type="button" size="small">{{sendBtnText}}</van-button>
            </div>
          </div>
        </template>
      </van-field>

      <van-field name="邮箱" label="邮箱" label-width="5em">
        <template #input>
          <van-radio-group v-model="isAlterEmail" direction="horizontal">
            <van-radio :name="false">不修改</van-radio>
            <van-radio :name="true">修改</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <!--    打卡状态-->
      <van-field name="打卡状态" label="打卡状态" label-width="5em">
        <template #input>
          <van-radio-group v-model="status" direction="horizontal">
            <van-radio name="1">正常打卡</van-radio>
            <van-radio name="0">暂停打卡</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <!--  是否晚检-->
<!--      <van-field name="radio" label="是否晚检">-->
<!--        <template #input>-->
<!--          <van-radio-group v-model="night_time" direction="horizontal">-->
<!--            <van-radio name="0">不修改</van-radio>-->
<!--            <van-radio name="7">是</van-radio>-->
<!--            <van-radio name="-1">否</van-radio>-->
<!--          </van-radio-group>-->
<!--        </template>-->
<!--      </van-field>-->

      <!--早读打卡-->
<!--      <van-field name="radio" label="早读打卡">-->
<!--        <template #input>-->
<!--          <van-radio-group v-model="is_morning_read" direction="horizontal">-->
<!--            <van-radio name="2">不修改</van-radio>-->
<!--            <van-radio name="1" @click="clickMorningRead">是</van-radio>-->
<!--            <van-radio name="0">否</van-radio>-->
<!--          </van-radio-group>-->
<!--        </template>-->
<!--      </van-field>-->

      <!--    定位地点-->
      <van-field name="radio" label="定位地点" label-width="5em">
        <template #input>
          <van-radio-group v-model="location" direction="horizontal">
            <van-radio name="2" @click="showDetailedAddress=false">不修改</van-radio>
            <van-radio name="0" @click="showDetailedAddress=false">在校</van-radio>
            <van-radio name="1" @click="showArea=true">自选</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-popup v-model="showArea" position="bottom" :close-on-click-overlay="false" round>
        <van-area
            :area-list="areaList"
            @confirm="addressOnConfirm"
            @cancel="showArea = false;address='';location='2';showDetailedAddress=false"
        />
      </van-popup>

      <van-field v-model="user_address_detail" label="详细地址"  v-show="showDetailedAddress" label-width="5em"/>

      <!--    在校地点-->
      <van-field name="radio" label="在校地点" label-width="5em">
        <template #input>
          <van-radio-group v-model="selectSchool" direction="horizontal">
            <van-radio name="不做修改" @click="showBeiPei=false;schoolText='北碚';school='不做修改'">不修改</van-radio>
            <van-radio name="西南大学荣昌校区" @click="showBeiPei=false;schoolText='北碚';school='西南大学荣昌校区'">荣昌</van-radio>
            <van-radio name="西南大学" @click="showBeiPei=true">{{schoolText}}</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-popup v-model="showBeiPei" round position="bottom" :close-on-click-overlay="false">
        <van-picker
            show-toolbar
            :columns="schoolColumns"
            @cancel="showBeiPei=false;selectSchool='不做修改';schoolText='北碚';school='不做修改'"
            @confirm="schoolOnConfirm"
        />
      </van-popup>
      <!--    修改照片-->
<!--      <van-field name="radio" label="修改照片">-->
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
      <!--    查寝时间-->
      <!--    晨检时间-->
      <van-field
          readonly
          clickable
          label="晨检时间"
          v-model="morningText"
          @click="showSignMorningSelect = true"
          is-link
          label-width="5em"
      />
      <van-popup v-model="showSignMorningSelect" round position="bottom" :close-on-click-overlay="false">
        <van-picker
            show-toolbar
            :columns="signMorningColumns"
            @cancel="showSignMorningSelect = false;morningText='不修改'"
            @confirm="morningOnConfirm"
        />
      </van-popup>

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
            @cancel="showAttenSelect = false;attenText='不修改'"
            @confirm="attenOnConfirm"
        />
      </van-popup>

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit" loading-text="提交中..." :loading="isSubmit" :disabled="isSubmit"
        >提交</van-button>
      </div>
    </van-form>
    <div class="pop">
      <van-popup v-model="showAlterInfo" :round="true" :closeable="true"
                 close-icon-position="top-left"
                 :style="{ height: '90%' }"
                 position="bottom"
                 close-icon="close"
      >
        <alter-info :alterInfos="afterAlterInfo" @closed="closed"></alter-info>
      </van-popup>
    </div>

  </div>
</template>

<script>
import { areaList } from '@vant/area-data';
import {Dialog, Toast} from "vant";
import NProgress from "nprogress";
import alterInfo from "./alterInfo";
export default {
  name: "Alter",
  data() {
    return {
      // 显示修改后的信息
      showAlterInfo:false,
      // 显示查寝选择框
      showAttenSelect: false,
      // 学工号
      student_number: '',
      // 密码
      password: '',
      status: '1',
      // 查寝时间
      time: 0,
      // 是否晚检
      night_time: '0',
      //  查寝时间选择
      attenColumns: ['不修改', '不查寝','19:10-19:25 (随机时间不固定)', '20:10-20:25 (随机时间不固定)', '21:10-21:25 (随机时间不固定)', '21:40-21:55 (随机时间不固定)', '22:10-22:25 (随机时间不固定)', '22:40-22:55 (随机时间不固定)'],
      // 是否显示修改照片区域
      showAlterPhoto: false,
      // 是否显示修改定位地点
      showArea: false,
      // 地域数据
      areaList: areaList,
      // 新邮箱
      email: '',
      // 是否早读打卡
      is_morning_read: '2',
      // 是否修改照片
      is_alter_photo: '0',
      // 是否修改定位地点
      location: "2",
      // 文件上传预览图
      fileList: [],
      // 在校地点
      school: '不做修改',
      // 在校地点当前选中的radio
      selectSchool:'不做修改',
      // 是否显示北培在校地点选择
      showBeiPei: false,
      // 校区选择
      schoolColumns: ['李园', '桃园', '梅园', '杏园', '橘园', '楠园', '竹园', '柑桔研究所'],
      signMorningColumns:['不修改','不晨检','07:45-08:30 (随机时间不固定)','08:45-09:30 (随机时间不固定)','09:45-10:30 (随机时间不固定)'],
      // 晨检选项区显示内容
      morningText:'不修改',
      showSignMorningSelect:false,
      // 查寝时间选项显示内容
      attenText: '不修改',
      // 在校地点北培显示内容
      schoolText: '北碚',
      morning_time:-2,
      attendance_time:-2,
      // 详细地址
      address: '',
      user_address_detail:'',
      // 是否显示详细地址
      showDetailedAddress: false,
      // 待上传图片数组(base64格式)
      waitUploadPhoto: [],
      // 等待提交图片名数组
      waitSubmitPhoto: [],
      // 是否在上传照片
      isUploadPhoto:false,
      // 是否在提交
      isSubmit:false,
      afterAlterInfo:{},
      isAlterEmail:false,
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
    };
  },
  methods: {
    async onSubmit() {
      let addressCheck
      addressCheck = this.checkAddressIsEdit()
      if (addressCheck === false) {
        return
      }

      let reg = new RegExp('/','g')
      let data = {
        student_number: this.student_number,
        password: this.password,
        morning_time:this.morning_time,
        status: this.status,
        school: this.school,
        email: this.isAlterEmail?this.email:'123456789@qq.com',
        location: this.location,
        address: this.address? this.address.replace(reg,''):'',
        attendance_time: this.attendance_time,
        user_address_detail:this.user_address_detail,
        valid_code:this.valid_code
      }

      console.log(data)
      this.isSubmit = true
      let res;
      try{
        let tmp = await this.$http.post('/alter',data)
        res = tmp.data
      }catch (err){
        this.isSubmit = false
        NProgress.done()
        return this.$notify({type:'warning',message:"服务器异常，稍后再试"})
      }

      this.isSubmit = false

      if (res.code === 0){
        this.afterAlterInfo = res.data
        this.showAlterInfo = true
        this.setNamePassword(this.student_number,this.password)
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
        case "不修改":
          this.attendance_time = -2
      }
      console.log(this.attendance_time)
      this.showAttenSelect = false
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

    // 自定义定位地点弹出选项框点击确定
    addressOnConfirm(value) {
      this.address = value
          .filter((item) => !!item)
          .map((item) => item.name)
          .join('/');
      this.showDetailedAddress = true
      this.user_address_detail = this.getUserAddressDetail(this.address)
      this.showArea = false
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
    morningOnConfirm(value) {
      this.morningText = value
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
        case '不晨检':
          this.morning_time = -1
          break
        case "不修改":
          this.morning_time = -2
          break
      }

      this.showSignMorningSelect = false
    },
    closed(){
      Toast.success("修改成功")
      this.showAlterInfo=false
    },
    getUserAddressDetail(address){
      let reg = new RegExp('/','g')
      return address.replace(reg,'')
    },

    // 检查用户是否将地址补全
    checkAddressIsEdit() {
      if (this.location === "1") {
        let reg = new RegExp('/','g')
        const addressTmp = this.address.replace(reg, '');
        if (this.user_address_detail === addressTmp) {
          this.$notify({type:'warning',message:'请点击详细地址将地址补充完整'})
          return false
        }
      }
      return true
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
    setNamePassword(student_number,password){
      if (student_number !== "" && student_number !== null){
        window.localStorage.setItem("student_number",student_number)
      }
      if (password !== "" && password !== null){
        window.localStorage.setItem("password",password)
      }
    },
    getNamePassword() {
      const student_number = window.localStorage.getItem("student_number")
      const password = window.localStorage.getItem("password")
      if (student_number !== null && student_number !== "") {
        this.student_number = student_number
      }
      if (password !== null && password !== "") {
        this.password = password
      }
    }

  },
  components:{
    alterInfo,
  },
  created() {
    this.getNamePassword()
  }
}
</script>

<style scoped lang="less">
.data-form {
  margin-top: -10px;
  margin-left: 3px;
}
.van-notice-bar {
  padding-left: 15px;
}
.van-field {
  margin-bottom: 5px;
  margin-top: 5px;
}
.notice-swipe {
  height: 40px;
  line-height: 40px;
}
.pop{
  /deep/ .van-icon {
    top: 23px;
    left: 30px;
  }
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
</style>
