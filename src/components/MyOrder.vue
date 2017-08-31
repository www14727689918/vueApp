<template>
  <div id="all">
  <div class="container">

    <h1 class="text-center">我的订单</h1>

    <div class="table-responsive">
      <table class="table">
        <thead>
        <tr>
          <th>编号</th>
          <th>菜品</th>
          <th>下单时间</th>
          <th>联系人</th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="order in orderList">
          <td>{{order.oid}}</td>
          <td>
            <a v-on:click="jump('/detail/'+order.did)">
              <img class="img-responsive"
                   :src="'http://1.mytest001.applinzi.com/img/'+order.img_sm"
                   alt=""/>
            </a>
          </td>
          <td>{{order.order_time}}</td>
          <td>{{order.user_name}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <myFooter/>
  </div>
  </div>
</template>

<script>

  import myHeader from '@/components/Header'
  import myFooter from '@/components/Footer'
  import jsonp from 'jsonp'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    name: 'MyOrder',
    data() {
      return {
        orderList: []
      }
    },
    components: {
      'myHeader': myHeader,
      'myFooter': myFooter
    },
    methods: {
      jump: function (path) {
        this.$parent.jump(path);
      }
    },
    computed: mapGetters([
      'count',
      'totalprice',
      'cartDetail',
      'userMsg'
    ]),
    created() {
      var that = this;
        if (!that.userMsg) {
          that.jump('/login')
        } else {
          jsonp('http://mytest001.applinzi.com/data/order_getbyuserid.php?userid=' + that.userMsg, {name: 'callback'}, function (err, data) {
            that.orderList = data.data;
          })
        }
    }
  }
</script>

<style scoped>
  #all{

    margin-bottom: 60px;
  }

</style>
