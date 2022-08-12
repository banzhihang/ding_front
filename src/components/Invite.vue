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
        <div class="center-in">
          1.邀请1个好友试用，即可获得 <span style="color: red">{{ i60.invite_price }}元</span> 邀请奖励。
        </div>
      <div class="center-in">
        2.邀请1个好友购买
        <span class="time">半年</span>、
        <span class="time">一年</span>、<span class="time">两年</span>、
        <span class="time">四年</span> 激活码，分别可以获得
        <span class="price">{{i20.invite_price}}元、
        </span><span class="price">{{i30.invite_price}}元、
      </span ><span class="price">{{i40.invite_price}}元、
      </span><span class="price">{{i50.invite_price}}元</span>
        邀请奖励。
      </div>
      <div class="center-in">
        3.好友试用填写邀请码则试用时间增加10天至20天。
      </div>
      <div class="center-in">
        4.好友凭你的邀请码购买 <span class="time">半年</span>、
        <span class="time">一年</span>、<span class="time">两年</span>、
        <span class="time">四年</span> 激活码，
        分别可以便宜
        <span class="price">{{i20.be_invite_price}}元、
        </span><span class="price">{{i30.be_invite_price}}元、
      </span ><span class="price">{{i40.be_invite_price}}元、
      </span><span class="price">{{i50.be_invite_price}}元</span>。
      </div>
      <div class="center-in">
        5.好友试用填写你的邀请码，试用成功会自动往你的可兑换余额添加<span style="color: red">{{ i60.invite_price }}元</span>。
      </div>
      <div class="center-in">
        6.好友购买激活码时出示你的邀请码，激活成功会自动往你的可兑换余额增加对应金额。
      </div>
      <div class="center-in">
        7.添加客服QQ出示邀请码和兑换密匙即可兑换现金。
      </div>

    </div>

    <div style="margin: 10px 20px 20px 20px" class="btn">
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
      i60:{
        invite_price: 10,
        be_invite_price: 5
      },
      i50:{
        invite_price: 10,
        be_invite_price: 5
      },
      i40:{
        invite_price: 10,
        be_invite_price: 5
      },
      i30:{
        invite_price: 10,
        be_invite_price: 5
      },
      i20:{
        invite_price: 10,
        be_invite_price: 5
      },
      i10:{
        invite_price: 10,
        be_invite_price: 5
      }
    }
  },
  async created() {
    const {data:res} = await this.$http.get('/code_info',{params

    })
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
  padding: 17px;
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
  border-radius:10px;
  box-shadow:1px 1px 5px 1px rgba(0, 0, 0, 0.1);
}

</style>
