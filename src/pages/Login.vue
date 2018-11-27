<template>
  <div>
    <div class="jumbotron bg-primary text-white text-center">
      <h2 class="lead display-3">#Slack Emulator#</h2>
      <p>Realtime communication</p>
    </div>

    <!-- Show loading state -->
    <div class="alert alert-info" v-if="loading">Processing ... </div>

    <!-- Show errors -->
    <div class="alert alert-danger" v-if="hasErrors">
      <div v-for="error in errors">{{ error }}</div>
    </div>
    <div class="container-fluid">
      <div class="row mt-5">
        <div class="col text-center">
          <button @click="loginWithGoogle" class="btn btn-outline-danger btn-lg">Login with Google</button>
        </div>
      </div>

      <div class="row mt-5">
        <div class="col text-center">
          <button @click="loginWithTwitter" class="btn btn-outline-info btn-lg">Login with Twitter</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import auth from 'firebase/auth'
  import database from 'firebase/database'

  export default {
      name: 'login',

      data() {
          return {
              errors: [],
              loading: false,
              usersRef: firebase.database().ref('users') // if users doesn't exist in DB it will create a new reference.
          }
      },

      computed: {
         hasErrors() {
           return this.errors.length > 0
         }
      },

      methods: {
          loginWithGoogle() {

              //loading set to true
              this.loading = true

              //clear old errors
              this.errors = []

              firebase.auth().signInWithPopup(
                  new firebase.auth.GoogleAuthProvider()
              ).then((response) => {

                  //dispatch setUser action to store the authenticated user.
                  this.$store.dispatch('setUser', response.user);

                  //pass user to save in db if login successful
                  this.saveUserToUsersRef(response.user);

                  //redirect the user to the home page '/'
                  this.$router.push('/');
              })
                .catch( error => {
                    this.errors.push(error.message)
                    this.loading = false
                });
          },

          loginWithTwitter() {

            //loading set to true
            this.loading = true

            //clear old errors
            this.errors = []

            firebase.auth().signInWithPopup(
              new firebase.auth.TwitterAuthProvider()
            ).then((response) => {

              //dispatch setUser action to store the authenticated user.
              this.$store.dispatch('setUser', response.user);

              //pass user to save in db if login successful
              this.saveUserToUsersRef(response.user);

              //redirect the user to the home page '/'
              this.$router.push('/');
            })
              .catch( error => {
                this.errors.push(error.message)

                //set loading to false
                this.loading = false
              });
          },
          // save user in database
          saveUserToUsersRef(user) {
            //uid is what we get from response.
            return this.usersRef.child(user.uid).set({
              name: user.displayName,
              avatar: user.photoURL
            });
          }
      }

  }

</script>

<style>

</style>
