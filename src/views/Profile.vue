<template>
  <v-card width="400" class="mx-auto mt-16 pa-10 pb-5">
    <v-card-title>
      <h1 class="display-1">Your profile</h1>
    </v-card-title>
    <v-form @submit.prevent="updateUser">
      <v-card-text>
        <v-text-field
          label="Id"
          color="yellow darken-4"
          :value="$store.state.userId"
          disabled
        />
        <v-text-field label="Name" color="yellow darken-4" v-model="userName" />
      </v-card-text>
      <v-card-actions class="d-flex justify-space-between">
        <v-btn color="yellow darken-4" class="dark-btn" type="submit"
          >Update</v-btn
        >
        <v-btn color="red darken-4" class="dark-btn" @click="deleteUser"
          >Delete Profile</v-btn
        >
      </v-card-actions>
    </v-form>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      userName: this.$store.state.username,
    }
  },
  methods: {
    async updateUser() {
      await this.$apollo.mutate({
        mutation: require("@/graphql/user/updateUser.gql"),
        variables: {
          id: this.$store.state.userId,
          name: this.userName,
        },
      })
      await this.$store.dispatch("setUsername", this.userName)
    },
    async deleteUser() {
      await this.$apollo.mutate({
        mutation: require("@/graphql/user/deleteUser.gql"),
        variables: {
          id: this.$store.state.userId,
        },
      })
      this.$store.dispatch("setUserId", 0)
      this.$store.dispatch("setUsername", "")
      this.$router.push({ name: "login" })
    },
  },
}
</script>

<style lang="scss" scoped>
.dark-btn {
  color: white;
}
</style>
