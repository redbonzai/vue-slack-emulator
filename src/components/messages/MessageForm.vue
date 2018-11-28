<template>
  <div>
    <div class="messageForm">
        <form>
            <div class="input-group mb-3">
                <input
                    v-model.trim="message"
                    name="message"
                    id="message"
                    placeholder="write a message"
                    class="form-control mt-3" autofocus>

                <div class="input-group-append">
                    <button @click="sendMessage" class="btn btn-primary mt-3" type="button"> &nbsp;Send</button>
                </div>

                <div class="input-group-append">
                    <button class="btn btn-warning mt-3" type="button">Upload</button>
                </div>
            </div>
        </form>
    </div>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
      name: 'message-form',
        data() {
          return {
              message: '',
              errors: []
          }
        },

        computed: {
            ...mapGetters(['currentChannel', 'currentUser'])
        },

        methods: {
            sendMessage() {

                //construct a new message object.
                let newMessage = {
                    content: this.message,
                    timestamp: firebase.database.ServerValue.TIMESTAMP,
                    user: {
                        name: this.currentUser.displayName,
                        avatar: this.currentUser.photoURL,
                        id: this.currentUser.uid
                    }
                };

                if (this.currentChannel !== null) {
                    if (this.message.length > 0) {
                        this.$parent.messagesRef.child(this.currentChannel.id).push().set(newMessage)
                            .then( () => {
                                //
                            })
                            .catch( (error) => {
                                this.errors.push(error.message);
                            });
                        this.message = '';
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .messageForm {
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 100;
        color: white;
        width: 61%;
        text-align: center;
        margin-bottom: -16px;
        margin-left: 33.3%;
    }

    .input-group {
        width: 100%;
    }

    input, button {
        height: 50px;
    }
</style>
