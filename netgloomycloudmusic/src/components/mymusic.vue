<template>
  <div class="my-music">
    <div class="mymusic-body">
      <a href="javascript:;" id="login-btn" @click="openLogin">立即登录</a>
      <div class="shade"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mymusic",
  data() {
    return {
      userphone: "18089881271",
      userPwd: "haozihaozi123",
    };
  },
  methods: {
    // *通过调用父组件的变量改变其状态打开登录界面
    openLogin() {
      this.$parent.dialogVisible = true;
    },
  },
};
</script>

<style scoped>
.my-music {
  position: relative;
  width: 1920px;
  background: rgb(245, 245, 245);
}
.mymusic-body {
  width: 1100px;
  position: relative;
  margin: 0 auto;
  height: 720px;
  border: 2px solid rgb(211, 211, 211);
  background: url("../assets/mymusic.png") no-repeat #fff;
  background-position: 180px 90px;
}
.shade {
  width: 100%;
  background: #fff;
  position: absolute;
  bottom: 0;
  height: 353px;
}
#login-btn {
  display: block;
  width: 167px;
  height: 45px;
  background: rgb(68, 146, 219);
  border-radius: 6px;
  text-decoration: none;
  box-shadow: 2px 0 23px #0005 inset;
  line-height: 45px;
  text-align: center;
  color: #fff;
  font-size: 17px;
  position: absolute;
  right: 272px;
  top: 292px;
  transition: all 0.2s;
}
#login-btn:hover {
  background: rgb(91, 164, 233);
  box-shadow: 0 0 10px #ccc;
}
</style>