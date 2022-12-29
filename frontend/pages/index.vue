
<template>
  <Main />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Electrolize&display=swap');
body {
  font-family: 'Electrolize', sans-serif;
  background: linear-gradient(
    110.18deg,
    #03000b 22.56%,
    #060012 61.28%,
    #020013 100%
  );
}
ul {
  position: absolute;
  padding: 0;
  margin: 0;
  display: flex;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
ul::-webkit-scrollbar {
  width: 0.5vh;
  height: 0;
}
ul::-webkit-scrollbar-track {
  background-color: #4900a700;
}

ul::-webkit-scrollbar-thumb {
  background-color: #4900a7;
}
/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>