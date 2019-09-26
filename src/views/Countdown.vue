<template>
  <div id="countdown" align="center">
    <h1>Amount of time since {{since}}</h1><br>
      <div id="counter">
        <p>
          <b>{{days}}</b> Days<br>
          <b>{{hours}}</b> Hours<br>
          <b>{{minutes}}</b> Minutes<br>
          <b>{{seconds}}</b> Seconds<br>
        </p>
      </div>
      <v-container>
        <v-row>
          <v-col cols="4">
            <v-card class='pa-0 ma-0 pb-5' width="85%" color="indigo">
              <v-card-text>
                <v-date-picker v-on:change="makeAnotherDay" v-model="dateSelector" color="indigo" class="elevation-0"></v-date-picker>
              </v-card-text>
              <v-btn v-on:click="makeToday" color="white">Set to Now</v-btn>
            </v-card>
          </v-col>
          <v-col cols="1">
            <v-btn v-on:click="addItem" color="amber" fab dark large>
              <v-icon large>mdi-plus</v-icon>
            </v-btn>
          </v-col>
          <v-col>
            <v-divider vertical>
            </v-divider>
            <div v-for="item in items" :key="item.id" class="mt-5">
              <div>
                  <v-btn color="indigo" dark v-on:click="getItem(item.id)" class="mr-5">{{item.since}}</v-btn>
                  <v-btn color="grey" v-on:click="removeItem(item.id)">Delete</v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
axios.defaults.baseURL = `http://${window.location.hostname}:3001`

export default {

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
      this.since = moment(new Date()).format('MMMM d, YYYY, h:mm:ss a')
      this.dateSelector = moment(new Date()).format('YYYY-MM-DD')
    },
    makeAnotherDay: function(event) {
      this.from = Math.trunc((new Date(this.dateSelector)).getTime() / 1000)
      this.since = moment(new Date(this.dateSelector).getTime() + 60000 * 60 * 7).format('MMMM d, YYYY, h:mm:ss a')
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
p {
    font-size: 1.5em;
}

#countdown {
    padding: 35px;
}

.v-divider {
  float: left;
}
</style>
