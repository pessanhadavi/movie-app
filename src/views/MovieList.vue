<template>
  <div class="movie-list">
    <h1>Movie-list {{ id }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
}
</script>
