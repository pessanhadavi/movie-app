<template>
  <div class="movie-list my-10">
    <v-card>
      <v-toolbar flat color="yellow darken-4" dark>
        <v-toolbar-title
          >{{ $store.state.username.split(" ")[0] }}'s
          movieboard</v-toolbar-title
        >
      </v-toolbar>
      <v-tabs
        background-color="yellow darken-4"
        dark
        color="white"
        next-icon="mdi-arrow-right-bold-box-outline"
        prev-icon="mdi-arrow-left-bold-box-outline"
        show-arrows
      >
        <v-tab v-for="genre in movieGenres" :key="genre.name">
          {{ genre.name }}
        </v-tab>
        <v-tab-item v-for="genre in movieGenres" :key="genre.name">
          <v-card flat>
            <v-card-text>
              <p>
                {{ genre.name }}
              </p>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movieGenres: null,
    }
  },
  created() {
    this.fetchMovieGenres()
  },
  methods: {
    async fetchMovieGenres() {
      const genres = await this.$apollo.query({
        query: require("@/graphql/getMovieGenres.gql"),
      })
      genres.data.genres.unshift({ name: "Recommended" })
      this.movieGenres = genres.data.genres.slice(0, -1)
    },
  },
}
</script>
