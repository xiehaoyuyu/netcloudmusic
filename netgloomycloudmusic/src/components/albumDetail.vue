<template>
  <div class="hotSongListShow">
    <div class="hotSongListShow-wrap">
      <!-- 歌单的图片详情部分 -->
      <div class="hot-detail">
        <div class="songlist-img">
          <img :src="topInfoData.picUrl" alt="" />
        </div>
        <!-- / -->
        <div class="songlist-info">
          <h2>{{ topInfoData.name }}</h2>
          <div class="user-info">
            <b>歌手：</b>
            <a href="javascript:;" class="user-name">{{
              topInfoData.artist.name
            }}</a
            ><span class="creat-time">2018-05-13 创建</span>
          </div>
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
          <!-- *标签 -->
          <div class="tag">
            <b>发行公司：</b>
            <p>{{ topInfoData.company }}</p>
          </div>
          <!-- *描述 -->
          <p class="describe">
            <b>介绍：</b
            ><span :class="topInfoDataDescription">{{
              topInfoData.description
            }}</span>
          </p>
          <a href="javascript:;" class="unfold" @click="unfold()"
            >{{ unfoldtxt }}<i :class="unfoldclass"></i
          ></a>
        </div>
      </div>
      <!-- *歌单展示 -->
      <div class="song-list-show">
        <el-table :data="songListData" stripe style="width: 100%">
          <el-table-column label="播放" width="50">
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
          <el-table-column prop="ar[0].name" label="歌手" width="240">
          </el-table-column>
          <el-table-column prop="dt" label="时长" width="240"></el-table-column>
          <el-table-column label="操作" width="150">
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
      unfoldtxt: "展开",
      unfoldclass: "el-icon-arrow-down",
      topInfoDataDescription: "topInfoDataDescription",
    };
  },
  mounted() {
    this.getSongList();
  },
  methods: {
    // *展开隐藏
    unfold() {
      this.unfoldtxt = this.unfoldtxt == "展开" ? "收起" : "展开";
      this.unfoldclass =
        this.unfoldclass == "el-icon-arrow-down"
          ? "el-icon-arrow-up"
          : "el-icon-arrow-down";
      this.topInfoDataDescription =
        this.topInfoDataDescription == "topInfoDataDescription"
          ? ""
          : "topInfoDataDescription";
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
        url: "/album",
        params: { id: this.$route.query.ablumId },
        method: "post",
      })
        .then((res) => {
          console.log("哎呀", res.data);
          this.topInfoData = res.data.album;
          for (let i = 0; i < res.data.songs.length; i++) {
            var minutes = parseInt(
              (res.data.songs[i].dt % (1000 * 60 * 60)) / (1000 * 60)
            );
            var seconds = parseInt((res.data.songs[i].dt % (1000 * 60)) / 1000);
            if (minutes < 10) {
              minutes = "0" + minutes;
            }
            if (seconds < 10) {
              seconds = "0" + seconds;
            }
            res.data.songs[i].dt = minutes + ":" + seconds;
          }
          this.songListData = res.data.songs;
          console.log(this.songListData);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // *点击播放
    handlePlayer(index, row) {
      console.log(index, row);
      console.log(row.id);

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

/deep/ .el-table .cell {
  text-align: center;
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
  width: 208px;
  height: 208px;
  border: 5px double #0005;
  display: grid;
  align-items: center;
  justify-items: center;
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
}
.user-info {
  padding: 15px 0;
  display: flex;
}
.user-name:hover {
  text-decoration: underline;
}
.creat-time {
  display: block;
  color: #999;
  font-size: 14px;
  line-height: 35px;
  margin-left: 15px;
}
.user-info b {
  font-size: 14px;
  color: #666;
  line-height: 35px;
  font-weight: normal;
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