<template>
  <input
    class="form__element form__input"
    type="password"
    placeholder="password"
    v-model="password"
    name="password"
  />
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";

export default defineComponent({
  name: "PasswordInput",
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const password = computed({
      get: () => props.modelValue,
      set: (password: string) => emit("update:modelValue", password),
    });
    return { password };
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
  font-size: 16px;

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
