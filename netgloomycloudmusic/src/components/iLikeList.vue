<template>
  <div class="ilike">
    <div class="control">
      <el-button type="success" class="el-icon-video-play"> 播放全部</el-button>
      <el-button class="el-icon-plus"> 添加到</el-button>
      <el-button class="el-icon-download"> 下载</el-button>
      <el-button class="el-icon-s-fold" @click="bulkOperationBtn">
        {{ bulkOperation }}</el-button
      >
    </div>
    <el-table
      :data="likeSongData"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-loading="loading"
    >
      <el-table-column type="selection" width="30" v-if="selectBox">
      </el-table-column>
      <el-table-column label="操作" width="50">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            icon="el-icon-caret-right"
            @click="player(scope.$index, scope.row)"
            circle
          ></el-button>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="歌曲" width="400">
        <template slot-scope="scope"
          ><a @click="player(scope.$index, scope.row)" href="javascript:;">{{
            scope.row.name
          }}</a></template
        >
      </el-table-column>
      <el-table-column prop="ar[0].name" label="歌手" :width="Cwidth">
      </el-table-column>
      <el-table-column prop="al.name" label="专辑" :width="Cwidth">
      </el-table-column>
      <el-table-column prop="dt" label="时长" width="100"> </el-table-column>
      <el-table-column label="操作" width="50">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="Delete(scope.$index, scope.row)"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "@/plugins/axios.js"; /*引入封装的axios*/
export default {
  data() {
    return {
      likeSongData: this.$parent.finalList,
      multipleSelection: [],
      bulkOperation: "批量操作",
      selectBox: false,
      Cwidth: 250,
      url: "",
      picUrl: "",
      loading: false,
    };
  },
  mounted() {
    console.log(this.likeSongData);
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    // *批量操作
    bulkOperationBtn() {
      this.bulkOperation =
        this.bulkOperation === "取消批量操作" ? "批量操作" : "取消批量操作";
      this.selectBox = this.selectBox === true ? false : true;
      this.Cwidth = this.Cwidth === 235 ? 250 : 235;
    },
    // *播放按钮
    player(index, row) {
      console.log(row.id);
      axios({
        url: "/song/detail",
        params: { ids: row.id },
        method: "post",
      })
        .then((res) => {
          console.log(res.data.songs[0].al.picUrl);
          this.picUrl = res.data.songs[0].al.picUrl;
        })
        .catch((err) => {
          console.log(err);
        });
      axios({
        url: "/song/url",
        params: { id: row.id },
        method: "post",
      })
        .then((res) => {
          console.log(res.data.data[0].url);
          this.url = res.data.data[0].url;
        })
        .catch((err) => {
          console.log(err);
        });
      axios({
        url: "/lyric",
        params: { id: row.id },
        method: "post",
      }).then((res) => {
        this.$router.push({
          name: "player",
          query: {
            id: row.id,
            singer: row.ar[0].name,
            title: row.name,
            alname: row.al.name,
            url: this.url,
            picUrl: this.picUrl,
            lrc: res.data.lrc.lyric,
            src: this.url,
          },
        });
      });
    },
    // *删除按钮
    Delete(index, row) {
      this.$confirm("是否将该歌曲从我喜欢歌单移除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.likeSongData.splice(index, 1);
          this.$message({
            type: "success",
            message: "移除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });

      console.log(index, row);
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
.control {
  padding: 45px 0 25px;
}
</style>