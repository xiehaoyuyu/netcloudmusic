<template>
  <div class="banner">
    <div class="slide">
      <div class="slide-wrap">
        <el-carousel :interval="4000" type="card" height="250px">
          <el-carousel-item v-for="item in slideUrl" :key="item">
            <img :src="item" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="slide-left"></div>
      <div class="slide-right right"></div>
    </div>
    <!-- *主体部分 -->
    <div class="song-list-bg">
      <div class="song-list-wrap">
        <!-- *推荐歌单 -->
        <div class="hot">
          <!-- *热门推荐导航加分类 -->
          <div class="title-tip">
            <a href="" class="tit">热门推荐 ></a>
            <ul class="hot-classify">
              <li><a href="javascript:;">华语</a></li>
              <span class="line">|</span>
              <li><a href="javascript:;">欧美</a></li>
              <span class="line">|</span>
              <li><a href="javascript:;">摇滚</a></li>
              <span class="line">|</span>
              <li><a href="javascript:;">民谣</a></li>
              <span class="line">|</span>
              <li><a href="javascript:;">电子</a></li>
            </ul>
          </div>
          <!-- *热门推荐的主体 -->
          <div class="hot-content">
            <ul class="hot-cvrlst">
              <li v-for="(item, hotindex) in hotMusicData" :key="hotindex">
                <a href="javascript:;" @click="gomusicList(item, hotindex)"
                  ><img :src="item.coverImgUrl" alt="" />
                  <div class="play-count">
                    <span class="icon-listen"></span
                    ><span class="play-number">{{ item.playCount }}</span
                    ><span class="icon-playmusic"></span></div></a
                ><a href="javascript:;" class="hot-music-tit">{{
                  item.name
                }}</a>
              </li>
            </ul>
          </div>
        </div>
        <!-- *个性化推荐 -->
        <div class="personal-part" v-if="this.$parent.topUserImg">
          <div class="title-tip">
            <a href="" class="tit">个性化推荐 ></a>
          </div>
          <ul class="personalized">
            <li>
              <a href="javascript:;" @click="personSongs"
                ><span class="person-week">{{ personWeek }}</span>
                <div class="person-date">{{ personDate }}</div></a
              >
              <p class="dec"><a href="">每日歌曲推荐</a></p>
              <p class="dec-p">根据你的口味生成， 每天6:00更新</p>
            </li>
            <li>
              <a href="javascript:;"
                ><img src="../assets/person1.jpg" alt=""
              /></a>
              <p class="dec">
                <a href="javascript:;">私人雷达 | 根据听歌记录为你打造</a>
              </p>
              <p class="dec-p">猜你喜欢</p>
            </li>
            <li>
              <a href="javascript:;"
                ><img src="../assets/person2.jpg" alt=""
              /></a>
              <p class="dec">
                <a href="javascript:;"
                  >[欧美私人订制] 最懂你的欧美推荐 每日更新</a
                >
              </p>
              <p class="dec-p">猜你喜欢</p>
            </li>
            <li>
              <a href="javascript:;"
                ><img src="../assets/person3.jpg" alt=""
              /></a>
              <p class="dec"><a href="javascript:;">老叁音乐的歌单</a></p>
              <p class="dec-p">根据你喜欢的单曲《Cobardía》推荐</p>
            </li>
          </ul>
        </div>
        <!-- * -->
        <div class="new-album">
          <div class="title-tip">
            <a href="" class="tit">新碟上架></a>
            <ul class="hot-classify">
              <li><a href="javascript:;" @click="getAlbumALL">全部</a></li>
              <span class="line">|</span>
              <li><a href="javascript:;" @click="getAlbumZH">华语</a></li>
              <span class="line">|</span>
              <li><a href="javascript:;" @click="getAlbumEA">欧美</a></li>
              <span class="line">|</span>
              <li><a href="javascript:;" @click="getAlbumKR">韩国</a></li>
              <span class="line">|</span>
              <li><a href="javascript:;" @click="getAlbumJP">日本</a></li>
            </ul>
          </div>
          <!-- *专辑 -->
          <ul class="album-content">
            <li v-for="(alitem, alindex) in albumData" :key="alindex">
              <div class="al-item-bg" @click="toalbumList(alitem, alindex)">
                <img :src="alitem.picUrl" alt="" />
                <a href="javascript:;" class="al-bgimg"
                  ><a href="javascript:;" class="player-bg"></a
                ></a>
                <p class="al-title">
                  <a href="javascript:;" class="al-name">{{ alitem.name }}</a>
                </p>
                <p class="al-art">
                  <a href="javascript:;">{{ alitem.artists[0].name }}</a>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios.js"; /*引入封装的axios*/
export default {
  name: "discover",
  data() {
    return {
      // *轮播图
      slideUrl: [],
      // *热门推荐数据
      hotMusicData: [],
      // *每日推荐日期
      personWeek: "",
      personDate: "",
      // *新碟上架数据
      albumData: [],
      personalShow: false,
    };
  },
  mounted() {
    this.getCurrentDate();
    this.getBanner();
    this.getHotsonglist();
    this.getNewAlbum();
  },
  methods: {
    personSongs() {
      this.$router.push({
        name: "dailySongs",
        query: { personWeek: this.personWeek, personDate: this.personDate },
      });
    
    },
    // *跳转每个专辑列表
    toalbumList(alitem, alindex) {
      console.log(alitem, alindex);
      this.$router.push({
        name: "albumDetail",
        query: { ablumId: alitem.id },
      });
    },
    getAlbumALL() {
      this.$store.commit("getAlbum", "ALL");
      console.log(this.$store.state.albumArea);
      this.getNewAlbum();
    },
    getAlbumZH() {
      this.$store.commit("getAlbum", "ZH");
      console.log(this.$store.state.albumArea);
      this.getNewAlbum();
    },
    getAlbumEA() {
      this.$store.commit("getAlbum", "EA");
      console.log(this.$store.state.albumArea);
      this.getNewAlbum();
    },
    getAlbumKR() {
      this.$store.commit("getAlbum", "KR");
      console.log(this.$store.state.albumArea);
      this.getNewAlbum();
    },
    getAlbumJP() {
      this.$store.commit("getAlbum", "JP");
      console.log(this.$store.state.albumArea);
      this.getNewAlbum();
    },
    // *新碟上架
    getNewAlbum() {
      axios({
        url: "/album/new?limit=24" /*轮播图接口地址*/,
        method: "post",
        params: { area: this.$store.state.albumArea },
      })
        .then((res) => {
          // this.slideUrl = res.data.banners;
          console.log("新碟上架", res.data.albums);
          this.albumData = res.data.albums;
          console.log(this.albumData);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // *热门歌单请求
    getHotsonglist() {
      axios({
        url: "/top/playlist?limit=8" /*轮播图接口地址*/,
        method: "post",
      })
        .then((res) => {
          // this.slideUrl = res.data.banners;
          console.log("我拿到的数据：", res.data.playlists);
          this.hotMusicData = res.data.playlists;
          console.log(this.hotMusicData);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // *跳转歌单
    gomusicList(item, hotindex) {
      console.log(item, hotindex);
      console.log(item.id);
      this.$router.push({
        name: "hotSongListShow",
        query: { listId: item.id },
      });
    },
    // *轮播图
    getBanner() {
      axios({
        url: "/banner" /*轮播图接口地址*/,
        method: "post",
      })
        .then((res) => {
          // this.slideUrl = res.data.banners;
          console.log("我拿到的数据：", res.data.banners);

          for (let i = 0; i < res.data.banners.length; i++) {
            this.slideUrl.push(res.data.banners[i].imageUrl);
            // console.log(res.data.banners[i]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // *每日推荐的准确日期
    getCurrentDate() {
      var myDate = new Date();
      var day = myDate.getDate(); //日
      var days = myDate.getDay();
      switch (days) {
        case 1:
          days = "星期一";
          break;
        case 2:
          days = "星期二";
          break;
        case 3:
          days = "星期三";
          break;
        case 4:
          days = "星期四";
          break;
        case 5:
          days = "星期五";
          break;
        case 6:
          days = "星期六";
          break;
        case 0:
          days = "星期日";
          break;
      }
      this.personWeek = days;
      this.personDate = day;
    },
  },
};
</script>

<style scoped>
.new-album {
  padding-top: 25px;
}
/* *轮播 */
.slide {
  background: #353535;
  padding: 15px 0;
  position: relative;
}
.slide img {
  width: 100%;
  height: 100%;
}
.slide-wrap {
  width: 1100px;
  margin: 0 auto;
}
.slide-left,
.slide-right {
  width: 288px;
  height: 100%;
  background-color: rgba(29, 29, 29, 0.267);
  position: absolute;
  top: 0;
}
.slide-right.right {
  right: 0;
}
.song-list-bg {
  background: rgb(245, 245, 245);
}
.song-list-wrap {
  width: 1100px;
  margin: 0 auto;
  padding: 20px 20px 40px;
  background: #fff;
  border: 1px solid #ccc;
}
.title-tip {
  background: url("../assets/index.png") no-repeat 0 9999px;
  height: 33px;
  padding: 0 10px 0 34px;
  background-position: -225px -156px;
  border-bottom: 2px solid #c10d0c;
  display: flex;
}
a {
  text-decoration: none;
}
li {
  list-style: none;
}
.tit {
  font-size: 22px;
  font-weight: bold;
  line-height: 28px;
  color: #353535;
}
.hot-classify {
  margin: 3px 0 0 25px;
  display: flex;
}
.hot-classify a {
  color: #666;
}
.hot-classify a:hover {
  color: #f00;
}
.line {
  margin: 0 15px;
  color: #ccc;
}
.hot-cvrlst,
.personalized {
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0 0 -42px;
  padding: 0 0 0 20px;
}
.hot-cvrlst li,
.personalized li {
  width: 180px;
  height: 204px;
  padding-left: 42px;
  padding: 15px 0 60px 85px;
  line-height: 1.4;
  display: inline-block;
  position: relative;
}
.hot-cvrlst li img,
.personalized li img {
  width: 100%;
  box-shadow: 0 0 5px #0008;
}
.dec a {
  display: inline-block;
  margin: 8px 0 3px;
  font-size: 16px;
  color: #000;
}
.dec:hover a {
  text-decoration: underline;
}
.dec-p {
  font-size: 14px;
  color: #999;
}
.hot-cvrlst li a {
  color: #000;
}
.hot-music-tit:hover {
  text-decoration: underline;
}
.hot-music-tit {
  display: inline-block;
  line-height: 1.5;
}
.play-count {
  width: 180px;
  height: 32px;
  background: #0005;
  position: absolute;
  top: 163px;
}
.icon-listen {
  float: left;
  width: 15px;
  height: 15px;
  margin: 9px 5px 9px 10px;
  background: url("../assets/iconall.png") no-repeat;
  background-position: 0px -23px;
}
.play-number {
  color: #fff;
  font-size: 12px;
  padding-top: 6.5px;
  display: inline-block;
}
.icon-playmusic {
  float: right;
  width: 15px;
  height: 15px;
  margin: 9px 10px 9px 10px;
  background: url("../assets/iconall.png") no-repeat;
  background-position: 0px 0px;
}
.person-week {
  display: block;
  height: 43px;
  line-height: 43px;
  color: #fed9d9;
  font-size: 16px;
  text-shadow: 0 -1px #962626;
  text-align: center;
  background: rgb(209, 56, 56);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  box-shadow: 0 -2px 3px #0007;
}
.person-date {
  /* position: absolute; */
  width: 180px;
  height: 139px;
  font-size: 88px;
  display: grid;
  align-items: center;
  text-align: center;
  font-weight: bold;
  color: #000;
  background: rgb(226, 226, 226);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  box-shadow: 0 0 2px #0007;
}
/* *专辑 */
.album-content {
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0 0 -42px;
  padding: 0 0 0 70px;
}
.album-content li {
  width: 220px;
  height: 220px;
  padding: 15px 0 40px 40px;
}
.al-item-bg {
  position: relative;
}
.al-bgimg {
  background: url("../assets/albg.png") no-repeat;
  width: 220px;
  height: 180px;
  background-position: 0 -983px;
  display: inline-block;
  position: absolute;
  left: 0;
}
.al-item-bg img {
  width: 175px;
  margin-top: 4px;
}
.al-item-bg p {
  width: 100%;
}
.al-name {
  display: inline-block;
  width: 196px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.player-bg {
  background: url("../assets/iconall.png") no-repeat;
  background-position: -33px -135px;
  width: 40px;
  height: 40px;
  position: absolute;
  z-index: 10;
  bottom: 13px;
  right: 56px;
  display: none;
}
.al-bgimg:hover .player-bg {
  display: block;
}
.al-title {
  margin: 8px 0 3px;
  font-size: 16px;
}
.al-title a {
  color: #000;
}
.al-title:hover a,
.al-art:hover a {
  text-decoration: underline;
}
.al-art a {
  font-size: 14px;
  color: #666;
}
</style>