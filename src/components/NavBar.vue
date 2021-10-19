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
      <router-link
        :to="{
          name: 'movie-list',
          params: { id: this.$store.state.userId },
        }"
        class="nav-link mr-4"
      >
        <h4>Home</h4></router-link
      >
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <a v-bind="attrs" v-on="on" class="nav-link">
            <h4>
              {{ $store.state.username.split(" ")[0]
              }}<v-icon>mdi-menu-down</v-icon>
            </h4>
          </a>
        </template>
        <v-list class="pa-0" width="90px">
          <a href="/">
            <v-list-item class="logout">
              <v-list-item-title class="text-center pa-0"
                >Logout</v-list-item-title
              >
            </v-list-item>
          </a>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<style lang="scss" scoped>
h1,
h4 {
  color: white;
}
.nav-link:hover {
  opacity: 0.6;
}
.logout {
  color: black;
  a {
    color: black;
  }
  &:hover {
    background-color: rgba(128, 128, 128, 0.11);
  }
}
</style>
