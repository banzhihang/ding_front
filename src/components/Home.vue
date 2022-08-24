<template>
  <div>
    <div class="head">
      <p>自动打卡</p>
    </div>
    <div style="margin: 30px 20px 20px 20px">
      <van-row gutter="10">
        <van-col span="8">
          <router-link to="/try">
            <van-button square type="primary" native-type="button" plain size="large" color="#1989f7">0元试用10日</van-button>
          </router-link>
        </van-col>

        <van-col span="7">
          <router-link to="/register">
            <van-button square type="info" native-type="button" size="large" plain>激活</van-button>
          </router-link>
        </van-col>

        <van-col span="9">
          <router-link to="/alter">
            <van-button square type="primary" native-type="button" size="large" plain color="#1989f7">修改信息</van-button>
          </router-link>
        </van-col>

        <van-col span="8">
          <router-link to="/hand">
            <van-button square type="info" native-type="button" size="large" plain color="#1989f7">手动打卡</van-button>
          </router-link>
        </van-col>
        <van-col span="7">
          <router-link to="/notice">
            <van-button square type="primary" native-type="button" size="large" plain color="#1989f7">帮助中心</van-button>
          </router-link>
        </van-col>
        <van-col span="9">
          <router-link to="/exchange">
            <van-button square type="primary" native-type="button" size="large" plain color="#1989f7">兑换</van-button>
          </router-link>
        </van-col>
        <van-col span="12">
          <router-link to="/b">
            <van-button square type="primary" native-type="button" size="large" plain color="#1989f7">购买激活码</van-button>
          </router-link>
        </van-col>
        <van-col span="12">
          <router-link to="/invite">
            <van-button square type="primary" native-type="button" size="large" plain color="#1989f7">邀请好友送现金</van-button>
          </router-link>
        </van-col>

      </van-row>
    </div>

    <div style="margin: -15px 10px 10px;">
        <van-tabs color="#1989f7">
          <van-tab title="客服信息"  >
            <div class="content">
              <van-cell-group :border="false">
                <van-cell title="QQ" :border="false" :value="masterQQNum" icon="http://cdn.hotschool.ltd/QQ.png"/>
                <van-cell title="二维码" :border="false" value="扫描下方添加" icon="http://cdn.hotschool.ltd//%E4%BA%8C%E7%BB%B4%E7%A0%81.png"/>
              </van-cell-group>
              <div class="image">
                <van-image
                    width="300"
                    height="300"
                    :src="masterQQUrl"
                />
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
  </div>
</template>

<script>
import {Dialog} from "vant";

export default {
  name: "Home",
  data() {
    return {
      masterQQNum:'997948107',
      masterQQUrl:"http://cdn.hotschool.ltd/new_qq.jpg",
      homePopMsg:'邀请好友有高额奖励！点击邀请好友送现金了解详情'
    }
  },
  methods:{
    async getConfig(){
      const params = {
        'config_name':['master_qq','master_qq_url','home_pop_msg']
      }
      const {data:res} = await this.$http.post('/config',params)
      this.masterQQNum = res.data.master_qq
      this.masterQQUrl = res.data.master_qq_url
      this.homePopMsg = res.data.home_pop_msg
    }
  },
  async created() {
    await this.getConfig()
    await Dialog.alert({
      message: this.homePopMsg,
      confirmButtonColor: '#4187F2',
      theme: 'round-button',
    })
  }
}
</script>

<style scoped lang="less">
.van-button {
  margin-bottom: 15px;
  border-radius:10px;
  box-shadow:1px 1px 5px 1px rgba(0, 0, 0, 0.1);
}
.content {
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 50px;
}
.image {
  margin-top: 10px;
  text-align: center;
}
.head {
  margin-left: 20px;
  font-size:  1.2rem;

}
.van-icon {
  margin-top: 2px;
}
.van-cell__value {
  color: black;
}

</style>
