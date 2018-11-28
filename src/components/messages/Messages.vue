<template>
  <div>
      <!-- show single message -->
      <single-message></single-message>

      <!-- message form -->
      <message-form></message-form>
  </div>
</template>

<script>
  import SingleMessage from './SingleMessage'
  import MessageForm from './MessageForm'

  export default {
    name: 'messages',

    components: {SingleMessage, MessageForm}
  }
</script>
