import Vue from "vue"
import VueRouter from "vue-router"
import Login from "../views/Login.vue"
import MovieList from "../views/MovieList.vue"
import MovieShow from "../views/MovieShow.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/:id/movies",
    name: "movie-list",
    component: MovieList,
    props: true,
  },
  {
    path: "/:id/movies/:movieId",
    name: "movie-show",
    component: MovieShow,
    props: true,
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
