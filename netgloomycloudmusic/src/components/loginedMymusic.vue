<template>
  <div class="loginedMusic">
    <!-- *banner -->
    <div class="logined-banner">
      <div class="bannerbg">
        <div class="banner-wrap">
          <!-- *头像 -->
          <div class="banner-headimg">
            <img :src="this.$parent.headimgUrl" alt="" class="headimg-url" />
          </div>
          <!-- *昵称 -->
          <h1 class="nike-name">{{ this.$parent.nikeName }}</h1>
          <!-- *关注 粉丝 -->
          <ul class="fans">
            <li>
              <a href="javascript:;" @click="test"
                ><strong>30</strong><span>关注</span></a
              >
            </li>
            <li>
              <a href="javascript:;"><strong>21</strong><span>粉丝</span></a>
            </li>
          </ul>
          <!-- *我的音乐导航 -->
          <div class="my-music-tab">
            <router-link
              v-for="(item, index) in tabData"
              :key="index"
              :to="item.src"
              >{{ item.label }}</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <!-- *主体 -->
    <div class="my-music-content">
      <div class="my-music-content-wrap">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios.js"; /*引入封装的axios*/
export default {
  data() {
    return {
      tabData: [
        { label: "我喜欢", src: "/iLikeList" },
        { label: "关注", src: "/follow" },
        { label: "粉丝", src: "/fans" },
        { label: "我创建的歌单", src: "/creatSongList" },
        { label: "我上传的视频", src: "/myVideo" },
      ],
      likeListIDS: [],
      // *ilikelist
      likeList: this.$parent.likeList,
      // *new
      finalList: [],
      gostlist: [],
    };
  },
  mounted() {
    this.getLikeList();
  },
  methods: {
    test() {
      console.log(document.cookie);
    },
    getLikeList() {
      console.log(this.likeList);
      axios({
        url: "/playlist/detail" /*/likelist*/,
        params: {
          id: this.$parent.likeListid,
        },
        method: "post",
      })
        .then((res) => {
          this.likeListIDS = res.data.playlist.trackIds;
          console.log("this.likeListIDS", this.likeListIDS);
          const data = [];
          console.log(this.likeListIDS[0].id, 22222);
          for (let i = 0; i < 20; i++) {
            axios({
              url: "/song/detail" /**/,
              params: { ids: this.likeListIDS[i].id },
              method: "post",
            })
              .then((res) => {
                // *w
                data.push({});
                var dtt = res.data.songs[0];
                var minutes = parseInt(
                  (dtt.dt % (1000 * 60 * 60)) / (1000 * 60)
                );
                var seconds = parseInt((dtt.dt % (1000 * 60)) / 1000);
                if (minutes < 10) {
                  minutes = "0" + minutes;
                }
                if (seconds < 10) {
                  seconds = "0" + seconds;
                }
                dtt.dt = minutes + ":" + seconds;
                this.finalList.push(dtt);
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });

      //执行代码
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #000;
}
.logined-banner {
  background: url("../assets/mybg.jpg") no-repeat;
  height: 380px;
  padding-top: 30px;
  background-size: 100% 800px;
  background-position: 0 -100px;
  position: relative;
}
.banner-wrap {
  width: 1100px;
  margin: 0 auto;
}
.bannerbg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background: #0002;
}
.banner-headimg {
  position: relative;
  width: 110px;
  height: 110px;
  margin: 80px auto 0;
}
.headimg-url {
  display: block;
  width: 100%;
  height: 100%;
  border: 4px solid #fff;
  border-radius: 50%;
  background: #fff;
}
.nike-name {
  font-size: 30px;
  font-weight: 400;
  line-height: 64px;
  text-align: center;
  color: #fff;
}
.fans {
  height: 40px;
  margin: 4px 15px 26px;
  display: flex;
  justify-content: center;
}
li {
  list-style: none;
}
a {
  text-decoration: none;
}
.fans li > a {
  display: flex;
  flex-direction: column;
  color: #fff;
}
.fans li {
  text-align: center;
  padding: 0 25px;
}
.fans li:nth-child(1) {
  border-right: solid 1px #24313d;
}
.fans li strong {
  font-size: 20px;
}
.fans li:hover strong {
  color: #f60;
}
.my-music-tab {
  width: 100%;
  height: 50px;
  background: #0003;
  border-radius: 5px;
  box-shadow: 0 0 155px #0003;
  margin-top: 64px;
}
.my-music-tab a {
  color: #fff;
  margin-right: 40px;
  margin-left: 5px;
  line-height: 50px;
}
.my-music-tab a:hover,
.my-music-tab a:focus {
  color: rgb(230, 0, 38);
}
.my-music-content {
  background: rgb(250, 250, 250);
  padding-bottom: 50px;
}
.my-music-content-wrap {
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;
  padding: 0 20px;
  width: 1100px;
  margin: 0 auto;
}
</style>