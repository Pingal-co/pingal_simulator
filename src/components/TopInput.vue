<template>
  <div class="input-box">
    <form @submit.prevent="onSend" class="input-form">
      <input type="text" v-model="text" class="input-text" :placeholder="'Who would you like to connect to?'" ref="inputText" v-on:keyup.up="upSuggestionKey" v-on:keyup.down="downSuggestionkey" autofocus />
      <!-- <span style="display:none">{{focus}}</span> -->
    </form>
    <div class="arrow-container">
<!--       <div v-if="currentSuggestionIndex === -2" class="open-suggestions" @click="currentSuggestionIndex = -1">
        <div class="arrow arrow-up">↑</div>
      </div> -->
    </div>
  </div>
  
</template>

<script>
  export default {
    data() {
      return {
        text: ''
      }
    },
    methods: {
      onSend() {
        this.$router.push({path: 'pingal', query: { text: this.text }})
      }
    }
  }
</script>

<style lang="scss" scoped>
  $border-color: rgb(225, 225, 225);

  .input-box {
    height: 54px;
    border-top: 1px solid $border-color;
    display: flex;
    align-items: center;
    width: 600px;

    .input-form {
      display: flex;
      width: 100%;
      height: 80%;
      z-index: 2;

      .input-text {
        width: 100%;
        font-size: 16px;
        border: none;
        outline: none;
        padding: 0px 12px 0px 12px;
      }
    }
  }
</style>