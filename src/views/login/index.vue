<template>
  <!-- login -->
  <div class="login-container">
   <div class="logo-img">
      <a href="http://www.etsystem.cn/" target="_blank">
      <img src="static/img/login_logo.ea8b97b.png" alt="">
      </a>
    </div>
  <div class="banner">
   <el-carousel style="width:100%" :interval="5000" height="500px" arrow="hover">
    <el-carousel-item v-for="(item,index) in bannerArr" :key="index">
      <img :src="item" alt="">
    </el-carousel-item>
  </el-carousel>
    </div>

  <div class="login-form1">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
      <h3 class="title">ET-调度系统</h3>
      <!-- <span class="header_text_name">工号/手机号：</span> -->
      <el-form-item label-position="right" prop="username" >
         <!-- <span class="svg-container">
          <svg-icon icon-class="user" />
        </span> -->
        <el-input name="username" type="text" :maxlength="11" v-model="loginForm.username" autoComplete="on" placeholder="工号或者手机号" @keyup.enter.native="handleLogin"></el-input>
      </el-form-item>
       <!-- <span class="header_text">  -->
         <!-- <span>密 </span><span style="margin-left:30px;">码：</span> -->
             <!-- </span> -->
      <el-form-item prop="password" >
          <!-- <span class="svg-container">
          <svg-icon icon-class="password" />
        </span> -->
        <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item style="    margin-top: 30px;">
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登  录
        </el-button>
      </el-form-item>
        <el-button type="text" style="color:#103896">
          <router-link to="/downLoadBed">批量下载床</router-link>
        </el-button>
      <!-- <div class="footer_title">
        <img src="static/img/logo.6447f8b.png" class="header_logo">
      <strong style="" class="copy">Copyright 2018 <a href="http://www.etsystem.cn/" target="blank">版权 ©深圳布易科技有限公司</a></strong>
      </div> -->
    </el-form>
  </div>
    <div class="foot-link">
          <a href="http://www.etsystem.cn/index.html" target="_blakn"> 公司官网</a><span>|</span>
          <a href="http://www.etsystem.cn/News/Products.html" target="_blakn">ET产品</a><span>|</span>
          <a href="http://www.etsystem.cn/News/index.html" target="_blakn">公司动态</a> <span>|</span>
          <a href="http://www.etsystem.cn/Customers/index.html" target="_blakn">品牌客户</a> <span>|</span>
          <a href="http://www.etsystem.cn/About/about.html" target="_blakn">关于我们</a> <span>|</span>
          <a href="http://www.etsystem.cn/About/adress.html" target="_blakn">联系方式</a> 
    </div>

   <div class="footer_title">
       
        <!-- <img src="static/img/logo.6447f8b.png" class="header_logo"> -->
     Copyright 2018 <a href="http://www.etsystem.cn/" target="blank"> ©深圳布易科技有限公司</a>版权所有
      </div>
    <el-dialog v-dialogDrag title="第三方验证" :visible.sync="showDialog">
      邮箱登录成功,请选择第三方验证
      <social-sign></social-sign>
    </el-dialog>
  </div>
</template>

<script>
import socialSign from "./socialsignin";
export default {
  components: {
    socialSign
  },
  name: "login",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error("密码不能小于4位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
        lockinnum: ""
      },
        bannerArr:[
         'static/img/dingzhi.jpg','static/img/3Dsystem.jpg',  'static/img/filesys.jpg',
      ],
      loginRules: {
        username: [
          {
            required: true,
            message: "账户不能为空",
            trigger: "blur"
          },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            validator: validatePass
          }
        ]
      },
      loading: false,
      imagecode:
        "/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAeAFADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3DUtXttK8r7RFev5udv2WxmuMYx18tG29e+M846GqkHjDwxc3Edvb+I9IlmlcJHHHfRMzsTgAANkkntR4mnEOnwqbyeDzbhEEdsP3txz/AKpCCCpP97IwM8is7w551zd+INK1CN5LSORFW2upjcYSSMEozNncDnkEkDJAJHNOMoXs0/v/AOB+pp7JuHPf+tjqZHSKNpJGCooLMx6ACsuHXo31GGynsry1a4DG3edFCzYGSBhiVOOcMFOO1Y5+GHg9dX/tW30g2V7/AAyWN1Na7Pl2/KInULkdcAZyc9TXLat8O9Ps/FsN3cQrcQarItqbiRnuJ4nAJUsLgyrICq7TuGBgEBSAaJcvMkn+A6UVK6fZnq9cXP8AE3Q7a9uLS4Bhmt3McgmvbSMbhkEAtMASCMEDkdDiqv8AwqzTLf57RNJnkPBXUtCtJYwPUCFIW3dOSxGM8dCKFja+LbDxRrNpof8AwjzvFFbRyCWGW2iRAhEYjRS+MDIwTjgYolHVcrv/AF5joxi1JyWy/VLp6nSWPxF8J3lv5smvaZaNuK+XcX8Abg4yNrkEe4NQv8RtJhvhb3Ona7axM22O4uNLmjSVscKgK72PbAXNdRZLMlhbpcEmdYlEhJzlsDP61keIdLtNZurOwvYhJBKkwI7g4GCPQisqnMo+7uaYZUpVbVV7uu2606f8Eu6tqp0qOKT7BdXSySLHmAx/KzMFUHe69SwHGffFXonaSJHaNo2ZQSjkZU+hwSMj2JFcIdUurFYfDWtSbr2K8tDaXLdLyEXEfP8AvgfeH489a76nCSkrovFYf2MIprdvVdVpZ/j+j1uZ+raRDq8UCyTTwSW8yzwzQMA6OM+oIIwSCCCOah03QItN1G6vkvbyaS62mYTOpVmAxu4Uc47fdHYDitaiqsr3OX2kuXlvoRXMAurWa3MksXmIU8yJ9rrkdVPY+9ULLRFtZIJLi/vb97cYgN2yEx8YJ+VV3MRxubJ688nOpRRbW4lNpWRk/wBuPL81no2qXMfQv5SwYPptmZGPbkDHPXIOMWx8P+IYNZuNRF/FBNcBfPMkguklCghV2LFCVxnOQ3bkHPHYUVPI27tm6xCgmoQWvfV/5fgZP9m6rN81xr0sTjgLY20caY9xIJDn/gQHTjqTn3Pgiwu76O4mvdRljj6W1zMLmL3O2YPgn1Bz6YrpqKHTi9xwxlaDvB29El+SKGpaRZ6qbVrqPMlpOlxC68MjKQfyOMEf/WNX6KKpJLY53OTiot6LY//Z",
      showDialog: false
    };
  },
  methods: {
       toLogin(){
       if(this.isInnerIPFn ){
        //  console.log('是内网展示')
          this.$router.push({
              path: '/Interlogin'
            })
       }else{
          // console.log('外网展示')
          this.$router.push({
              path: '/login'
            })
       }
     } ,
    openImageProxy: function() {
      //  //  //  console.log("openImageProxy");
      this.imagecode =
        "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";
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // if (parseInt(this.loginForm.username) > 2147483647) {
          //   this.$message({
          //     showClose: true,
          //     message: "当前工号不存在！",
          //     type: "error"
          //   });
          // } else {
            this.loading = true;
            this.$store
              .dispatch("LoginByEmail", this.loginForm)
              .then(res => {
                this.loading = false;
                this.$router.push({
                  path: "/"
                });
                // this.showDialog = true;
                document.cookie =
                  "ETname=" +
                  this.loginForm.username +
                  ";expires=Fri, 31 Dec 9999 23:59:59 GMT";
                // document.cookie =
                //   "ETpwd=" +
                //   this.loginForm.password +
                //   ";expires=Fri, 31 Dec 9999 23:59:59 GMT";
              })
              .catch(err => {
                // console.log(err);
                // this.$message({
                //   message: err.tip,
                //   type: "error",
                //   duration: 2000
                // })
                this.$message({
                  showClose: true,
                  message: err.tip,
                  type: "error"
                });
                this.loading = false;
              });
        } else {
          //  console.log("error submit!!");
          return false;
        }
      });
    },
    afterQRScan() {}
  },
  created() {
     this.toLogin();
    // window.addEventListener('hashchange', this.afterQRScan);
    var cookie = document.cookie.split(";");
    var obj = {};
    for (var i = 0; i < cookie.length; i++) {
      obj[cookie[i].split("=")[0].trim()] = cookie[i].split("=")[1];
    }
    if (obj.ETname !== undefined) {
      this.loginForm.username = obj.ETname;
      // this.loginForm.password = obj.ETpwd;
    }
   
  },

  proxyImage(event) {
    this.imagecode =
      "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";
  },
  changeImageCode() {
    this.imagecode =
      "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";
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan);
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/mixin.scss";
$bg:#23305a;
$light_gray:#eee;
$dark_gray:#889aa4;
.tips {
  font-size: 14px;
  color: #fff;
  margin-bottom: 5px;
}
.login-container {
  @include relative;
  min-height: 100vh;
  background-color:#eef0f63b;

  input {
    background: transparent;
    border: 0;
    -webkit-appearance: none;
    border-radius: 0;
    padding: 12px 5px 12px 15px;
    color: #eeeeee;
    height: 47px;
      &:-webkit-autofill  {
     -webkit-box-shadow: 0 0 0px 1000px #1d4aa2d4 inset !important;
        -webkit-text-fill-color: #fff !important;
  }
  }
  .el-input {
    display: inline-block;
    height: 47px;
    // width: 85%;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #889aa4;
  }

  .login-form {
    // position: absolute;
    // left: 0;
    // right: 0;
    // width: 600px;
    // height: 400px;
    // padding: 35px 110px 15px;
    // margin: 85px auto;
    // // border: 1px solid grey;
    // border-radius: 10px;
    // box-shadow: 1px #889aa4;
    left: 0;
    right: 0;
    width: 400px;
    height: 350px;
    padding: 35px px 15px;
    margin: 85px auto;
    border-radius: 10px;
    -webkit-box-shadow: 15px 15px 30px #3163c5ab;
    box-shadow: #3163c5ab 15px 15px 30px;
    background: #3163c5ab;
    padding: 15px;
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .forget-pwd {
    color: #fff;
  }
  .form_input {
    line-height: 50px;
  }

  .header_text_name{
    position: relative;
    top: 35px;
    right: 93px;
    // color: #fff;
    font-size: 20px;
    /* text-align: right; */
    font-size: 15px;
    color: #eeeeee;
    opacity: 0.8;
  }
  .header_text {
    position: relative;
    top: 35px;
    right: 76px;
    // color: #fff;
    font-size: 20px;
    /* text-align: right; */
    font-size: 15px;
    color: #eeeeee;
    opacity: 0.8;
  }
    .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
    .title {
    font-size: 25px;
    font-weight: 400;
    color: #fff;
    margin: 30px auto 20px;
    text-align: center;
    font-weight: bold;
  }
  .header_logo {
    display: block;
    width: 120px;
    margin:0 auto 20px;
  }
.copy {
    // color: #fff;
    margin-left: 20px;
    padding: 31px;
  }
  .footer_title{
     /* position: absolute; */
    /* bottom: 49px; */
    margin: 0 auto;
    display: table;
    /* bottom: 0px; */
    /* left: 37%; */
     margin-top: 170px;
  }
}
  .logo-img{
      position: relative;
    width: 100%;
  margin: 26px 0 26px 0;
    height: 60px;
    float: left;
    border: 1px;
    /* margin: 0 auto; */
    display: flex;
    justify-content: center;
     right: 40%;
    img{
    height: 80%;
    }
  }
  .banner{
   height: 500px;
    img{
 width:100%;
height: 500px;
    }
  }
  .login-form1{
        z-index: 1000;
    float: right;
    position: absolute;
   right: 4%;
    top: 11%;
  }
  .foot-link{
   width: 1100px;
    height: 40px;
     top: 160px;
    position: relative;
    margin: 50px auto;
     text-align: center;
    font-size: 14px;  
    a{
      color:#666;
      margin: 0 10px;
    }
  }
</style>
