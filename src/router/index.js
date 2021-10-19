import Vue from "vue"
import VueRouter from "vue-router"
import Login from "../views/Login.vue"
import MovieList from "../views/MovieList.vue"
import MovieShow from "../views/MovieShow.vue"
import SignUp from "../views/SignUp.vue"
import Profile from "../views/Profile.vue"

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
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
  },
  {
    path: "/:id/profile",
    name: "profile",
    component: Profile,
    props: true,
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
