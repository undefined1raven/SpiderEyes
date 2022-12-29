
<script>
export default {
  props: {
    color: "",
  },
};
</script>

<template>
  <div class="l dynamic-font-weight" :style="`color: ${color};`"></div>
</template>
<style scoped>
.l {
  -webkit-user-select: none;
  color: #fff;
  position: absolute;
  font-family: 'Electrolize', sans-serif;
  font-size: 1.1vw;
}
@media only screen and (max-width: 1368px) and (max-height: 768px) {
  .l {
    font-size: 3.7vw;
    font-weight: 300;
  }
}
@media only screen and (max-width: 1500px) {
  .l {
    font-size: 1.9vh;
  }
}
</style>