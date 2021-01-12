<template>
  <div class="search-result">
    <div class="search-wrap">
      <div class="song-count">
        搜索“{{ this.$parent.searchKey }}”，找到
        <b style="color: red">{{ this.$parent.searchLimit }}</b> 首单曲
      </div>
      <el-table :data="$store.state.searchData" stripe style="width: 100%">
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
          <template slot-scope="scope"
            ><a
              @click="handlePlayer(scope.$index, scope.row)"
              href="javascript:;"
              >{{ scope.row.name }}</a
            ></template
          >
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
              @click="handleAdd(scope.$index, scope.row, scope)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios.js"; /*引入封装的axios*/
export default {
  data() {
    return {
      id: "",
      singer: "",
      title: "",
      songs: "",
      picUrl: "",
      alname: "",
      src: "",
      lrc: "",
    };
  },
  mounted() {},
  methods: {
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
                  cover: cover,
                  lrc: lrc,
                  alname: alname,
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
    handleAdd(index, row, scope) {
      console.log(index, row);
      console.log(scope, 11);
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
a {
  text-decoration: none;
  color: #000;
}
.search-result {
  background: rgb(245, 245, 245);
}
.search-wrap {
  width: 1100px;
  margin: 0 auto;
}
.song-count {
  padding: 15px;
}
</style>