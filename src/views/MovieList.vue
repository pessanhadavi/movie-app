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
        <v-tab
          v-for="genre in movieGenres"
          :key="genre.name"
          @click="fetchMoviesByGenres(genre.name)"
        >
          {{ genre.name }}
        </v-tab>
        <v-tab-item v-for="genre in movieGenres" :key="genre.name">
          <v-row>
            <v-col cols="12" class="d-flex flex-wrap justify-center">
              <MovieCard
                v-for="movie in movies"
                :key="movie.movieId"
                :movie="movie"
              />
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
import MovieCard from "@/components/MovieCard.vue"

export default {
  components: {
    MovieCard,
  },
  data() {
    return {
      movieGenres: null,
      movieSearch: "",
      movies: [],
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
    async fetchMoviesByGenres(genre) {
      this.movies = []
      const movies = await this.$apollo.query({
        query: require("@/graphql/getMoviesByGenres.gql"),
        variables: {
          genre: genre,
          limit: 15,
          offset: 0,
        },
      })
      this.movies = movies.data.movies[0].movies
      console.log(this.movies)
    },
  },
}
</script>
