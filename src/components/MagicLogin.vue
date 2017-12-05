<template>
  <div>
    Logging you in...
  </div>
</template>

<script>
  export default {
    beforeCreate() {
      this.$store.dispatch("logInMagicLink", {
        magic_link_key: this.$route.params.magic_link_key
      })
      this.$router.push({path: '/'})
    }
  }
</script>

<style></style>