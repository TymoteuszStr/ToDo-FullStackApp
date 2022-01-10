<template>
  <input class="input" type="text" placeholder="Login" name="login" v-model="text" />
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";

export default defineComponent({
  name: "TextInput",
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const text = computed({
      get: () => props.modelValue,
      set: (text: string) => emit("update:modelValue", text),
    });
    return { text };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

input {
  color: white;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  width: 260px;
  border-radius: 25px;
  color: $main-color;
  padding: 25px;
  letter-spacing: 1px;
  font-size: 14px;

  &::placeholder {
    color: $main-color;
  }
  &:focus {
    color: $navy-blue;
  }
  &:focus {
    background: rgba(255, 255, 255, 0.4);
    outline: none;
  }
}
</style>
