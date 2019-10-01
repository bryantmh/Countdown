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
                  <v-text-field label="Username" prepend-icon="mdi-account" v-model="username" :rules="[rules.usernameRequired]"></v-text-field>
                  <v-text-field label="Email" prepend-icon="mdi-account" v-model="email" :rules="emailRules"></v-text-field>
                  <v-text-field label="Password" prepend-icon="mdi-lock" type="password" v-model="password" :rules="[rules.passwordRequired]"></v-text-field>
                  <v-text-field label="Re-Enter Password*" prepend-icon="mdi-lock" v-model="matchedPassword" type="password" :rules="[rules.passwordRequired, rules.passwordMatch]"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn @click="register" color="indigo" dark>Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4" class="pa-0">
            <v-alert type="error" v-if="registerError">
              {{registerError}}
            </v-alert>
          </v-col>
        </v-row>
    </v-content>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      matchedPassword: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      rules: {
        passwordRequired: v => !!v || 'Password is required',
        usernameRequired: v => !!v || 'Username is required',
        passwordMatch: (value) => value === this.password || 'The passwords you entered don\'t match'
      }
    }
  },
  computed: {
    registerError: function() {
      return this.$store.getters.registerError
    }
  },
  methods: {
    register: function() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('register', {
          username: this.username,
          email: this.email,
          password: this.password
        }).then(
          this.$router.push('/')
        )
      }
    }
  }
}
</script>
