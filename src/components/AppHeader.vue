<template>
  <div>
    <v-navigation-drawer v-model="drawer" app dark color="indigo">
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              BryantHinton.com
            </v-list-item-title>
            <v-list-item-subtitle>
              Countdown
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </v-list>
      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :href="item.route">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
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
      drawer: false,
      items: [
        { title: 'Home', icon: 'mdi-view-dashboard', route: '/' },
        { title: 'Astronomy', icon: 'mdi-weather-sunset', route: '/astronomy' },
        { title: 'Countdown', icon: 'mdi-alarm', route: '/countdown' },
        { title: 'Photos', icon: 'mdi-image', route: '/photography' },
        { title: 'Portfolio', icon: 'mdi-folder-multiple', route: '/portfolio' },
        { title: 'Weather', icon: 'mdi-weather-cloudy', route: '/weather' },
        { title: 'XKCD', icon: 'mdi-thought-bubble', route: '/xkcd' }
      ]
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
