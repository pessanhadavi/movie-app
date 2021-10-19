<template>
  <div class="movie-list my-10">
    <v-card>
      <v-toolbar flat color="yellow darken-4" dark height="80px">
        <h2>{{ movie.title }}</h2>
      </v-toolbar>
      <v-row>
        <v-col cols="12" class="d-flex pa-8">
          <div class="movie-img pa-3">
            <img :src="movie.poster" />
          </div>
          <div class="movie-text py-5 px-3 mt-5">
            <h2>Plot:</h2>
            <p>{{ movie.plot }}</p>
            <h2>Year:</h2>
            <p>{{ movie.year }}</p>
            <h2>Runtime:</h2>
            <p>{{ movie.runtime }}min</p>
            <h2>IMDb rating:</h2>
            <v-rating
              empty-icon="mdi-star-outline"
              full-icon="mdi-star"
              half-icon="mdi-star-half-full"
              length="5"
              readonly
              size="25"
              :value="movie.imdbRating / 2"
              color="blue"
              background-color="blue"
              class="my-2"
            ></v-rating>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <h2 class="mx-10">You may also like:</h2>
          <div class="similar-movies pa-10 pt-3 d-flex justify-space-around">
            <MovieCard
              v-for="film in movie.similarMovies"
              :key="film.movieId"
              :movie="film"
            />
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import MovieCard from "@/components/MovieCard.vue"

export default {
  props: {
    movieId: {
      type: Number,
      required: true,
    },
  },
  components: {
    MovieCard,
  },
  data() {
    return {
      movie: [],
    }
  },
  created() {
    this.fetchMovieById()
  },
  methods: {
    async fetchMovieById() {
      const movie = await this.$apollo.query({
        query: require("@/graphql/movie/getMovieById.gql"),
        variables: {
          id: this.movieId,
        },
      })
      this.movie = movie.data.Movie[0]
      console.log(this.movie.similarMovies)
    },
  },
}
</script>
]
<style lang="scss" scoped>
.movie-img {
  height: 400px;

  img {
    height: 100%;
    border: 4px solid #f57f17;
  }
}
</style>
