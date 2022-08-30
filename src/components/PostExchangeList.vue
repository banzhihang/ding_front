<template>
  <div>
    <div class="head">
      <van-row type="flex">
        <van-col span="9">历史申请</van-col>
      </van-row>
    </div>
    <div class="list-in" v-for="(item,index) in itemList">
      <div class="list-one">
        <div class="btn">
          <span class="count">￥{{item.exchange_count}}</span>
          <div class="email-btn" v-show="showBtn(item.is_done,index)">
            <van-button type="info" class="email-btn-in" size="small" :disabled="item.is_done==='已完成'" @click="urgeAdmin(item.id,item.query_key)">催促管理员</van-button>
          </div>

        </div>
        <div class="history-info">
          <span>申请时间</span>
          <span>{{item.add_time}}</span>
        </div>
        <div class="history-info">
          <span>完成时间</span>
          <span>{{item.done_time}}</span>
        </div>
        <div class="history-info">
          <span>完成状态</span>
          <span>{{item.is_done}}</span>
        </div>
      </div>
      <van-divider />
    </div>
  </div>
</template>

<script>
export default {
  name: "PostExchangeList",
  data() {
    return {
      itemList: [],
      loading: false,
      finished: false,
      student_number:"",
      password:"",
    };
  },
  methods:{
    async getList(){
      if (this.student_number === "" || this.password === "") {
        return this.$notify({type: 'warning', message: "页面错误"})
      }
      const data = {
        'username':this.student_number,
        "password":this.password
      }
      const {data:res} = await this.$http.post('/apply_list',data)
      this.itemList = res.data
      this.finished = true
    },
    showBtn(isDone,index){
      return isDone === "未完成" && index ===0
    },
    async urgeAdmin(id,query_key){
      const data = {
        "id":id,
        "query_key":query_key
      }
      const {data:res} = await this.$http.post('/urge_admin',data)
      if (res.code === 0){
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
  async created() {
    this.student_number = this.$route.params.student_number
    this.password = this.$route.params.password
    if (this.student_number === "" || this.student_number === null || this.password === "" || this.password === null) {
        this.getNamePassword()
    }
    await this.getList()
  }
}

</script>

<style scoped lang="less">
.head {
  margin-top: 5%;
  margin-left: 5% ;
  font-size: 18px;
  margin-bottom: 7%;
}

.list-in{
  margin-left: 6% ;
  margin-right: 6%;
  margin-top: 5%;
  .list-one {
    .btn {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      margin-bottom: 20px;
      .count {
        font-size: 25px;
        margin-left: -10px;
        color: #e3b05f
      }
    }
  }
}

.history-info {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin-bottom: 10px;
}

.email-btn {
  width: 100px;
  height: 30px;
  position: relative;
  .email-btn-in{
    position: absolute;
    top: 0;
    right: 0;
    width: 80%;
    height: 100%;
  }
}


</style>
