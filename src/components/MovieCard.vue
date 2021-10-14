<template>
  <div class="movie-card-wrapper d-flex align-center pa-3 ma-2">
    <div class="movie-card-img">
      <img :src="movie.poster" />
    </div>

    <div class="movie-card-text ml-10">
      <h2 class="mb-3">{{ movie.title }}</h2>
      <p>{{ movie.year }}</p>
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
</style>
