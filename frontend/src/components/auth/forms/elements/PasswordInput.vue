<template>
  <input
    class="passwordInput"
    v-model="password"
    type="password"
    placeholder="Password"
    name="password"
    minlength="6"
    maxlength="50"
    pattern=".*[0-9].*"
    required
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

.passwordInput {
  color: white;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  width: 260px;
  border-radius: 25px;
  color: $main-color;
  padding: 25px;
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
