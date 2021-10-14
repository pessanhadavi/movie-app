<template>
  <v-app-bar id="nav-bar" app color="yellow darken-4" dark>
    <div class="d-flex align-center">
      <a href="/"><h1>Movie List</h1></a>
    </div>
    <v-spacer></v-spacer>
    <div
      v-if="$store.state.username && $store.state.userId"
      class="d-flex align-center"
    >
      <router-link to="/" class="fave-link mr-4"> <h4>Home</h4></router-link>
    </div>
  </v-app-bar>
</template>

<style lang="scss" scoped>
h1,
h4 {
  color: white;
}
.fave-link:hover {
  border-bottom: 3px solid white;
}
</style>
