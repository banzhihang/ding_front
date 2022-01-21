<template>
  <div>
    <div class="head">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" >
        <van-swipe-item >
            <van-image radius="10px" width="100%" height="100%"
                       src="http://p.pigpigen.online/lunbotu1.jpg"/>

        </van-swipe-item>
        <van-swipe-item>
          <van-image radius="10px" width="100%" height="100%"
                     src="http://p.pigpigen.online/lunbotu2.jpeg"/>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="center">
      <van-cell-group :border="false">
        <van-cell title="1.邀请1个好友试用，即可获得5元。" size="large" :border="false"/>
        <van-cell title="2.邀请1个好友永久激活，即可获得15元。" size="large" :border="false"/>
        <van-cell title="3.试用填写邀请码则试用时间增加10天。" size="large" :border="false"/>
        <van-cell title="4.购买永久激活码时出示邀请码价格便宜5元。" size="large" :border="false"/>
      </van-cell-group>
    </div>

    <div style="margin: 40px 20px 20px 20px" class="btn">
      <van-row gutter="15">
        <van-col span="24">
          <van-button square type="primary" native-type="button" plain size="large" color="#" to="/invite_code">查看我的邀请码</van-button>
        </van-col>
      </van-row>
    </div>

  </div>
</template>

<script>
export default {
  name: "InviteFriend",
  data () {
    return{

    }
  },
  methods:{
  }
}
</script>

<style scoped lang="less">
.head{
  margin:15px 15px 15px 15px;
  border-radius: 20px;
  overflow: hidden;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 130px;
  height: 130px;
  text-align: center;
  border-radius: 15px;
}
.center {
  margin-top: 40px;
}
.notice{
  margin-top: 30px;
}
.van-button {
  margin-bottom: 15px;
  border-radius:10px;
  box-shadow:1px 1px 5px 1px rgba(0, 0, 0, 0.1);
}

</style>
