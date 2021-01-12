<template>
  <div class="hotSongListShow">
    <div class="hotSongListShow-wrap">
      <!-- 歌单的图片详情部分 -->
      <div class="hot-detail">
        <div class="songlist-img"></div>
        <!-- / -->
        <div class="songlist-info">
          <!-- *btn -->
          <p>
            <el-button
              type="danger"
              class="el-icon-video-play"
              @click="playtheAll"
            >
              播放全部</el-button
            ><el-button class="el-icon-plus">添加</el-button
            ><el-button class="el-icon-share">分享</el-button
            ><el-button class="el-icon-download">下载</el-button>
          </p>
        </div>
      </div>
      <!-- *歌单展示 -->
      <div class="song-list-show">
        <el-table :data="songListData" stripe style="width: 100%">
          <el-table-column label="播放">
            <template slot-scope="scope">
              <el-button
                size="mini"
                class="el-icon-caret-right"
                type="danger"
                circle
                @click="handlePlayer(scope.$index, scope.row)"
              ></el-button>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="歌曲" width="420">
          </el-table-column>
          <el-table-column prop="ar[0].name" label="歌手" width="200">
          </el-table-column>
          <el-table-column prop="al.name" label="专辑" width="220">
          </el-table-column>
          <el-table-column prop="dt" label="时长" width="100"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="info"
                class="el-icon-plus"
                circle
                @click="handleAdd(scope.$index, scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios.js"; /*引入封装的axios*/
export default {
  data() {
    return {
      // *顶部信息的数据
      topInfoData: [],
      //   *歌单歌曲列表数据
      songListData: [],
      tipBox: true,

      unfoldclass: "el-icon-arrow-down",
      topInfoDataDescription: "topInfoDataDescription",
    };
  },
  mounted() {
    this.getSongList();
    this.getDailySongs();
  },
  methods: {
    //   *获取每日推荐
    getDailySongs() {
      axios({
        url: "/recommend/songs" /*轮播图接口地址*/,
        method: "post",
      })
        .then((res) => {
          console.log("日推", res.data.data.dailySongs);
          this.songListData = res.data.data.dailySongs;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // *all
    playtheAll() {
      this.$router.push({
        name: "player",
        query: { listIds: this.$route.query.listId },
      });

      console.log(this.$route.query.listId);
    },
    //   *歌单展示歌曲
    getSongList() {
      console.log(this.$route.query.listId);
      axios({
        url: "/playlist/detail" /**/,
        params: { id: this.$route.query.listId },
        method: "post",
      })
        .then((res) => {
          console.log("我拿到的数据：", res.data);
          console.log("我拿数据：", res.data.playlist);
          this.topInfoData = res.data.playlist;
          for (let i = 0; i < res.data.playlist.tracks.length; i++) {
            var minutes = parseInt(
              (res.data.playlist.tracks[i].dt % (1000 * 60 * 60)) / (1000 * 60)
            );
            var seconds = parseInt(
              (res.data.playlist.tracks[i].dt % (1000 * 60)) / 1000
            );
            if (minutes < 10) {
              minutes = "0" + minutes;
            }
            if (seconds < 10) {
              seconds = "0" + seconds;
            }
            res.data.playlist.tracks[i].dt = minutes + ":" + seconds;
          }
          this.songListData = res.data.playlist.tracks;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // *点击播放
    handlePlayer(index, row) {
      console.log(index, row);
      console.log(row.id);
      // const data = [];
      // localStorage.setItem("songlist", JSON.stringify(data));

      axios({
        url: "/song/detail",
        params: { ids: row.id },
        method: "post",
      })
        .then((res) => {
          var name = res.data.songs[0].name;
          var alname = res.data.songs[0].al.name;
          var artist = res.data.songs[0].ar[0].name;
          var cover = res.data.songs[0].al.picUrl;
          console.log(res.data.songs[0]);
          console.log(this.picUrl);
          axios({
            url: "/song/url",
            params: { id: row.id },
            method: "post",
          })
            .then((res) => {
              console.log(res.data.data[0]);
              var url = res.data.data[0].url;
              axios({
                url: "/lyric",
                params: { id: row.id },
                method: "post",
              }).then((res) => {
                let data = JSON.parse(localStorage.getItem("songlist"));
                var lrc = res.data.lrc.lyric;
                let tmp = {
                  name: name,
                  artist: artist,
                  url: url,
                  "cover": cover, // prettier-ignore
                  lrc: lrc,
                };
                data.push(tmp);
                localStorage.setItem("songlist", JSON.stringify(data));
                this.$router.push({
                  name: "player",
                  query: {
                    id: row.id,
                    singer: artist,
                    title: name,
                    alname: alname,
                    url: url,
                    picUrl: cover,
                    lrc: lrc,
                    src: url,
                  },
                });
              });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
/deep/ .el-table__row .cell {
  display: -webkit-box; /*值必须为-webkit-box或者-webkit-inline-box*/
  -webkit-box-orient: vertical; /*值必须为vertical*/
  -webkit-line-clamp: 1; /*值为数字，表示一共显示几行*/
  overflow: hidden;
}
.unfold {
  display: inline-block;
  font-size: 14px;
  float: right;
  margin-right: 50px;
}
.topInfoDataDescription {
  display: -webkit-box; /*值必须为-webkit-box或者-webkit-inline-box*/
  -webkit-box-orient: vertical; /*值必须为vertical*/
  -webkit-line-clamp: 3; /*值为数字，表示一共显示几行*/
  overflow: hidden;
}
img {
  display: block;
}
.hotSongListShow {
  background: rgb(245, 245, 245);
}
.hotSongListShow-wrap {
  background: rgb(255, 255, 255);
  width: 1100px;
  margin: 0 auto;
  padding: 47px 30px 40px 39px;
}
.songlist-img {
  box-shadow: 0 0 8px #ccc;
  width: 640px;
  height: 180px;
  background: url("../assets/recmd_daily.jpg") no-repeat;
}
.songlist-img img {
  width: 200px;
  height: 200px;
}
a {
  text-decoration: none;
}
.hot-detail {
  display: flex;
  /* justify-content: space-around; */
}
h2 {
  font-weight: normal;
  width: 550px;
}
.user-img {
  display: inline-block;
  width: 35px;
  height: 35px;
}
.user-img img {
  width: 100%;
}
.user-name {
  display: block;
  font-size: 14px;
  line-height: 35px;
  margin-left: 15px;
}
.user-info {
  padding: 15px 0;
  display: flex;
}

.creat-time {
  display: block;
  color: #999;
  font-size: 14px;
  line-height: 35px;
  margin-left: 15px;
}
.tag {
  display: flex;
  padding: 15px 0;
}
.tag b {
  font-size: 14px;
  color: #666;
  line-height: 22px;
  font-weight: normal;
}
.tag-box {
  display: inline-block;
  width: 44px;
  height: 22px;
  border-radius: 25px;
  background: rgb(243, 243, 243);
  border: 1px solid #666;
  font-size: 14px;
  color: #666;
  display: grid;
  align-items: center;
  justify-items: center;
}
.describe b {
  font-size: 14px;
  color: #666;
  font-weight: normal;
  width: 44px;
}
.describe {
  width: 600px;
  display: flex;
}
.describe span {
  width: 500px;
  font-size: 14px;
  line-height: 1.4;
}
.songlist-info {
  padding-left: 45px;
}
</style>