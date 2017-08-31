<template>
  <div id="all">
    <myHeader></myHeader>
    <div class="container ">
      <form name="myForm" >
        <div class="form-group">
          <label class="item item-input"></label>
            <input type="text" placeholder="请输入用户名称"  class="form-control" required v-model="userName">

        </div>
        <div class="form-group">
          <label class="item item-input"> </label>
            <input type="password" placeholder="请输入用户密码"  class="form-control" required v-model="userPwd">

        </div>
        <div class="form-group">
          <label class="item item-input">  </label>
            <input type="number" placeholder="请输入手机号码"  class="form-control" required v-model="userPhone">

        </div>
        <div class="form-group">
          <label class="item item-input"></label>
          <input type="text" placeholder="请输入验证码.."   class="form-control" required v-model="userVcode">
          <img src="http://mytest001.applinzi.com/data/vcode.php" class="vcode img-responsive" >

        </div>
        <div class="form-group">
            <button type="button"  class="btn btn-block btn-primary" @click="register()">注册</button>
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
  import { MessageBox } from 'mint-ui';
  export default {
    name: 'Reg',
    data() {
      return {
        userName:'',
        userPwd:'',
        userPhone:0,
        userVcode:''
      }
    },
    components: {
      'myHeader': myHeader,
      'myFooter': myFooter
    },
    methods: {
      jump: function (path) {
        this.$parent.jump(path);
      },
      time: function () {
        var _this=this;
        var timer = setInterval(function () {
          _this.jump('/main');
          clearInterval(timer)
        }, 3000)
      },
      register:function () {
        var that = this;
        jsonp('http://mytest001.applinzi.com/data/register.php?username='+that.userName+'&pwd='+that.userPwd+'&phone='+that.userPhone+'&vc='+that.userVcode, {name: 'callback'}, function (err, data) {
            console.log(data)
          if(data.code==200){
            MessageBox('提示', '注册成功')
            that.time();
          }else {
            MessageBox('提示', '注册失败,请核实查证...')
          }
        })
      }
    },
  }
</script>

<style scoped>
  #all{
    margin-top: 60px;
  }
</style>
