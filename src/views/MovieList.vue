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
          @click="getMovies(genre.name)"
        >
          {{ genre.name }}
        </v-tab>
        <v-tab-item v-for="genre in movieGenres" :key="genre.name">
          <v-row>
            <v-col cols="12" class="pb-0 mt-5 px-5">
              <div class="prev-next-btn d-flex justify-center">
                <v-btn
                  :disabled="moviePage === 1"
                  icon
                  @click="prevPage(genre.name)"
                  ><v-icon color="yellow darken-4"
                    >mdi-arrow-left-bold-circle</v-icon
                  ></v-btn
                >
                <v-btn
                  :disabled="movies.length < limit"
                  icon
                  @click="nextPage(genre.name)"
                  ><v-icon color="yellow darken-4"
                    >mdi-arrow-right-bold-circle</v-icon
                  ></v-btn
                >
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" class="d-flex flex-wrap justify-center">
              <MovieCard
                v-for="movie in movies"
                :key="movie.movieId"
                :movie="movie"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" class="pt-0 mb-5 px-5">
              <div class="prev-next-btn d-flex justify-center">
                <v-btn
                  :disabled="moviePage === 1"
                  icon
                  @click="prevPage(genre.name)"
                  ><v-icon color="yellow darken-4"
                    >mdi-arrow-left-bold-circle</v-icon
                  ></v-btn
                >
                <v-btn
                  :disabled="movies.length < limit"
                  icon
                  @click="nextPage(genre.name)"
                  ><v-icon color="yellow darken-4"
                    >mdi-arrow-right-bold-circle</v-icon
                  ></v-btn
                >
              </div>
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
      movieGenres: [],
      movieSearch: "",
      movies: [],
      limit: 15,
      offset: 0,
      moviePage: 1,
    }
  },
  created() {
    if (!this.movieGenres.length) this.fetchMovieGenres()
    this.fetchMoviesByGenres("Recommended", this.offset)
  },
  methods: {
    async fetchMovieGenres() {
      const genres = await this.$apollo.query({
        query: require("@/graphql/getMovieGenres.gql"),
      })
      genres.data.genres.unshift({ name: "Recommended" })
      this.movieGenres = genres.data.genres.slice(0, -1)
    },
    async fetchMoviesByGenres(genre, offset) {
      this.movies = []
      let movies
      if (genre === "Recommended") {
        movies = await this.$apollo.query({
          query: require("@/graphql/getRecommendedMovies.gql"),
          variables: {
            id: this.$store.state.userId,
            limit: this.limit,
            offset: offset,
          },
        })
        this.movies = movies.data.recommended[0].recommendedMovies
      } else {
        movies = await this.$apollo.query({
          query: require("@/graphql/getMoviesByGenres.gql"),
          variables: {
            genre: genre,
            limit: this.limit,
            offset: offset,
          },
        })
        this.movies = movies.data.movies[0].movies
      }
    },
    getMovies(genre) {
      this.moviePage = 1
      this.fetchMoviesByGenres(genre, this.offset)
    },
    prevPage(genre) {
      console.log(this.moviePage)
      if (this.moviePage > 1) {
        --this.moviePage
        const offset = this.limit * this.moviePage - this.limit
        this.fetchMoviesByGenres(genre, offset)
      }
    },
    nextPage(genre) {
      if (this.movies.length <= this.limit) {
        ++this.moviePage
        const offset = this.limit * (this.moviePage - 1)
        this.fetchMoviesByGenres(genre, offset)
      }
    },
  },
}
</script>
