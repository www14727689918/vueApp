<template>
  <div id="all">
    <myHeader></myHeader>
    <div class="container">
      <div class="nav panel panel-default butList">
        <mt-button size="small" @click="tab('tab-container1')">账号</mt-button>
        <mt-button size="small" @click="tab('tab-container2')">关于</mt-button>
        <mt-button size="small" @click="tab('tab-container3')">二维码</mt-button>
      </div>
      <div class="page-tab-container">
        <mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>
          <mt-tab-container-item id="tab-container1">
            <!-- cell组件 -->
            <!--<mt-cell v-for="(n,index) in 10" title="tab-container 1" :key="n.index"></mt-cell>-->

            <div class="panel panel-default">
              <div class="panel-body">
                账号名称:{{userInfo.uname}}
              </div>
            </div>
            <div class="panel panel-default">
              <div class="panel-body">
                手机号码:{{userInfo.phone}}
              </div>
            </div>
            <div class="panel panel-default">
              <div class="panel-body">
                <input  value="退出登录" class="btn btn-block btn-success" @click="this.window.location.reload();">
              </div>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="tab-container2">

            <h1>美食天下hhh®</h1>
            <ul class="list-group">
              <li class="list-group-item">开发者:王文义</li>
              <li class="list-group-item">版本号:v1.0</li>
              <li class="list-group-item">Email:14727659918@163.com</li>
            </ul>
            <input  value="退出登录" class="btn btn-block btn-success" @click="this.window.location.reload();">
          </mt-tab-container-item>
          <mt-tab-container-item id="tab-container3">

            <img src="../../static/img/code.png" alt="">
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
    <myFooter></myFooter>
  </div>
</template>

<script>

  import myHeader from '@/components/Header'
  import myFooter from '@/components/Footer'
  import jsonp from 'jsonp'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    name: 'Set',
    data() {
      return {
        active: 'tab-container1',
        userInfo:''
      }
    },
    components: {
      'myHeader': myHeader,
      'myFooter': myFooter
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
      tab(id) {
        this.active = id
      },
      closeOut:function () {
        var that=this;
        jsonp('http://mytest001.applinzi.com/data/login_out.php',{name:'callback'},function (err, data) {
            if(data.code==200){
              that.jump('/start');
              that.$store.commit('set', 0);
            }else{
              console.log(err)
            }
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
      if(that.userMsg){
          jsonp('http://mytest001.applinzi.com/data/userinfo_getbyuserid.php?userid=' + that.userMsg, {name: 'callback'}, function (err, data) {
            that.userInfo = data;
          })
      }else {
        that.jump('/login')
      }
        }
    }
</script>

<style scoped>
  .item {
    display: inline-block;
  }

  .nav {
    padding: 10px;
  }

  .link {
    color: inherit;
    padding: 20px;
    display: block;
  }

  .butList {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 8px;
  }
  #all{
    margin-top: 60px;
  }
</style>
