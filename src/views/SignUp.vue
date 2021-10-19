<template>
  <v-card width="400" class="mx-auto mt-16 pa-10 pb-5">
    <v-card-title>
      <h1 class="display-1">Sign Up</h1>
    </v-card-title>
    <v-form @submit.prevent="createUser">
      <v-card-text>
        <v-text-field
          label="Name"
          color="yellow darken-4"
          v-model="name"
          @click="createUser"
        />
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-btn color="yellow darken-4" class="yellow-btn mt-4" type="submit"
          >Sign up</v-btn
        >
      </v-card-actions>
    </v-form>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      name: "",
    }
  },
  methods: {
    async createUser() {
      if (this.name) {
        const user = await this.$apollo.mutate({
          mutation: require("@/graphql/user/createUser.gql"),
          variables: {
            name: this.name,
          },
        })
        await this.$store.dispatch("setUserId", user.data.CreateUser.userId)
        await this.$store.dispatch("setUsername", user.data.CreateUser.name)
        this.$router.push({
          name: "movie-list",
          params: { id: user.data.CreateUser.userId },
        })
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
