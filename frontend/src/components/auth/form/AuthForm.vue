<template>
  <form class="auth-form" @submit="handleSubmit">
    <TextInput v-model="login" />
    <PasswordInput v-model="password" />
    <p class="new-account-text" @click="goToRegistration">Create an account</p>
    <button class="button" type="submit">Sign in</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { LOGIN } from "@/store/types/user.type";
import TextInput from "./TextInput.vue";
import PasswordInput from "./PasswordInput.vue";
import router from "@/router";

export default defineComponent({
  name: "AuthModal",
  components: { TextInput, PasswordInput },
  setup() {
    const login = ref("");
    const password = ref("");
    const { dispatch } = useStore();

    function handleSubmit(e: any): void {
      e.preventDefault();
      dispatch(LOGIN, { login: login.value, password: password.value });
    }

    function goToRegistration(): void {
      console.log("registration");
    }
    return { handleSubmit, login, password, goToRegistration };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.auth-form {
  display: flex;
  flex-direction: column;
  height: 450px;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 30px;

  .button {
    color: white;
    height: 50px;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    margin: 90px;
    width: 150px;
    border-radius: 25px;
    background-color: $main-color;
    color: $navy-blue;
    font-weight: 600;
    font-size: 15px;
  }

  .new-account-text {
    color: rgba(255, 255, 255, 0.5);
    margin: 10px;
    &:hover {
      cursor: pointer;
      transform: scale(1.06);
    }
  }
}
</style>
