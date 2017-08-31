<template>
  <div class="navbar navbar-default navbar-fixed-bottom">

    <div class="container pd0">

      <ul class="navbar-footer-menu">
        <li class="btn-block">
          <a href="#/start" >
            <span class="glyphicon glyphicon-home"></span>
            <span class="tab-title">主页</span>
          </a>
        </li>

        <li class="btn-block" :class="{ 'class-a': isA }" @click="bg($event.currentTarget.href,1)">
          <a href="#/myOrder" >
            <span class="glyphicon glyphicon-user"></span>
            <span class="tab-title">订单中心</span>
          </a>
        </li>
        <li class="btn-block" :class="{ 'class-a': isB }" @click="bg($event.currentTarget.className,2)">
          <a href="#/cart" class="parent" >
            <span class="glyphicon glyphicon-shopping-cart"></span>
            <span class="tab-title">购物车</span>
            <mt-badge size="small" type="error" class="son">{{count}}</mt-badge>
          </a>
        </li>
        <li class="btn-block" :class="{ 'class-a': isC}" @click="bg($event.currentTarget.className,3)">
          <a href="#/set" >
            <span class="glyphicon glyphicon-cog"></span>
            <span class="tab-title">设置</span>
          </a>
        </li>
      </ul>

    </div>

  </div>
</template>

<script>
  import { Badge } from 'mint-ui';
  import {mapGetters, mapActions}from 'vuex'
  import index from "../router/index";
  export default {
    name: 'kflFooter',
    data(){
      return {
      }
    },
    components:{
      'mtBadge':Badge
    },
    methods:{
      ...mapActions([
        'add',
        'set',
        'sub',
        'totalSet',
        'userMsgSet',
        'steA',
        'steB',
        'steC',
      ]),
      bg(a,index){

        if(index==1){
//          console.log(this.isA)
          this.$store.commit('steA', true);
          this.$store.commit('steB', false);
          this.$store.commit('steC', false);
        }else if (index==2){
          this.$store.commit('steA', false);
          this.$store.commit('steB', true);
          this.$store.commit('steC', false);
        }else {
          this.$store.commit('steA', false);
          this.$store.commit('steB', false);
          this.$store.commit('steC', true);
        }

      }
    },
    computed: mapGetters([
      'count',
      'isA',
      'isB',
      'isC',
    ]),
  }
</script>
<style scoped>
  ul{
    display: flex;
    justify-content:space-between;
    padding:0;
    margin: 0;
  }
  ul li{
    display: flex;
    justify-content:center;
    margin-top: 0px!important;
    /*padding-top: 15px;*/
  }
  ul li a{
    font-size: 28px;
    color: #e4393c;
  }
  .tab-title{
    lex: 1;
    display: block;
    overflow: hidden;
    max-width: 150px;
    height: 100%;
    color: inherit;
    text-align: center;
    text-decoration: none;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 400;
    font-size: 14px;
    font-family: "-apple-system", "Helvetica Neue", "Roboto", "Segoe UI", sans-serif;
    opacity: 0.7;
  }
  .pd0{
    padding: 0;
  }
  .parent{
    position: relative;
  }
  .son{
    position: absolute;
    top: 0;
    right: -15px;
  }
  .class-a{
    background: linear-gradient(red, blue); /* 标准的语法（必须放在最后） */
    padding: 0 10px;
  }
</style>
