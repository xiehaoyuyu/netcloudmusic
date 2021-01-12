<template>
  <div class="myfollow">
    <div class="myfollow-wrap">
      <!-- *粉丝数量显示 -->
      <div class="follow-num">
        <h3>粉丝（{{ followDatalength }}）</h3>
      </div>
      <ul class="follow-all">
        <li v-for="(flitem, flindex) in followData" :key="flindex">
          <a href="javascript:;" class="follow-img"
            ><img :src="flitem.avatarUrl" alt=""
          /></a>
          <div class="follow-info">
            <p>
              <a href="javascript:;" class="nickname">{{ flitem.nickname }}</a>
            </p>
            <p>
              <a href="javascript:;"
                >动态 <span>{{ flitem.eventCount }}</span></a
              >
              <span class="line">|</span>
              <a href="javascript:;"
                >关注 <span>{{ flitem.follows }}</span></a
              >
              <span class="line">|</span>
              <a href="javascript:;"
                >粉丝 <span>{{ flitem.followeds }}</span></a
              >
            </p>
          </div>
          <div class="follow-right">
            <a href="javascript:;" class="follow-btn no" v-if="flitem.followed"
              ><i class="el-icon-finished"></i>已关注</a
            >
            <a href="javascript:;" class="follow-btn" v-if="!flitem.followed"
              ><i class="el-icon-plus"></i>关注</a
            >
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios.js"; /*引入封装的axios*/
export default {
  data() {
    return {
      uid: "",
      myselfData: [],
      followData: [],
      followDatalength: "",
    };
  },
  mounted() {
    this.getFollow();
  },
  methods: {
    getFollow() {
      this.myselfData = JSON.parse(localStorage.getItem("myselfData"));
      console.log(this.myselfData);
      this.uid = this.myselfData.account.id;
      console.log(this.uid);
      axios({
        url: "/user/followeds" /**/,
        params: { uid: this.uid },
        method: "post",
      })
        .then((res) => {
          console.log("我拿到的数据：", res.data.followeds);
          this.followData = res.data.followeds;
          this.followDatalength = res.data.followeds.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.follow-info .nickname {
  color: #000;
}
.myfollow-wrap {
  padding: 35px 0 25px;
}
.follow-num h3 {
  font-weight: normal;
}
.follow-num {
  border-bottom: 2px solid #c20c0c;
  height: 35px;
}
li {
  list-style: none;
}
.follow-img {
  display: inline-block;
  width: 70px;
  height: 70px;
}
.follow-img img {
  width: 100%;
}
.follow-all {
  display: flex;
  flex-wrap: wrap;
}
.follow-all li {
  width: 505.5px;
  height: 80px;
  padding: 23px 20px 0 23px;
  display: flex;
  justify-content: space-between;
}

.follow-all li:nth-child(2n-1) {
  border-left: 1px solid #d5d5d5;
}
.follow-all li:nth-child(2n) {
  border-left: 1px solid #d5d5d5;
  border-right: 1px solid #d5d5d5;
}
a {
  text-decoration: none;
}
.follow-info {
  width: 290px;
  margin-left: 10px;
}
.follow-info p {
  margin-bottom: 8px;
}
.line {
  margin: 0 8px;
  color: #999;
}
.follow-info a {
  color: #999;
}
.follow-info a:hover {
  text-decoration: underline;
}
.follow-info a span {
  color: #c20c0c;
}
.follow-btn {
  display: inline-block;
  width: 70px;
  height: 35px;
  background: #c20c0c;
  color: antiquewhite;
  line-height: 35px;
  text-align: center;
  border-radius: 5px;
  font-size: 15px;
}
.follow-btn.no {
  background: rgb(179, 179, 179);
  color: #fff;
}
</style>