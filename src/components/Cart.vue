<template>
  <div id="all">
    <myHeader></myHeader>

    <div class="container">
      <div class="well titleList">
        <h4>菜品</h4>
        <h4>内容</h4>
        <h4>操作</h4>
      </div>
      <div>
        <div class="list-group">
          <mt-cell-swipe
            v-for="(dish,index) in dishList"
             class="list-group-item well"
            :key = "dish.ctid"
            :right='[{content: "Delete",style: { background: "#e4393c", color: "#fff" },handler:function() {
                return $on("click",del(dish))
        }}]'>
            <div class="media">
              <div class="media-left media-middle">
                <img class="media-object"
                     :src="'http://1.mytest001.applinzi.com/img/'+dish.img_sm"
                     alt=""/>
              </div>
              <div class="media-body">
                <h4 class="media-heading">{{dish.name}}</h4>
                <p>数量:x{{dish.dishCount}}</p>
                <p class="jdColor">{{dish.price | money(dish.price)}}</p>
              </div>
              <div class="inputList">
                <input type="button" value="+" @click="changeNum(dish,1)" class=" btn btn-default">
                <input type="text" value="0" disabled v-model="dish.dishCount" class="numClass">
                <input type="button" value="-" @click="changeNum(dish,-1)" class=" btn btn-default">
              </div>
            </div>
          </mt-cell-swipe>
          <div  class="list-group-item total">
              <h4 >总计：<span class="jdColor bgFont">{{totalPrice | money1(totalPrice)}}</span></h4>
              <button class="btn btn-success" @click="jump('/order')">
                立即下单
              </button>
          </div>
        </div>
      </div>
    </div>
    <myFooter></myFooter>
  </div>
</template>

<script>
  import myHeader from '@/components/Header'
  import myFooter from '@/components/Footer'
  import jsonp from 'jsonp'
  import {mapGetters, mapActions}from 'vuex'
  import { CellSwipe,MessageBox } from 'mint-ui';
  export default {
    name: 'cart',
    components: {
      'myHeader': myHeader,
      'myFooter': myFooter,
      'mtCellSwipe':CellSwipe
    },
    data() {
      return {
        dishList: [],
        totalPrice:0
      }
    },
    filters:{
      money:function(price){
        return '¥'+price;
      },
      money1:function(price){
        return '¥'+price.toFixed(2);
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
      del:function (a) {
        var that=this;
        MessageBox.confirm('确定执行此操作?').then(function (action) {
              jsonp('http://mytest001.applinzi.com/data/cart_delete.php?ctid='+a.ctid, {prefix: 'callback'}, function (err, data) {
                  if(data.msg=='success'){
                    that.dishList.splice(a.index, 1)
                    jsonp('http://mytest001.applinzi.com/data/cart_select.php?uid=' + that.userMsg, {prefix: 'callback'}, function (err, data) {
//                      that.dishList = data.data;
                      that.$store.commit('detailSet', data.data);
                      that.jsTotalPrice()
                      jsonp('http://mytest001.applinzi.com/data/cart_select.php?uid=' + that.userMsg, {prefix: 'callback'}, function (err, data) {
                        var dataList = data.data;
                        for (var i = 0, total = 0; i < dataList.length; i++) {
                          total += parseInt(dataList[i].dishCount)
                        }
                        that.$store.commit('set', total);
                      })
                    })
                        }
                    });
        },function (err) {
          console.log(err)
        })
      },
      jump: function (path) {
        this.$parent.jump(path);
      },
      changeNum:function(product,way){
        if(way>0){
          product.dishCount++;
         this.updateCart(product.did,product.dishCount)
          this.add()
        }else {
          product.dishCount--;
          if (product.dishCount<=0){
            product.dishCount=1
            return null;
          }
          this.updateCart(product.did,product.dishCount)
          this.sub()
        }
        this.jsTotalPrice();
      },
      jsTotalPrice:function(){
        var that=this;
        that.totalPrice=0;
       for (var i=0;i<that.dishList.length;i++){
         that.totalPrice+=(that.dishList[i].dishCount)*(that.dishList[i].price)
       }
        that.$store.commit('totalSet', that.totalPrice);
      },
      updateCart:function (did,num) {
        jsonp('http://mytest001.applinzi.com/data/cart_update.php?uid='+this.userMsg+'&did='+did+'&count='+num, {prefix: 'callback'}, function (err, data) {
          console.log('succ')
        })
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
          if (that.userMsg) {
            jsonp('http://mytest001.applinzi.com/data/cart_select.php?uid=' + that.userMsg, {prefix: 'callback'}, function (err, data) {
              that.dishList = data.data;
              that.$store.commit('detailSet', data.data);
              that.jsTotalPrice()
            })
          }else {
            that.jump('/login')
          }
        }
  }
</script>

<style scoped>
  .titleList {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 8px;
  }

  .media-bottom > input:first-child {
    margin-left: 5px;
  }

  .media-bottom > input:last-child {
    margin-right: 5px;
  }

  .jdColor {
    color: #e4393c;
  }

  .container {
    margin-bottom: 65px;
  }
  .well{
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
    background: #fff;
  }
  .total{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .bgFont{
    font-size: 20px;
  }
  #all{
    margin-top: 60px;
  }
  .inputList>input{
    float: right;
  }
  .inputList>input:nth-child(2){
    width: 18%;
    padding: 0px;
    height: 33px;
    line-height: 33px;
    text-align: center;
  }
  .media:first-child{
    margin-top: 10px;
  }
</style>
