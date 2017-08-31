<template>
  <div id="all">
    <myHeader/>
  <div class="container">

    <ul class="breadcrumb ">
      <li>
        <a href="#/start">主页</a>
      </li>
      <li>详情</li>
    </ul>

    <div class="panel panel-default">

      <div class="panel-body">
        <div class="page-header">
          <h2>{{dish.name}}</h2>
          <img class="img-responsive"
               :src="'http://1.mytest001.applinzi.com/img/'+dish.img_lg" alt=""/>

          <div class="text-justify">
            <p>{{dish.material}}</p>
            <p>{{dish.detail}}</p>
            <p>价格：<span class="jdColor">{{dish.price | money1(dish.price)}}</span></p>
          </div>
        </div>
      </div>

      <div class="panel-footer">
        <div class="text-right">
          <button v-on:click="giveTips"
                  class="btn btn-success">
            添加到购物车
          </button>
          <button v-on:click="jump('/main')"
                  class="btn btn-primary">我再看看
          </button>
        </div>
      </div>
    </div>
    <myFooter/>
  </div>
  </div>
</template>

<script>

  import myHeader from '@/components/Header'
  import myFooter from '@/components/Footer'
  import jsonp from 'jsonp'
  import {MessageBox} from 'mint-ui';
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: 'detail',
    components: {
      'myHeader': myHeader,
      'myFooter': myFooter
    },
    data() {
      return {
        dish: {},
        total: 0
      }
    },
    filters: {
      money1: function (value) {
        return '¥' + value + '元'
      }
    },
    methods: {
      ...mapActions([
        'add',
        'set',
        'sub',
        'totalSet',
        'userMsgSet'
      ]),
      jump: function (path) {
        this.$parent.jump(path);
      },
      giveTips: function () {
        var that = this;
          if (!that.userMsg) {
            that.jump('/login')
          } else {
            jsonp('http://mytest001.applinzi.com/data/cart_update.php?uid=' + that.userMsg + '&did=' + that.$route.params.id + '&count=-1', {name: 'callback'}, function (err, data) {
              if (data.msg == 'succ') {
                MessageBox('提示', '添加成功');
                that.add()
              }
              else {
                MessageBox('提示', '添加失败');
              }
            })
          }
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
      jsonp('http://mytest001.applinzi.com/data/dish_getbyid.php?id=' + that.$route.params.id, {prefix: 'callback'}, function (err, data) {
//        console.log(data[0]);
        that.dish = data[0];
      })
    }
  }
</script>

<style scoped>
  .panel {
    margin-bottom: 55px;
  }

  .jdColor {
    color: #e4393c;
  }
  #all{
      margin-top: 60px;
    margin-bottom: 20px;
  }
</style>
