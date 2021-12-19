<template>
  <button class="float-button" @click="addNewToDo">+</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FloatButton",
  props: {
    position: {},
  },
  setup() {
    const emitter = require("tiny-emitter/instance");

    function addNewToDo() {
      emitter.emit("addNewToDo");
    }
    return { addNewToDo };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
@import "@/styles/variables.scss";

.float-button {
  @include flex-center;
  @include disable-select;
  position: fixed;
  bottom: 0px;
  left: 50%;

  min-width: 50px;
  min-height: 50px;
  border-radius: 50%;
  transform: translateX(-50%);
  color: whitesmoke;
  font-size: 30px;
  font-weight: 700;
  border: none;
  background: $main-color;
  color: #081019;

  &:active {
    box-shadow: none;
  }
}
</style>
