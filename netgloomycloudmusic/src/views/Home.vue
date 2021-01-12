<template>
  <div class="index">
    <!-- top导航 -->
    <div class="top-nav">
      <!-- 导航版心 -->
      <div class="top-nav-wrap">
        <!-- logo -->
        <h1>
          <a href="javascript:;" @click="toindex"><div class="logo"></div></a>
        </h1>
        <!-- 导航tab -->
        <ul class="nav-bar">
          <li
            v-for="(item, index) in navData"
            :key="index"
            @click="navClick(index)"
          >
            <router-link :to="item.src" :class="item.class">{{
              item.label
            }}</router-link>
          </li>
        </ul>
        <!-- 搜索 -->
        <div class="top-search-input">
          <el-input
            placeholder="音乐/视频/电台/用户"
            prefix-icon="el-icon-search"
            v-model="topSearchInput"
            @keyup.enter.native="searchSong"
          >
          </el-input>
        </div>
        <!-- 头像显示处 ！如果未登录则显示登录按钮 ；登录显示用户头像-->
        <div class="user-headimg" v-if="topUserImg">
          <el-avatar
            :size="43"
            :src="headimgUrl"
            class="top-headimg"
          ></el-avatar>
          <!-- *头像下拉框 -->
          <ul class="top-headimg-slide-menu">
            <li>
              <a href="javascript:;"
                ><i class="el-icon-user"></i><span>我的主页</span></a
              >
            </li>
            <li>
              <a href="javascript:;"
                ><i class="el-icon-message"></i><span>我的消息</span></a
              >
            </li>
            <li>
              <a href="javascript:;"
                ><i class="el-icon-trophy"></i><span>我的等级</span></a
              >
            </li>
            <li>
              <a href="javascript:;"
                ><i class="el-icon-s-check"></i><span>VIP会员</span></a
              >
            </li>
            <li>
              <router-link to="/personalData"
                ><i class="el-icon-setting"></i
                ><span>个人设置</span></router-link
              >
            </li>
            <li>
              <a href="javascript:;"
                ><i class="el-icon-mobile-phone"></i><span>实名认证</span></a
              >
            </li>
            <li>
              <a href="javascript:;" @click="exitLogin"
                ><i class="el-icon-switch-button"></i><span>退出</span></a
              >
            </li>
          </ul>
        </div>
        <!-- 登录 -->
        <div
          class="nav-bar-login-btn"
          @click="dialogVisible = true"
          v-if="topLogin"
        >
          <a href="javascript:;">登录</a>
        </div>
      </div>
    </div>
    <!-- body -->
    <router-view />
    <!-- *登录弹出框 -->
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
        <el-tab-pane label="登录" name="loginM">
          <div class="login-form">
            <div>
              <span>手机号</span
              ><input
                type="text"
                placeholder="请输入中国手机号"
                v-model="loginForm.userName"
                @blur="loginUserName"
                :style="userborderStyle"
              />
            </div>
            <i class="usertip" v-if="usertip">手机号不能为空！</i>
            <div>
              <span>密码</span
              ><input
                type="password"
                placeholder="请输入密码"
                v-model="loginForm.pwd"
                @blur="loginPwd"
                :style="pswborderStyle"
              />
            </div>
            <i class="usertip" v-if="pwdtip">密码不能为空！</i>
          </div>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="loginTogo">登 录</el-button>
          </span></el-tab-pane
        >
        <el-tab-pane label="注册" name="regiM">
          <div class="register-form">
            <div>
              <span>用户名</span
              ><input
                type="text"
                placeholder="请输入用户名"
                v-model="registerForm.regUserName"
                @blur="regUser"
                :style="regUserBorder"
              />
            </div>
            <i class="regtip" v-if="regUsertip">用户名不能为空！</i>
            <div>
              <span>昵称</span
              ><input
                type="text"
                placeholder="请设置您的昵称"
                v-model="registerForm.nikeName"
                :style="regNikeBorder"
                @blur="regNike"
              />
            </div>
            <i class="regtip" v-if="regNiketip">昵称不能为空！</i>
            <div>
              <span>设置密码</span
              ><input
                type="password"
                placeholder="请设置您的密码"
                v-model="registerForm.regPwd"
                :style="regPwdBorder"
                @blur="regPwd"
              />
            </div>
            <i class="regtip" v-if="regPwdtip">密码不能为空！</i>
            <div>
              <span>确认密码</span
              ><input
                type="password"
                placeholder="请再次确认密码"
                v-model="registerForm.regPwdAgain"
                :style="againPwdBorder"
                @blur="regAgainPwd"
              />
            </div>
            <i class="regtip" v-if="againPwdtip">密码不能为空！</i>
            <i class="regtip" v-if="againdiffPwdtip">两次密码不符合！</i>
          </div>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false"
              >注 册</el-button
            >
          </span></el-tab-pane
        >
      </el-tabs>
    </el-dialog>
    <!-- footer -->
    <div class="foot-copy">
      <div class="copy-wrap">
        <div class="ft-copy">
          <p>
            <a href="" class="copy-link">服务条款</a>
            <span class="line">|</span>
            <a href="" class="copy-link">隐私政策</a>
            <span class="line">|</span>
            <a href="" class="copy-link">儿童隐私政策</a>
            <span class="line">|</span>
            <a href="" class="copy-link">版权投诉指引</a>
            <span class="line">|</span>
            <a href="" class="copy-link">意见反馈</a>
          </p>
          <p>
            <span>网易公司版权所有©1997-2020</span
            ><span>杭州乐读科技有限公司运营：</span
            ><a href="javascript:;" class="copy-add">浙网文[2018]3506-263号</a>
          </p>
          <p>
            <span>违法和不良信息举报电话：0571-89853516</span
            ><span>举报邮箱：ncm5990@163.com</span>
          </p>
          <p>
            <span>粤B2-20090191-18</span>
            <span>工业和信息化部备案管理系统网站 </span>
            <span class="police-logo"> 浙公网安备 33010902002564号</span>
          </p>
        </div>
        <ul class="ft-enter">
          <li class="unit">
            <a href="javascript:;" class="ft-logo one"></a>
            <span>Amped Studio</span>
          </li>
          <li class="unit">
            <a href="javascript:;" class="ft-logo two"></a>
            <span>用户认证</span>
          </li>
          <li class="unit">
            <a href="javascript:;" class="ft-logo"></a>
            <span>独立音乐人</span>
          </li>
          <li class="unit">
            <a href="javascript:;" class="ft-logo four"></a>
            <span>赞赏</span>
          </li>
          <li class="unit">
            <a href="javascript:;" class="ft-logo five"></a>
            <span>视频奖励</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- * -->
  </div>
</template>

<script>
import axios from "@/plugins/axios.js"; /*引入封装的axios*/
export default {
  name: "Home",
  data() {
    return {
      myselfData: [],
      mylikeData: [],
      // *导航搜索内容
      topSearchInput: "",
      // *搜索到的歌曲
      searchKey: "",
      searchLimit: 30,
      // *用户头像url
      headimgUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      // *导航数据
      navData: [
        { label: "发现音乐", src: "/discover", class: "nav-btn" },
        { label: "我的音乐", src: "/mymusic", class: "nav-btn" },
        { label: "朋友", src: "", class: "nav-btn" },
        { label: "商城", src: "", class: "nav-btn" },
        { label: "音乐人", src: "", class: "nav-btn" },
        { label: "下载客户端", src: "", class: "nav-btn" },
      ],
      // *顶部导航头像显示状态
      topUserImg: false,
      // *用户昵称
      nikeName: "落日飞車",
      // *顶部登录按钮显示
      topLogin: true,
      // *登录框状态隐藏
      dialogVisible: false,
      activeName: "loginM",
      // *登录表单数据
      loginForm: {
        userName: "18089881271",
        pwd: "haozihaozi123",
        code: "",
      },
      // *登录表单验证数据
      userborderStyle: "",
      pswborderStyle: "",
      usertip: false,
      pwdtip: false,
      // *注册表单验证数据
      regUserBorder: "",
      regNikeBorder: "",
      regPwdBorder: "",
      againPwdBorder: "",
      regUsertip: false,
      regNiketip: false,
      regPwdtip: false,
      againPwdtip: false,
      againdiffPwdtip: false,
      // *注册表单数据
      registerForm: {
        nikeName: "",
        regUserName: "",
        regPwd: "",
        regPwdAgain: "",
      },
      // *userid
      userids: "",
      // *likeList
      likeList: [],
      likeListid: "",
    };
  },
  mounted() {
    this.myselfData = JSON.parse(localStorage.getItem("myselfData"));
    // this.mylikeData = JSON.parse(localStorage.getItem("mylikeData"));
    console.log(this.myselfData.profile.userId, "ssssssss");
    this.headimgUrl = this.myselfData.profile.avatarUrl;
    this.nikeName = this.myselfData.profile.nickname;
    if (this.myselfData) {
      this.login();
    }
  },
  // 18089881271  haozihaozi123
  methods: {
    toindex() {
      this.$router.push("/discover");
    },
    // *搜索歌曲
    searchSong() {
      axios({
        url: "/cloudsearch" /*热门歌单接口地址*/,
        params: { keywords: this.topSearchInput },
        method: "post",
      })
        .then((res) => {
          if (res.data.code == 200) {
            for (let i = 0; i < res.data.result.songs.length; i++) {
              var minutes = parseInt(
                (res.data.result.songs[i].dt % (1000 * 60 * 60)) / (1000 * 60)
              );
              var seconds = parseInt(
                (res.data.result.songs[i].dt % (1000 * 60)) / 1000
              );
              if (minutes < 10) {
                minutes = "0" + minutes;
              }
              if (seconds < 10) {
                seconds = "0" + seconds;
              }
              res.data.result.songs[i].dt = minutes + ":" + seconds;
            }

            this.$store.commit("getSearchSong", res.data.result.songs);
            this.searchKey = this.topSearchInput;
            // this.searchSongResult = res.data.result.songs;
            if (this.$route.path != "/netsearch") {
              this.$router.push("/netsearch");
            }
            console.log("我拿到的数据：", res.data.result.songs);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // *登录
    loginTogo() {
      axios({
        url: "/login/cellphone" /*热门歌单接口地址*/,
        params: {
          phone: this.loginForm.userName,
          password: this.loginForm.pwd,
        },
        method: "post",
      })
        .then((res) => {
          // this.headimgUrl = res.data.profile.avatarUrl;
          // this.nikeName = res.data.profile.nickname;
          console.log("我拿到的数据：", res.data);
          localStorage.setItem("myselfData", JSON.stringify(res.data));
          this.login();
          axios({
            url: "/user/playlist" /*/likelist*/,
            params: {
              uid: this.myselfData.profile.userId,
            },
            method: "post",
          })
            .then((res) => {
              console.log("hahhaha：", res.data);
              localStorage.setItem("mylikeData", JSON.stringify(res.data));
              this.likeList = res.data.ids;
              this.likeListid = res.data.playlist[0].id;
              // console.log("喜欢列表歌曲id", res.data.playlist[0].id);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
      // TODO个性化设置隋登录状态隐藏显示
      if (this.$route.path != "/discover") {
        this.$router.push("/discover");
      }
    },
    // *登录弹窗关闭
    handleClose() {
      this.dialogVisible = false;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // *登录弹窗验证
    loginUserName() {
      !this.loginForm.userName
        ? ((this.userborderStyle = "border:2px solid #f00"),
          (this.usertip = true))
        : ((this.userborderStyle = ""), (this.usertip = false));
    },
    loginPwd() {
      !this.loginForm.pwd
        ? ((this.pswborderStyle = "border:2px solid #f00"),
          (this.pwdtip = true))
        : ((this.pswborderStyle = ""), (this.pwdtip = false));
    },
    // *登录弹窗登录按钮
    login() {
      this.dialogVisible = false;
      this.topLogin = false;
      this.topUserImg = true;
    },
    //* 注册界面验证
    regUser() {
      !this.registerForm.regUserName
        ? ((this.regUserBorder = "border:2px solid #f00"),
          (this.regUsertip = true))
        : ((this.regUserBorder = ""), (this.regUsertip = false));
    },
    regNike() {
      !this.registerForm.nikeName
        ? ((this.regNikeBorder = "border:2px solid #f00"),
          (this.regNiketip = true))
        : ((this.regNikeBorder = ""), (this.regNiketip = false));
    },
    regPwd() {
      !this.registerForm.regPwd
        ? ((this.regPwdBorder = "border:2px solid #f00"),
          (this.regPwdtip = true))
        : ((this.regPwdBorder = ""), (this.regPwdtip = false));
    },
    regAgainPwd() {
      if (!this.registerForm.regPwdAgain) {
        this.againPwdBorder = "border:2px solid #f00";
        this.againPwdtip = true;
      } else {
        this.againPwdBorder = "";
        this.againPwdtip = false;
        if (this.registerForm.regPwdAgain != this.registerForm.regPwd) {
          this.againPwdBorder = "border:2px solid #f00";
          this.againdiffPwdtip = true;
        } else {
          this.againPwdBorder = "";
          this.againdiffPwdtip = false;
        }
      }
    },
    // *退出登录
    exitLogin() {
      axios({
        url: "/logout", //退出登录
        method: "post",
      })
        .then((res) => {
          console.log("退出登录了", res.data);
          this.topLogin = true;
          this.topUserImg = false;
          localStorage.removeItem("myselfData");
          if (this.$route.path != "/discover") {
            this.$router.push("/discover");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // *导航点击事件
    navClick(index) {
      if (index == 1) {
        if (this.topUserImg == true) {
          this.$router.push("/loginedMymusic");
        }
      }
    },
  },
};
</script>

<style scoped>
/deep/ .el-tabs__item.is-active {
  color: rgb(223, 2, 28);
  font-size: 16px;
  font-weight: bold;
}
/deep/ .el-tabs__active-bar {
  background: rgb(223, 2, 28);
}
/deep/ .el-tabs__item:hover {
  color: rgb(223, 2, 28);
}
/deep/ .el-button:focus,
.el-button:hover {
  color: #000;
  border-color: rgb(251, 159, 159);
  background: rgb(253, 212, 217);
}
/deep/ .el-button--primary {
  color: #fff;
  border-color: rgb(240, 49, 49);
  background: rgb(223, 2, 28);
}
/deep/ .el-button--success:focus,
.el-button--success:hover {
  color: #fff;
  border-color: rgb(240, 49, 49);
  background: rgb(223, 2, 28);
}
/deep/ .el-button--success {
  color: #fff;
  border-color: rgb(240, 49, 49);
  background: rgb(223, 2, 28);
}

/deep/ .el-button--success:hover {
  color: #fff;
  border-color: rgb(231, 145, 145);
  background: rgb(240, 114, 127);
}
/deep/ .el-button:focus {
  color: #fff;
  border-color: rgb(231, 145, 145);
  background: rgb(240, 114, 127);
}
/deep/ .el-button:hover {
  color: #fff;
  border-color: rgb(231, 145, 145);
  background: rgb(240, 114, 127);
}
input {
  outline-style: none;
}
.usertip,
.regtip {
  position: absolute;
  left: 125px;
  color: #f00;
}
li {
  list-style: none;
}
a {
  text-decoration: none;
}
.top-nav {
  background-color: #242424;
  width: 100%;
  height: 70px;
  box-sizing: border-box;
}
.top-nav-wrap {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 1100px;
  margin: 0 auto;
}
.logo {
  background: url("../assets/toplogo.png");
  width: 176px;
  height: 69px;
  background-position: 0 0;
}
.logo a {
  text-indent: -9999px;
}
.nav-bar {
  display: flex;
  list-style: none;
  padding-left: 29px;
}

.nav-bar li a {
  padding: 19px;
  text-align: center;
  line-height: 70px;
  text-decoration: none;
  color: #ccc;
}
.nav-bar li:hover .nav-btn {
  background: #000;
  color: #fff;
}
.nav-btn.visited {
  background: #000;
  color: #fff;
}
.top-search-input {
  padding-top: 15px;
  padding-left: 45px;
  width: 200px;
}
.user-headimg {
  padding-top: 13px;
  padding-left: 28px;
}
.top-headimg-slide-menu {
  position: absolute;
  top: 70px;
  right: -66px;
  width: 158px;
  box-sizing: border-box;
  background: #2b2b2b;
  border: 1px solid #202020;
  box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  z-index: 55;
  display: none;
}
.top-headimg-slide-menu li a {
  color: #ccc;
  padding: 8px 0 8px 24px;
  display: inline-block;
  width: 133px;
}
.top-headimg-slide-menu li a span {
  padding-left: 5px;
  font-size: 14px;
}
.nav-bar-login-btn {
  padding-top: 23px;
  padding-left: 35px;
}
.top-headimg-slide-menu li a:hover {
  background: #353535;
  text-decoration: none;
  color: #fff;
}
.user-headimg:hover .top-headimg-slide-menu {
  display: block;
}
.nav-bar-login-btn a {
  color: #ccc;
  text-decoration: none;
}
.nav-bar-login-btn:hover a {
  color: #fff;
}
.top-headimg {
  cursor: pointer;
}
.foot-copy {
  position: relative;
  height: 140px;
  overflow: hidden;
  border-top: 1px solid #d3d3d3;
  background: #f2f2f2;
}
.copy-wrap {
  width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.ft-copy {
  width: 520px;
  padding-top: 15px;
  line-height: 24px;
  color: #666;
  font-size: 13px;
}
a {
  text-decoration: none;
}
.copy-add {
  color: #666;
}
.line {
  margin: 0 8px 0 10px;
  color: #c2c2c2;
}
.copy-link {
  color: #999;
}
.ft-enter {
  width: 420px;
  margin-top: 33px;
  display: flex;
}
.ft-logo {
  display: inline-block;
  background: url("../assets/foot_enter.png") no-repeat;
  background-size: 110px 552px;
  width: 50px;
  height: 45px;
}
.ft-logo.one {
  background-position: -63px -456.5px;
}
.ft-logo.two {
  background-position: -63px -101px;
}
.ft-logo.four {
  background-position: -60px -50px;
}
.ft-logo.five {
  background-position: 0 -101px;
}
.unit {
  width: 60px;
  height: 70px;
  margin-left: 30px;
  display: flex;
  color: #666;
  flex-direction: column;
}
.unit span {
  text-align: center;
  font-size: 12px;
  width: 90px;
  margin-left: -20px;
  padding-top: 5px;
}
.dialog-footer {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.login-form span,
.register-form span {
  display: inline-block;
  width: 80px;
  font-size: 17px;
}
.login-form,
.register-form {
  padding-left: 40px;
  padding-bottom: 25px;
}
.login-form input,
.register-form input {
  padding-left: 15px;
  width: 340px;
  height: 40px;
}
.login-form div,
.register-form div {
  padding-top: 25px;
}
#login-code {
  width: 135px;
}
</style>
