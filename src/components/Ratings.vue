<template>
  <v-rating
    empty-icon="mdi-star-outline"
    full-icon="mdi-star"
    half-icon="mdi-star-halfFull"
    hover
    length="5"
    size="16"
    :value="rating"
    class="pa-2"
    background-color="blue"
    color="blue"
  ></v-rating>
</template>
<script>
export default {
  props: {
    rating: Number,
  },
}
</script>
