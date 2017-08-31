<template>
  <div class="start" @click="jump('/main')">
    <h1>美食天下</h1>
    <input type="button"  value="调用摄像头" @click="tab">
    <!--<img class="" src="http://1.mytest001.applinzi.com/img/p0281.jpg" v-for="item0 in imgList"/>-->
    <div class='page-swipe' >
      <mt-swipe :auto="4000" @change="handleChange">
        <mt-swipe-item :class='{slide1:true}'>
          <div>
            <img class="" src="../assets/bannerImg/banner0.jpg"/>
          </div>
        </mt-swipe-item>
        <mt-swipe-item :class='{slide2:true}'>
          <div>
            <img class="" src="../assets/bannerImg/banner1.jpg"/>
          </div>
        </mt-swipe-item>
        <mt-swipe-item :class='{slide3:true}'>
          <div>
            <img class="" src="../assets/bannerImg/banner2.jpg"/>
          </div>
        </mt-swipe-item>
        <mt-swipe-item :class='{slide4:true}'>
          <div>
            <img class="" src="../assets/bannerImg/banner3.jpg"/>
          </div>
        </mt-swipe-item>
        <mt-swipe-item :class='{slide5:true}'>
          <div>
            <img class="" src="../assets/bannerImg/banner4.jpg"/>
          </div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
  </div>
</template>

<script>
  export default {
    name:'start',
    data(){
      return {
        imgList:[{
          img: '/static/img/p0281.jpg',
          name: 'dish1'
        }, {
          img: '/static/img/p2679.jpg',
          name: 'dish 2'
        }, {
          img: '/static/img/p4788.jpg',
          name: 'dish 3'
        }, {
          img: '/static/img/p6611.jpg',
          name: 'dish 4'
        }]
      }
    },
    methods:{
      jump(path){
        this.$parent.jump(path);
      },
        handleChange(index) {
//          console.log(index)
        },
      tab(){
        var cmr = plus.camera.getCamera();
        cmr.captureImage( function ( p ) {
          //成功
          plus.io.resolveLocalFileSystemURL( p, function ( entry ) {
            var img_name = entry.name;//获得图片名称
            var img_path = entry.toLocalURL();//获得图片路径
          }, function ( e ) {
            console.log( "读取拍照文件错误："+e.message );
          } );
        }, function ( e ) {
          console.log( "失败："+e.message );
        }, {filename:'_doc/camera/',index:1} ); //  “_doc/camera/“  为保存文件名
      }
    }
  }

</script>

<style scoped>
  .page-swipe{
    margin-top:20px;
  }
  .page-swipe .mint-swipe {

    color: #fff;
    font-size: 30px;
    text-align: center;
    margin-bottom: 20px;
  }
  .page-swipe .mint-swipe-item {
    line-height: 200px;
  }
  .page-swipe .slide1 {
    background-color: #fff;
    color: #fff;
  }
  .page-swipe .slide2 {
    background-color: #fff;
    color: #000;
  }
  .page-swipe .slide3 {
    background-color: #fff;
    color: #fff;
  }
  .page-swipe-desc {
    text-align: center;
    color: #666;
    margin-bottom: 5px;
  }
  .mint-swipe-items-wrap .mint-swipe-indicators{
    bottom: 55px!important;
  }
  img{
    display: block;
    max-width: 100%;
    height: auto;
  }
</style>
