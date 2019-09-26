<template>
  <div>
    <v-navigation-drawer v-model="drawer" app dark color="indigo">
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              Application
            </v-list-item-title>
            <v-list-item-subtitle>
              subtext
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-icon class="mr-3 mb-1">mdi-alarm</v-icon>
        <span>Countdown</span>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
        <v-toolbar-items right>
          <v-btn text>Link 1</v-btn>
          <v-btn text>Link 2</v-btn>
        </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      drawer: false
    }
  },
  computed: {
    user: function() {
      return this.$store.getters.user
    },
    loggedIn: function() {
      return this.$store.getters.loggedIn
    },
    loginError: function() {
      return this.$store.getters.loginError
    }
  },
  methods: {
    login: function() {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      }).then(user => {
        this.email = ''
        this.password = ''
      })
    },
    logout: function() {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style scoped>

</style>
