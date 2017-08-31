<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
//  import {mapGetters, mapActions} from 'vuex'
  import jsonp from 'jsonp'

  export default {
    name: 'app',
    methods: {
//      ...mapActions([
//        'add',
//        'set',
//        'sub',
//        'totalSet'
//      ]),
      jump: function (path) {
        this.$router.push(path)
      }
    },
//    computed: mapGetters([
//      'count',
//      'userMsg'
//    ]),
//    created() {
//      var that = this;
//      console.log(that.userMsg)
//
//    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .page-swipe {
    margin-top: 50px;
  }

  .page-swipe .mint-swipe {
    height: 200px;
    color: #fff;
    font-size: 30px;
    text-align: center;
    margin-bottom: 20px;
  }

  .page-swipe .mint-swipe-item {
    line-height: 200px;
  }

  .page-swipe .slide1 {
    background-color: #0089dc;
    color: #fff;
  }

  .page-swipe .slide2 {
    background-color: #ffd705;
    color: #000;
  }

  .page-swipe .slide3 {
    background-color: #ff2d4b;
    color: #fff;
  }

  .page-swipe-desc {
    text-align: center;
    color: #666;
    margin-bottom: 5px;
  }

</style>
