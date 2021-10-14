<template>
  <div class="movie-list my-10">
    <v-card>
      <v-toolbar flat color="yellow darken-4" dark height="80px">
        <v-row class="">
          <v-col lg="7" md="12" class="pa-0 ml-3">
            <v-text-field
              label="Search for movie but Donnie Darko, pls"
              color="white"
              v-model="movieSearch"
              :append-outer-icon="'mdi-magnify'"
              :append-icon="movieSearch ? 'mdi-close' : ''"
              class="pt-3"
            />
          </v-col>
        </v-row>
      </v-toolbar>
      <v-tabs
        background-color="yellow darken-4"
        dark
        color="white"
        next-icon="mdi-arrow-right-bold-box-outline"
        prev-icon="mdi-arrow-left-bold-box-outline"
        show-arrows
        class="mt-0"
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
      movieSearch: "",
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
    // async fetchMoviesByGenres() {
    //   const movies = await this.$apollo.query({
    //     query: require("@/graphql/getMoviesByGenres.gql"),
    //     variables: {
    //       genre:
    //     }
    //   })
    // },
  },
}
</script>
