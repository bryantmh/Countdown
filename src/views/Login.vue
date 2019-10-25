<template>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4" class="pa-0">
            <v-card class="elevation-12">
              <v-toolbar color="indigo" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form">
                  <v-text-field label="Login" prepend-icon="mdi-account" v-model="email" :rules="emailRules"></v-text-field>
                  <v-text-field label="Password" prepend-icon="mdi-lock" type="password" v-model="password" :rules="passwordRules"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="$router.push('/register')" color="amber" dark>Don't Have an Account?</v-btn>
                <div class="flex-grow-1"></div>
                <v-btn @click="tryLogin" color="indigo" dark>Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4" class="pa-0">
            <v-alert type="error" v-if="loginError">
              {{loginError}}
            </v-alert>
          </v-col>
        </v-row>
    </v-content>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      email: '',
      password: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required'
      ]
    }
  },
  methods: {
    ...mapActions(['login', 'logout']),
    async tryLogin() {
      if (this.$refs.form.validate()) {
        await this.login({
          email: this.email,
          password: this.password
        }).then(
          this.email = '',
          this.password = '',
          this.$router.push('/')
        )
      }
    },
    async logout() {
      await this.logout()
    }
  },
  computed: {
    ...mapGetters(['loginError', 'user'])
  },
  watch: {
    'user.username'(newVal) {
      if (Object.entries(newVal).length !== 0) {
        this.$router.push('/')
      }
    }
  }
}
</script>
