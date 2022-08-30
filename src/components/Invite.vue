<template>
  <div>
<!--    <div class="head">-->
<!--      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" >-->
<!--        <van-swipe-item >-->
<!--            <van-image radius="10px" width="100%" height="100%"-->
<!--                       src="http://cdn.hotschool.ltd/lunbotu1.jpg"/>-->

<!--        </van-swipe-item>-->
<!--        <van-swipe-item>-->
<!--          <van-image radius="10px" width="100%" height="100%"-->
<!--                     src="http://cdn.hotschool.ltd/lunbotu2.jpeg"/>-->
<!--        </van-swipe-item>-->
<!--      </van-swipe>-->
<!--    </div>-->
    <div class="center">
        <div class="center-in">
          1.邀请1位好友试用，即可获得 <span style="color: red">{{ i60.invite_price }}元</span> 奖励
        </div>
      <van-divider></van-divider>
      <div class="center-in">
        2.邀请1位好友购买
        <span class="time">半年</span>、
        <span class="time">一年</span>、<span class="time">两年</span>、
        <span class="time">四年</span> 激活码，分别可以获得
        <span class="price">{{i20.invite_price}}元、
        </span><span class="price">{{i30.invite_price}}元、
      </span ><span class="price">{{i40.invite_price}}元、
      </span><span class="price">{{i50.invite_price}}元</span>
        奖励（时长半年以下没有邀请奖励）
      </div>
      <van-divider></van-divider>
      <div class="center-in">
        3.好友试用填写邀请码试用时间增加10天
      </div>
      <van-divider></van-divider>
      <div class="center-in">
        4.凭你的邀请码购买 <span class="time">半年</span>、
        <span class="time">一年</span>、<span class="time">两年</span>、
        <span class="time">四年</span> 激活码，
        分别可享
        <span class="price">{{i20.be_invite_price}}元、
        </span><span class="price">{{i30.be_invite_price}}元、
      </span ><span class="price">{{i40.be_invite_price}}元、
      </span><span class="price">{{i50.be_invite_price}}元</span> 优惠
      </div>
      <van-divider></van-divider>
      <div class="center-in">
        5.奖励在完成试用或激活之后自动增加至你的可提现余额
      </div>
      <van-divider></van-divider>
      <div class="center-in">
        6.提现请点击下方按钮，查看自己的可提现余额，点击提交提现申请即可。管理员收到提现请求之后会向你付款。
      </div>
      <van-divider></van-divider>

    </div>

    <div style="margin: 1px 20px 20px 20px" class="btn">
      <van-row gutter="15">
        <van-col span="24">
          <van-button  round type="info" native-type="button"  size="large" to="/invite_code">查看我的邀请码</van-button>
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
      i60:{
        invite_price: 0,
        be_invite_price: 0
      },
      i50:{
        invite_price: 0,
        be_invite_price: 0
      },
      i40:{
        invite_price: 0,
        be_invite_price: 0
      },
      i30:{
        invite_price: 0,
        be_invite_price: 0
      },
      i20:{
        invite_price: 0,
        be_invite_price: 0
      },
      i10:{
        invite_price: 0,
        be_invite_price: 0
      }
    }
  },
  async created() {
    const {data:res} = await this.$http.get('/code_info',)
    this.i60 = res.data.i60
    this.i50 = res.data.i50
    this.i40 = res.data.i40
    this.i30 = res.data.i30
    this.i20 = res.data.i20
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
  margin-top: 5px;
  padding-top: 17px;
  padding-right: 17px;
  padding-left: 17px;

  .center-in {
    margin-bottom:20px;
    .price{
      color: red;

    }
    .time{
      color: #ff9a00;

    }
  }
}
.notice{
  margin-top: 30px;
}
.van-button {
  margin-bottom: 15px;
  //border-radius:10px;
  box-shadow:1px 1px 5px 1px rgba(0, 0, 0, 0.1);
}

</style>
