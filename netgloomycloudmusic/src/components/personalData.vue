<template>
  <div class="personalData">
    <div class="person-wrap">
      <div class="personalTitle"><h3>个人设置</h3></div>
      <!-- *表单 -->
      <div class="hoped">
        <ul class="personal-form">
          <li>
            <span>昵称：</span
            ><input
              type="text"
              class="text-input"
              placeholder="请输入您要修改的昵称"
              v-model="personal.nikename"
            />
          </li>
          <li>
            <span class="gip">介绍：</span
            ><textarea
              class="text-input introduce"
              placeholder="说点什么吧..."
              v-model="personal.introduce"
            ></textarea>
          </li>
          <li>
            <span>性别：</span
            ><el-radio v-model="personal.sex" label="男">男</el-radio>
            <el-radio v-model="personal.sex" label="女">女</el-radio>
            <el-radio v-model="personal.sex" label="保密">保密</el-radio>
          </li>
          <li>
            <span>生日：</span>
            <el-date-picker
              v-model="personal.brithday"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </li>
          <li><span>地区：</span></li>
          <a href="javascript:;" class="save-btn" @click="save">保存</a>
        </ul>
        <!-- *更改头像 -->
        <div class="changeHeadimg">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // *个人介绍数据
      personal: { sex: "男", introduce: "", brithday: "", nikename: "" },
      imageUrl: "",
    };
  },
  methods: {
    save() {
      console.log(this.personal);
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    //   console.log(res, file);
      console.log(this.imageUrl);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style scoped>
.save-btn {
  width: 81px;
  height: 31px;
  background: rgb(230, 0, 38);
  box-shadow: 0 -10px 25px #6666 inset;
  border-radius: 5px;
  display: inline-block;
  line-height: 31px;
  text-align: center;
  color: #fff;
  margin-left: 280px;
}
.save-btn:hover {
  background: rgb(255, 24, 63);
}
li {
  list-style: none;
}
a {
  text-decoration: none;
}
.personalData {
  position: relative;
  width: 1920px;
  background: rgb(245, 245, 245);
}
.person-wrap {
  width: 900px;
  position: relative;
  margin: 0 auto;
  height: 720px;
  background: #fff;
  padding: 40px;

  border: 2px solid rgb(211, 211, 211);
}
.personalTitle h3 {
  font-size: 24px;
  color: #333;
  font-weight: normal;
}
.personalTitle {
  border-bottom: 2px solid rgb(245, 46, 46);
  padding-bottom: 10px;
  margin-bottom: 30px;
}
.text-input {
  width: 292px;
  height: 19px;
  margin: 0;
  padding: 5px 10px 6px;
  border: 1px solid #cdcdcd;
  border-radius: 2px;
  line-height: 19px;
  box-sizing: content-box;
}
.text-input.introduce {
  height: 122px;
}
.personal-form {
  width: 400px;
  margin-right: 30px;
}
.hoped {
  display: flex;
}
.personal-form li:nth-child(2) {
  display: flex;
}
.personal-form li {
  padding-bottom: 15px;
}
input,
textarea {
  outline-style: none;
}
</style>