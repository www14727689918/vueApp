<template>
  <div id="all">
    <myHeader/>
  <div class="container">

    <div class="alert alert-info">
      <form v-if="!result">
        <div class="form-group">
          <label for="name">收货人</label>
          <input type="text"
                 id="name"
                 v-model="order.user_name"
                 class="form-control"/>
        </div>

        <div class="form-group">
          <label>性别</label>

          <div class="radio-inline">
            <label>
              <input type="radio"
                     name="sex"
                     v-model="order.sex"
                     value="1"/>男
            </label>
          </div>
          <div class="radio-inline">
            <label>
              <input type="radio"
                     name="sex"
                     v-model="order.sex"
                     value="2"/>女
            </label>
          </div>
        </div>

        <div class="form-group">
          <label for="phone">联系电话</label>
          <input type="text"
                 id="phone"
                 v-model="order.phone"
                 class="form-control"/>
        </div>

        <div class="form-group">
          <label for="address">收货地址</label>
          <textarea id="address"
                    v-model="order.addr"
                    class="form-control"></textarea>

        </div>
        <input type="button"
               value="提交订单"
               v-on:click="submitOrder()"
               class="btn btn-success btn-block"/>
      </form>
      <transition name="bounce">
          <p v-if="result">{{result}}</p>
      </transition>
    </div>
    <myFooter/>
  </div>
  </div>
</template>
<script>
  import jsonp from 'jsonp'
  import myHeader from '@/components/Header'
  import myFooter from '@/components/Footer'
  import {mapGetters, mapActions}from 'vuex'
  import {MessageBox } from 'mint-ui';
  export default {
    name: 'order',
    components: {
      'myHeader': myHeader,
      'myFooter': myFooter
    },
    data() {
      return {
        order: {},
        result: null
      }
    },
    computed: mapGetters([
      'count',
      'totalprice',
      'cartDetail',
      'userMsg'
    ]),
    methods: {
      submitOrder: function () {
        var that = this;
//        jsonp('http://127.0.0.1/data/order_add.php?did=' + that.order.did + '&user_name=' + that.order.user_name + '&sex=' + that.order.sex+ '&phone=' + that.order.phone + '&addr=' + that.order.addr , {prefix: 'callback'}, function (err, data) {
////          console.log(data[0].msg);
//          if (data[0]) {
//            if (data[0].msg == 'succ') {
//              that.result = "下单成功，订单编号为:" + data[0].oid;
//              localStorage.setItem('phone', that.order.phone);
//            }
//            else {
//              that.result = "下单失败";
//            }
//            console.log('result is ' + that.result);
//          }
//        })
          if(that.totalprice==0){
            MessageBox.confirm('订单超时,是否跳转到购物车页面?').then(function (action) {
              that.$parent.$router.push('/cart')
          },function (err) {
              console.log(err)
            })
          }else {
            var cartDetail=(JSON.stringify(that.cartDetail).replace(/\%27/g, "\\'"));

            jsonp('http://mytest001.applinzi.com/data/order_add.php?phone='+that.order.phone+'&userid='+that.userMsg+'&user_name='+that.order.user_name +'&addr=' + that.order.addr+'&totalprice='+that.totalprice+'&cartDetail='+cartDetail,{name:'callback'},function (err, data) {
              if(data.msg=="success"){
                that.$store.commit('set', 0);
                that.result = "下单成功，订单编号为:" + data.oid;
//                localStorage.setItem('uid', 1);
              }else {
                that.result = "下单失败";
              }
            })
          }
      }
    },
    created() {
      this.order = {did: this.$route.params.id};
    }
  }
</script>

<style scoped>
  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
  #all{
    margin-top: 60px;
  }
</style>
