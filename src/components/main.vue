<template>
  <div id="all">
    <myHeader></myHeader>
  <div class="main container" v-infinite-scroll="loadMore"
       infinite-scroll-disabled="loading"
       infinite-scroll-distance="0">

    <div class="form-group has-feedback search">
      <input type="text"
             class="form-control"
             v-model="kw"
             placeholder="输入菜品或者原材料的名称"/>
      <span class="form-control-feedback glyphicon glyphicon-search"></span>
    </div>
    <ul class="list-group">
      <li v-for="dish in dishList" class="list-group-item" @click="jump(dish.did)">
        <div class="media">
          <div class="media-left media-middle">
            <img class="media-object" :src="'http://1.mytest001.applinzi.com/img/'+dish.img_sm" alt=""/>
                 <!--:src="'/static/img/'+dish.img_sm  "'../assets/img/'+dish.img_sm""-->

          </div>
          <div class="media-body">
            <h3>{{dish.name}}</h3>
            <p>{{dish.material}}</p>
            <p>价格：{{dish.price}}</p>
          </div>
        </div>
      </li>
    </ul>
    <div id="loading" v-if="loadingIcon">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <!--<button v-if="hasMore"-->
    <!--v-on:click="loadMore()"-->
    <!--class="btn btn-success btn-block">-->
    <!--加载更多-->
    <!--</button>-->
    <p v-if="!hasMore">没有更多数据可以加载了</p>
    <!--qq歌词获取-->
    <!--<button @click="loadMore">1111</button>-->
    <!--<ul>-->
    <!--<li v-html="lyricList">-->
    <!--{{lyricList}}-->
    <!--</li>-->
    <!--</ul>-->

  </div>
    <myFooter/>
  </div>
</template>

<script>
  //  import axios from 'axios'
  import jsonp from 'jsonp'
  import myHeader from '@/components/Header'
  import myFooter from '@/components/Footer'
  export default {
    name: 'main',
    components: {
      'myHeader': myHeader,
      'myFooter': myFooter
    },
    data() {
      return {
        loading: false,
        dishList: [],
        lyricList: '',
        kw: '',
        loadingIcon: false,
        hasMore: true,
//        img:require('/static/img')
      }
    },
    methods: {
      jump: function (did) {
        this.$parent.jump('/detail/' + did);
      },
      loadMore: function () {
        var that = this;
        that.loadingIcon = true;
//          jsonp('https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg?musicid=203605063',{param :'jsonpCallback',name:'jsonp1'},function (err,data) {
        jsonp('http://mytest001.applinzi.com/data/dish_getbypage.php?start=' + that.dishList.length, {prefix: 'callback'}, function (err, data) {
//            for (var i = 0; i < data.length; i++)
//              that.dishLish = that.dishList.push(data[i])
            that.dishList = that.dishList.concat(data)
            if (data.length < 5) {
              that.loading = true
              that.hasMore = false
            }
            that.loadingIcon = false;
          }
        )
//        获取qq歌词
//        用axios获取数据
//        axios.get('http://127.0.0.1:5050/getList',{
//              params: {
//                musicid: 203605063
//              }
//        }).then(function (data) {
//          var sj=data.data
//            that.lyricList=JSON.parse(sj.substring(18,sj.length-1)).lyric
//          console.log(that.lyricList)
//        })
      }
    },
    watch: {
      kw: function (newValue, oldValue) {
        var that = this;
        that.loading = true
        jsonp('http://mytest001.applinzi.com/data/dish_getbykw.php?kw=' + that.kw, {prefix: 'callback'}, function (err, data) {
          that.dishList = data
        })
      }
    }
  }

</script>

<style scoped>

  #loading {
    width: 200px;
    height: 100px;
    margin: 50px auto;
  }

  #loading span {
    height: 80px;
    width: 15px;
    background: #f01b00;
    display: inline-block;
    animation: loader 1s infinite;
  }

  #loading p {
    color: #f01b00;
    font-size: 20px;
    font-family: Helvetica;
    text-transform: uppercase;
    margin-top: 5px;
    font-weight: 300;
    letter-spacing: .05em;
    text-align: center;
  }

  @keyframes loader {
    50% {
      height: 30px;
      margin-top: 50px;
      opacity: .5;
    }
  }

  #loading span:nth-child(1) {
    animation-delay: .1s;
  }

  #loading span:nth-child(2) {
    animation-delay: .2s;
  }

  #loading span:nth-child(3) {
    animation-delay: .3s;
  }

  #loading span:nth-child(4) {
    animation-delay: .4s;
  }

  #loading span:nth-child(5) {
    animation-delay: .5s;
  }

  #loading span:nth-child(6) {
    animation-delay: .6s;
  }
  #all{
    margin-top: 60px;
    margin-bottom: 65px;
  }

</style>
