<template>
  <div class="content">
    <div class="header">
      <div class="title">这是你当前的信息</div>
      <div class="confirm">
        <van-button type="primary" size="small" :plain="true"  square @click="closed">确定</van-button>
      </div>

    </div>
    <van-cell-group :border="false" >
      <van-cell :title="k" :value="v" v-for="(v,k) in alterInfos"
                size="large"
                :key="k" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  props:["alterInfos"],
  name: "alterInfo",
  data (){
    return {
      // alterInfo:[
      //   {
      //     name:"晨检时间",
      //     value:"7:15~8:00"
      //   },
      //   {
      //     name:"晚检时间",
      //     value:"不晚检"
      //   },
      //   {
      //     name:"早读打卡时间",
      //     value:"7:15~8:00"
      //   },
      //   {
      //     name:"查寝时间",
      //     value:"19:26"
      //   },
      //   {
      //     name:"查寝照片数量",
      //     value:"0张"
      //   },
      //   {
      //     name:"选择的校区",
      //     value:"西南大学荣昌校区"
      //   },
      //   {
      //     name:"定位地点",
      //     value:"北京市北京市海淀区"
      //   },
      //   {
      //     name:"密码",
      //     value:"12345678"
      //   },
      //   {
      //     name:"打卡状态",
      //     value:"正常打卡"
      //   },
      //   {
      //     name:"账号过期时间",
      //     value:"2022-10-01 22：13"
      //   },
      // ]
    }
  },
  methods:{
    closed(){
      this.$emit("closed")
    }
  }
}
</script>

<style scoped lang="less">
.title {
  text-align: center;
  font-size: 20px;
  color: #1f1d1d;
  margin-bottom: 10px;
}
.content {
  margin: 20px 10px 10px 10px;
}
.header {
  position: relative;
  .confirm{
    position: absolute;
    right: 5px;
    top: 0;
  }
}
.van-button{
  height: 30px;
  width: 50px;
  border-radius:7px;
  box-shadow:1px 1px 5px 1px rgba(0, 0, 0, 0.1);
}

</style>
