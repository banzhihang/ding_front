<template>
  <div>
    <div class="head">
      <p>自动打卡</p>
    </div>
    <div style="margin: 30px 20px 20px 20px">
      <van-row gutter="10">
        <van-col span="8">
          <router-link to="/try">
            <van-button square type="primary" native-type="button" plain size="large" color="#EE7547">0元试用10日</van-button>
          </router-link>
        </van-col>

        <van-col span="7">
          <router-link to="/register">
            <van-button square type="info" native-type="button" size="large" plain>激活</van-button>
          </router-link>
        </van-col>

        <van-col span="9">
          <router-link to="/alter">
            <van-button square type="primary" native-type="button" size="large" plain>修改信息</van-button>
          </router-link>
        </van-col>

        <van-col span="8">
          <router-link to="/hand">
            <van-button square type="info" native-type="button" size="large" plain color="#F8D557">手动打卡</van-button>
          </router-link>
        </van-col>
        <van-col span="7">
          <router-link to="/notice">
            <van-button square type="primary" native-type="button" size="large" plain color="#5EC5FA">帮助中心</van-button>
          </router-link>
        </van-col>
        <van-col span="9">
          <router-link to="/exchange">
            <van-button square type="primary" native-type="button" size="large" plain color="#9932CC">兑换</van-button>
          </router-link>
        </van-col>
      </van-row>
    </div>

      <div style="margin:10px">
        <van-tabs color="#4187F2">
          <van-tab title="客服信息"  >
            <div class="content">
              <van-cell-group :border="false">
                <van-cell title="QQ" :border="false" value="997948107" icon="http://p.pigpigen.online/QQ.png"/>
                <van-cell title="二维码" :border="false" value="扫描下方添加" icon="http://p.pigpigen.online/%E4%BA%8C%E7%BB%B4%E7%A0%81.png"/>
              </van-cell-group>
              <div class="image">
                <van-image
                    width="200"
                    height="244"
                    src="http://p.pigpigen.online/%E5%AE%A2%E6%9C%8Dqq.jpg"
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
  created() {
    Dialog.alert({
      message: '点击链接0元试用10日！',
      confirmButtonColor:'#4187F2',
      theme: 'round-button',
    })
    const code = this.$route.query.code
    if (code !== undefined){
      window.sessionStorage.setItem('invite_code', code)
    }
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
