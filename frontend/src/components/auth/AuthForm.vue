<template>
  <form class="form" @submit="handleSubmit">
    <label id="loginLabel" for="login">Login</label>
    <input
      class="form__element form__input"
      type="text"
      placeholder="login"
      name="login"
      v-model="login"
    />
    <label id="passwordLabel" for="password">Password</label>
    <input
      class="form__element form__input"
      type="password"
      placeholder="password"
      v-model="password"
      name="password"
    />
    <button class="form__element form__button" type="submit">LOGIN</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "AuthModal",
  components: {},
  setup() {
    const login = ref("");
    const password = ref("");
    function handleSubmit(e: any): void {
      e.preventDefault();
      console.log(login, password);
    }
    return { handleSubmit, login, password };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.form {
  display: flex;
  flex-direction: column;
  height: 340px;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 30px;

  label {
    visibility: hidden;
    color: $main-color;
    text-align: start;
    width: 100%;
    margin-left: 50px;
  }
  &__element {
    color: white;
    height: 50px;
    background: rgba(255, 255, 255, 0.2);
    border: none;
  }
  &__button {
    margin: 30px;
    width: 150px;
    border-radius: 25px;
    background-color: $main-color;
    color: $navy-blue;
    font-weight: 600;
    font-size: 15px;
  }

  &__input {
    width: 300px;
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
}
</style>
