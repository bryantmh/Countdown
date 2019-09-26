<template>
  <v-footer dark height=60 color="indigo">
    <div class="flex-grow-1"></div>
    <div>&copy; {{year}} JK, not really</div>
    <div class="flex-grow-1"></div>
    <a href="https://github.com/bryantmh/Website/tree/master/countdown">
      <v-icon large>mdi-git</v-icon>
    </a>
  </v-footer>
</template>

<script>
export default {
  name: 'AppHeader',
  computed: {
    year: function() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
  }
</style>
