import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: "/discover",
    children: [
      {
        path: "/discover",
        name: "discover",
        component: () => import("../components/discover.vue"),
      },
      {
        path: "/netsearch",
        name: "netsearch",
        component: () => import("../components/netsearch.vue"),
      },
      {
        path: "/mymusic",
        name: "mymusic",
        component: () => import("../components/mymusic.vue"),
      },
      {
        path: "/hotSongListShow",
        name: "hotSongListShow",
        component: () => import("../components/hotSongListShow.vue"),
      },
      {
        path: "/albumDetail",
        name: "albumDetail",
        component: () => import("../components/albumDetail.vue"),
      },
      {
        path: "/dailySongs",
        name: "dailySongs",
        component: () => import("../components/dailySongs.vue"),
      },
      {
        path: "/player",
        name: "player",
        component: () => import("../components/player.vue"),
      },
      {
        path: "/loginedMymusic",
        name: "loginedMymusic",
        redirect: "/iLikeList",
        component: () => import("../components/loginedMymusic.vue"),
        children: [
          {
            path: "/iLikeList",
            name: "iLikeList",
            component: () => import("../components/iLikeList.vue"),
          },
          {
            path: "/mybuy",
            name: "mybuy",
            component: () => import("../components/mybuy.vue"),
          },
          {
            path: "/creatSongList",
            name: "creatSongList",
            component: () => import("../components/creatSongList.vue"),
          },
          {
            path: "/follow",
            name: "follow",
            component: () => import("../components/follow.vue"),
          },
          {
            path: "/fans",
            name: "fans",
            component: () => import("../components/fans.vue"),
          },
          {
            path: "/myVideo",
            name: "myVideo",
            component: () => import("../components/myVideo.vue"),
          },
        ],
      },
      {
        path: "/personalData",
        name: "personalData",
        component: () => import("../components/personalData.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
