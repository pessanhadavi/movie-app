<template>
  <div class="movie-card-wrapper d-flex align-center pa-3 ma-2">
    <div class="movie-card-img">
      <img :src="movie.poster" />
    </div>

    <div class="movie-card-content ml-10">
      <div class="movie-card-text">
        <h2 class="mb-3">{{ movie.title }}</h2>
        <p>{{ movie.year }}</p>
      </div>
      <v-rating
        empty-icon="mdi-star-outline"
        full-icon="mdi-star"
        half-icon="mdi-star-halfFull"
        hover
        length="5"
        size="16"
        v-model.number="rating"
        class="pa-2"
        :background-color="rated ? 'yellow' : 'blue'"
        :color="rated ? 'yellow' : 'blue'"
        @input="rateMovie"
      ></v-rating>
      <div class="rating-source text-center">
        <p v-if="rated" style="color: yellow">Your rating</p>
        <p v-else style="color: blue">IMDb rating</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    movie: Object,
  },
  data() {
    return {
      ratedMovies: [],
      rating: 0,
      rated: false,
    }
  },
  mounted() {
    this.getUserRatings()
  },
  methods: {
    async getUserRatings() {
      const userRatings = await this.$apollo.query({
        query: require("@/graphql/movie/getRatedMovies.gql"),
        variables: { id: this.$store.state.userId },
      })
      this.ratedMovies = userRatings.data.User[0].RATED_rel
      this.isMovieRated()
    },
    isMovieRated() {
      const ratedMovie = this.ratedMovies.filter(
        (movie) => movie.Movie.movieId === this.movie.movieId
      )
      if (ratedMovie.length) {
        this.rating = ratedMovie[0].rating
        this.rated = true
      } else {
        this.rating = this.movie.imdbRating / 2
      }
    },
    rateMovie() {
      this.$apollo.mutate({
        mutation: require("@/graphql/movie/addRatingToMovie.gql"),
        variables: {
          userId: this.$store.state.userId,
          movieId: this.movie.movieId,
          rating: this.rating,
          timestamp: Math.round(new Date().getTime() / 1000),
        },
      })
      this.rated = true
    },
  },
}
</script>
<style lang="scss" scoped>
.movie-card-wrapper {
  position: relative;
  height: 210px;
  width: 360px;
  &:hover {
    box-shadow: 0 0 8px rgba(238, 255, 0, 0.747);
  }
}

.movie-card-img {
  height: 190px;

  img {
    height: 100%;
  }
}

h2,
p {
  color: black;
}

.v-icon {
  padding: 0;
}

h2 {
  font-size: 16px;
  padding-top: 7px;
}

.movie-card-text p {
  font-size: 12px;
}

.rating-source p {
  font-size: 10px;
}
</style>
