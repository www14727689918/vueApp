<template>
  <div id="all">
    <myHeader></myHeader>
    <div class="container ">
      <form class="form-horizontal">
        <span class="heading">用户登录</span>
        <div class="form-group">
          <input type="text" class="form-control" id="inputEmail3" placeholder="请输入您的用户名" v-model="username">
          <i class="glyphicon glyphicon-user"></i>
        </div>
        <div class="form-group help">
          <input type="password" class="form-control" id="inputPassword3" placeholder="请输入您的密码名" v-model="password">
          <i class="glyphicon glyphicon-lock"></i>
          <a href="" class="glyphicon glyphicon-question-sign fa-question-circle"></a>
        </div>
        <div class="form-group liner">
          <div class="main-checkbox">
            <input type="checkbox" value="None" id="checkbox1" name="check">
            <label for="checkbox1"></label>
          </div>
          <span class="text">记住密码</span>
          <button type="button" class="btn btn-primary" @click="userLogin" :disabled="isDisabled">登录</button>
        </div>
        <div class="form-group">
          <a @click="jump('/reg')" class="reg">无账号请注册</a>
        </div>
      </form>
    </div>
    <myFooter></myFooter>
  </div>
</template>

<script>

  import myHeader from '@/components/Header'
  import myFooter from '@/components/Footer'
  import jsonp from 'jsonp'
  import {MessageBox} from 'mint-ui';
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: 'Login',
    data() {
      return {
        username: '',
        password: '',
        isDisabled: true
      }
    },
    components: {
      'myHeader': myHeader,
      'myFooter': myFooter
    },
    watch: {
      username: function (newValue, oldValue) {
//        console.log(newValue)
        this.isClick()
      },
      password: function (newValue, oldValue) {
//        console.log(newValue)
        this.isClick()
      },
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
      isClick: function () {
//        console.log(this.username)
        if (this.username && this.password) {
          this.isDisabled = false
        }
      },
      userLogin: function () {
        var that = this;
        jsonp('http://mytest001.applinzi.com/data/login.php?uname=' + that.username + '&upwd=' + that.password, {name: 'callback'}, function (err, data) {
          if (data.msg == 'login succ') {
            MessageBox('提示', '登录成功').then(function () {
              jsonp('http://mytest001.applinzi.com/data/login_getbyuserid.php', {name: 'callback'}, function (err, data) {
                that.$store.commit('userMsgSet', data.userid);
                if (that.userMsg) {
                  jsonp('http://mytest001.applinzi.com/data/cart_select.php?uid=' + that.userMsg, {prefix: 'callback'}, function (err, data) {
                    var dataList = data.data;
                    for (var i = 0, total = 0; i < dataList.length; i++) {
                      total += parseInt(dataList[i].dishCount)
                    }
                    that.$store.commit('set', total);
                  })
                }
              })
              that.jump('/main')
            });
          } else {
            MessageBox('提示', '用户名或密码错误');
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
  }
</script>

<style scoped>
  .form-horizontal {
    background: #fff;
    padding-bottom: 40px;
    border-radius: 15px;
    text-align: center;
  }

  .form-horizontal .heading {
    display: block;
    font-size: 35px;
    font-weight: 700;
    padding: 35px 0;
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 30px;
  }

  .form-horizontal .form-group {
    padding: 0 40px;
    margin: 0 0 25px 0;
    position: relative;
  }

  .form-horizontal .form-control {
    background: #f0f0f0;
    border: none;
    border-radius: 20px;
    box-shadow: none;
    padding: 0 20px 0 45px;
    height: 40px;
    transition: all 0.3s ease 0s;
  }

  .form-control {
    display: block;
    width: 100%;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  }

  .form-horizontal .form-group i {
    position: absolute;
    top: 12px;
    left: 60px;
    font-size: 17px;
    color: #c8c8c8;
    transition: all 0.5s ease 0s;
  }

  .fa {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .form-horizontal .fa-question-circle {
    display: inline-block;
    position: absolute;
    top: 12px;
    right: 60px;
    font-size: 20px;
    color: #808080;
    transition: all 0.5s ease 0s;
  }

  .form-horizontal .main-checkbox {
    float: left;
    width: 20px;
    height: 20px;
    background: #e4393c;
    border-radius: 50%;
    position: relative;
    margin: 5px 0 0 5px;
    border: 1px solid #e4393c;
    text-align: center;
  }

  .form-horizontal .text {
    float: left;
    margin-left: 7px;
    line-height: 20px;
    padding-top: 5px;
    text-transform: capitalize;
  }

  .form-horizontal .btn {
    float: right;
    font-size: 14px;
    color: #fff;
    background: #e4393c;
    border-radius: 30px;
    padding: 10px 25px;
    border: none;
    text-transform: capitalize;
    transition: all 0.5s ease 0s;
  }

  .btn {
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
  }

  .form-horizontal .main-checkbox input[type=checkbox] {
    visibility: hidden;
  }

  .form-horizontal .main-checkbox label {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
  }

  label {
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    font-weight: 700;
  }

  .liner {
    padding-bottom: 15px !important;
    border-bottom: 1px solid #f0f0f0;
  }

  .reg {
    font-size: 20px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
  #all{
    margin-top: 60px;
  }

</style>
