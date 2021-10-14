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
        :value="movie.imdbRating / 2"
        class="pa-2"
        background-color="blue"
        color="blue"
      ></v-rating>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    movie: Object,
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
  font-size: 18px;
  padding-top: 7px;
}
</style>
