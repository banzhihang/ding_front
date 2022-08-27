<template>
  <div id="app">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
    <body>
      <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </body>
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>

<style scoped lang="less">
body {
  max-width: 540px;
  min-width: 320px;
  overflow-x: hidden;
  -webkit-tap-highlight-color: transparent;
  margin: 0 auto;
}
</style>
