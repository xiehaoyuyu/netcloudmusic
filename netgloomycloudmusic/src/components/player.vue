<template>
  <div class="player">
    <div class="song-bgbg">
      <img :src="picUrl" alt="" class="song-bgbgbg" />
    </div>
    <div class="player-wrap">
      <div class="player-w-wrap">
        <!-- *唱片 -->
        <div class="disc move" ref="rotate">
          <img :src="picUrl" alt="" />
          <span class="disc-bg"></span>
        </div>
        <!-- *歌曲信息 -->
        <div class="song-info">
          <div class="song-title">{{ title }}</div>
          <p>
            歌手：<span
              ><a href="javascript:;">{{ singer }}</a></span
            >
          </p>
          <p>
            所属专辑：<span
              ><a href="javascript:;">{{ alname }}</a></span
            >
          </p>
          <p>
            <el-button type="danger" :class="playclass" @click="playerbtn">
              {{ playtext }}</el-button
            ><el-button class="el-icon-plus">添加</el-button
            ><el-button class="el-icon-back" @click="presong">上一首</el-button
            ><el-button class="el-icon-right" @click="nextsong"
              >下一首</el-button
            >
          </p>
          <div class="lrc">
            <el-row type="flex" justify="center" class="lyric-contain">
              <el-col :span="23">
                <el-row
                  v-for="(item, lrc) in lyric"
                  :key="lrc"
                  class="lyricitm"
                >
                  {{ item.text }}
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <div class="audio">
      <aplayer
        :audio="audio"
        :lrcType="1"
        v-if="showplayer"
        autoplay
        @play="disc"
        @pause="stop"
        ref="aplayer"
        @listSwitch="listSwitch"
      />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import APlayer from "@moefe/vue-aplayer";
// import axios from "@/plugins/axios.js"; /*引入封装的axios*/

Vue.use(APlayer);
// import Aplayer from "vue-aplayer";
export default {
  components: {},
  data() {
    return {
      singer: this.$route.query.singer,
      title: this.$route.query.title,
      picUrl: this.$route.query.picUrl,
      alname: this.$route.query.alname,
      src: this.$route.query.src,
      lrc: this.$route.query.lrc,
      playtext: "播放",
      playclass: "el-icon-video-play",
      showplayer: false,
      audio: [
        {
          name: this.$route.query.title,
          artist: this.$route.query.singer,
          url: this.$route.query.src,
          cover: this.$route.query.picUrl, // prettier-ignore
          lrc: this.$route.query.lrc,
          alname: this.$route.query.alname,
        },
      ],
      lyricdata: [],
      lyric: [],
      songLrc: this.$route.query.lrc,
      songListitem: { name: "", artist: "" },
      songListData: [],
    };
  },
  mounted() {
    
    this.getSongAllInfo();
    this.formatLyric(this.$route.query.lrc);
    // this.musicpush();

    this.audio = JSON.parse(localStorage.getItem("songlist"));
    this.showplayer = true;
    console.log(this.audio, "18088888888999666");
    // this.audio.name
    // console.log(this.songLrc);
    // this.haohaode = JSON.parse(this.haohaode);
  },
 
  methods: {
    listSwitch(e) {
      this.title = e.name;
      this.singer = e.artist;
      this.picUrl = e.cover;
      this.alname = e.alname;
      // this.lrc = e.lrc;
      this.formatLyric(e.lrc);

      console.log(e);
    },
    musicpush() {
      this.music.name = this.$route.query.title;
      this.music.artist = this.$route.query.singer;
      this.music.url = this.$route.query.src;
      this.music.cover=this.$route.query.picUrl // prettier-ignore
      this.music.lrc = this.$route.query.lrc;
      this.audio.push(this.music);
    },
    playerbtn() {
      this.playtext = this.playtext == "播放" ? "暂停" : "播放";
      this.playclass =
        this.playclass == "el-icon-video-play"
          ? "el-icon-video-pause"
          : "el-icon-video-play";
      if (this.playtext == "播放") {
        this.stop();
      } else if (this.playtext == "暂停") {
        this.disc();
      }
    },
    presong() {
      this.$refs.aplayer.skipBack();
    },
    nextsong() {
      this.$refs.aplayer.skipForward();
    },
    stop() {
      console.log("stop");
      this.$refs.rotate.style.animationPlayState = "paused";
      this.playtext = "播放";
      this.playclass = "el-icon-video-play";
    },
    disc() {
      this.$refs.rotate.style.animationPlayState = "running";
      this.playtext = "暂停";
      this.playclass = "el-icon-video-pause";
    },
    getSongAllInfo() {
      this.haohaode = this.$route.query.id;
      console.log(this.haohaode);
      console.log(this.$route.query.songs);
    },
    formatLyric(text) {
      let arr = text.split("\n"); //原歌词文本已经换好行了方便很多，我们直接通过换行符“\n”进行切割
      let row = arr.length; //获取歌词行数
      for (let i = 0; i < row; i++) {
        let temp_row = arr[i]; //现在每一行格式大概就是这样"[00:04.302][02:10.00]hello world";
        let temp_arr = temp_row.split("]"); //我们可以通过“]”对时间和文本进行分离
        let text = temp_arr.pop(); //把歌词文本从数组中剔除出来，获取到歌词文本了！
        //再对剩下的歌词时间进行处理
        temp_arr.forEach((element) => {
          let obj = {};
          let time_arr = element.substr(1, element.length - 1).split(":"); //先把多余的“[”去掉，再分离出分、秒
          let s = parseInt(time_arr[0]) * 60 + Math.ceil(time_arr[1]); //把时间转换成与currentTime相同的类型，方便待会实现滚动效果
          obj.time = s;
          obj.text = text;
          this.lyric.push(obj); //每一行歌词对象存到组件的lyric歌词属性里
        });
      }
      this.lyric.sort(this.sortRule); //由于不同时间的相同歌词我们给排到一起了，所以这里要以时间顺序重新排列一下
    },
    sortRule(a, b) {
      //设置一下排序规则
      return a.time - b.time;
    },
  },
};
</script>

<style scoped>
.audio {
  width: 100%;
  position: absolute;
  right: 0px;
  bottom: 0px;
  /* height: 350px; */
  z-index: 55;
}
.song-bgbgbg {
  filter: blur(66px);
}
.disc {
  width: 206px;
  height: 206px;
}
.disc.move {
  animation: move 10s linear infinite;
}
@keyframes move {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.lyricitm {
  margin: 5px;
}
a {
  text-decoration: none;
}

.player-wrap {
  width: 1100px;
  margin: 0 auto;
  /* border: 1px solid #000; */
  position: relative;
  background: rgb(255, 255, 255, 0.7);
}
.song-bgbg img {
  width: 100%;
  height: 1820px;
  margin-top: -380px;
}
.song-bgbg {
  /* margin-top: 70px; */
  position: absolute;
  width: 100%;
  height: 900px;
  overflow: hidden;
}
.player-w-wrap {
  display: flex;
  padding: 52px 30px 40px 88px;
}
.disc {
  position: relative;
}
.disc img {
  width: 130px;
  height: 130px;
  margin: 38px;
}
.disc-bg {
  display: block;
  background: url("../assets/disc.png") no-repeat;
  width: 206px;
  height: 205px;
  position: absolute;
  top: 0px;
}
.song-info {
  padding: 5px 65px 0;
}
.song-info p {
  color: #999;
  margin: 10px 0;
  font-size: 13px;
}
.song-info p a {
  font-size: 13px;
}
.song-title {
  font-size: 26px;
}
.lrc {
  text-align: center;
  height: 560px;
  margin-top: 55px;
  overflow: hidden;
}
</style>