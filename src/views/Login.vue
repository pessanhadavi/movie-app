<template>
  <v-card width="400" class="mx-auto mt-16 pa-10 pb-5">
    <v-card-title>
      <h1 class="display-1">Login</h1>
    </v-card-title>
    <v-card-text>
      <v-text-field
        label="Id"
        prepend-icon="mdi-account-circle"
        color="yellow darken-4"
        v-model.number="userId"
      />
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="d-flex justify-center">
      <v-btn color="yellow darken-4" class="yellow-btn mt-4" @click="login"
        >Login</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      userId: null,
    }
  },
  methods: {
    async login() {
      if (this.userId) {
        await this.$store.dispatch("setUserId", this.userId)
        const user = await this.$apollo.query({
          query: require("@/graphql/currentUser.gql"),
          variables: {
            id: this.userId,
          },
        })
        await this.$store.dispatch("setUsername", user.data.me[0].name)
        this.$router.push({ name: "movie-list", params: { id: this.userId } })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.yellow-btn {
  color: white;
}
</style>
