<template>
  <form class="register-form" @submit="handleSubmit">
    <TextInput v-model="login" placeholder="Username or email address" />
    <PasswordInput v-model="password" placeholder="New password" />
    <PasswordInput v-model="password" placeholder="Reapead new password" />
    <p class="back-to-login-text" @click="$emit('showLogin')">Back to login</p>
    <button class="button" type="submit">Sign up</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { REGISTER } from "@/store/types/user.type";
import TextInput from "./TextInput.vue";
import PasswordInput from "./PasswordInput.vue";

export default defineComponent({
  name: "RegisterForm",
  components: { TextInput, PasswordInput },
  setup() {
    const login = ref("");
    const password = ref("");
    const { dispatch } = useStore();

    function handleSubmit(e: any): void {
      e.preventDefault();
      dispatch(REGISTER, { login: login.value, password: password.value });
    }

    return { handleSubmit, login, password };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.register-form {
  display: flex;
  flex-direction: column;
  height: 490px;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 30px;

  .button {
    color: white;
    height: 50px;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    margin-bottom: 130px;
    margin-top: 30px;
    width: 150px;
    border-radius: 25px;
    background-color: $main-color;
    color: $navy-blue;
    font-weight: 600;
    font-size: 15px;
  }

  .back-to-login-text {
    color: rgba(255, 255, 255, 0.5);
    margin: 10px;
    &:hover {
      cursor: pointer;
      transform: scale(1.06);
    }
  }
}
</style>
