<template>
  <div id="countdown" align="center" class="mt-8">
    <h1 class="display-1">Amount of time since {{since}}</h1><br>
      <div id="counter">
        <p class="headline">
          <b>{{days}}</b> Days<br>
          <b>{{hours}}</b> Hours<br>
          <b>{{minutes}}</b> Minutes<br>
          <b>{{seconds}}</b> {{seconds === 1 ? "Second" : "Seconds"}}<br>
        </p>
      </div>
      <v-container>
        <v-row justify="center" align="center">
          <v-col md="6" sm="12">
            <v-card class='pa-0 ma-0 pb-5' width="350" color="indigo">
              <v-card-text>
                <v-date-picker v-on:change="makeAnotherDay" v-model="dateSelector" color="indigo" class="elevation-0"></v-date-picker>
              </v-card-text>
              <v-btn v-on:click="makeToday" color="white" class="mr-12">Set to Now</v-btn>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn v-on:click="addItem" color="amber" fab dark large v-on="on">
                    <v-icon large>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <span>Add the current date to the server</span>
              </v-tooltip>
            </v-card>
          </v-col>
          <v-col md="6" sm="12">
            <draggable :list="items" class="list-group">
              <v-list v-for="item in items" :key="item.id" class="pa-0 maxWidth" elevation="1">
                <v-list-item link class="pa-3 list-group-item">
                  <v-list-item-content v-on:click="getItem(item.id)">
                    {{item.since}}
                  </v-list-item-content>
                  <v-btn icon color="grey" x-large dark v-on:click="removeItem(item.id)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item>
              </v-list>
            </draggable>
          </v-col>
        </v-row>
      </v-container>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import draggable from 'vuedraggable'
axios.defaults.baseURL = `http://${window.location.hostname}:3001`

export default {
  components: {
    draggable
  },
  mounted() {
    window.setInterval(() => {
      this.now = Math.trunc((new Date()).getTime() / 1000)
    }, 1000)
    this.getItems()
  },
  data() {
    return {
      now: Math.trunc((new Date()).getTime() / 1000),
      since: 'January 1st, 1970, 12:00:00 AM',
      from: 0,
      dateSelector: '1970-01-01',
      items: [],
      user: { id: 1 } // this.$store.getters.user
    }
  },
  computed: {
    seconds() {
      return (this.now - this.from) % 60
    },

    minutes() {
      return Math.trunc((this.now - this.from) / 60) % 60
    },

    hours() {
      return Math.trunc((this.now - this.from) / 60 / 60) % 24
    },

    days() {
      return Math.trunc((this.now - this.from) / 60 / 60 / 24)
    }
  },
  methods: {
    makeToday: function(event) {
      this.from = Math.trunc((new Date()).getTime() / 1000)
      this.since = moment(new Date()).format('MMMM Do, YYYY, h:mm:ss A')
      this.dateSelector = moment(new Date()).format('YYYY-MM-DD')
    },
    makeAnotherDay: function(event) {
      this.from = Math.trunc((new Date(this.dateSelector)).getTime() / 1000)
      this.since = moment(this.dateSelector).format('MMMM Do, YYYY, h:mm:ss A')
    },
    getItem: function(id) {
      axios.get(`/api/users/${this.user.id}/items/${id}`).then(response => {
        this.since = response.data.item[0].since
        this.from = response.data.item[0].from
        return true
      }).catch(err => {
        console.log(`Error: ${err}`)
      })
    },
    getItems: function() {
      axios.get(`/api/users/${this.user.id}/items/`).then(response => {
        this.items = response.data.items
        return true
      }).catch(err => {
        console.log(`Error: ${err}`)
      })
    },
    addItem: function() {
      axios.post(`/api/users/${this.user.id}/items/`, {
        since: this.since,
        from: this.from
      }).then(response => {
        this.getItems()
        return true
      }).catch(err => {
        console.log(`Error: ${err}`)
      })
    },
    removeItem: function(id) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].id === id) {
          this.items.splice(i, 1)
        }
      }
      axios.delete(`/api/items/${id}`).then(response => {
        return true
      }).catch(err => {
        console.log(`Error: ${err}`)
      })
    }
  }
}
</script>

<style scoped>

.maxWidth {
  max-width: 600px;
}

</style>
