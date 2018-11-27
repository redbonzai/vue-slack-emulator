<template>
    <div>
      <h2 class="text-light">#SLACK EMULATOR#</h2>
      <hr style="border: 1px solid #747475eb;"/>
      <span>
          <img class="rounded-circle mt-2" height="30" :src="currentUser.photoURL"/>
          <span class="text-light">{{ currentUser.displayName}}</span>
      </span>
      <hr style="border: 1px solid #747475eb;"/>
      <button @click="logout" class="btn btn-outline-warning">Logout</button>

      <channels></channels>
    </div>

</template>

<script>
  import auth from 'firebase/auth'
  import {mapGetters} from 'vuex'
  import Channels from './Channels'

  export default {
    name: 'sidebar',

    components: {Channels},

    computed: {
      ...mapGetters(['currentUser'])
    },

    methods: {
      logout() {
        firebase.auth().signOut();
        this.$store.dispatch('setUser', null);
        this.$router.push('/login');
      }
    }
  }
</script>

<style scoped>

</style>
