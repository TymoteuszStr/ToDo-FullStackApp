<template>
  <form class="auth-form" @submit="handleSubmit">
    <TextInput v-model="login" />
    <PasswordInput v-model="password" />
    <ChangeFormText @click="$emit('showRegister')">Create an account</ChangeFormText>
    <SubmitBtn>Sign in</SubmitBtn>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { LOGIN } from "@/store/types/user.type";
import TextInput from "./elements/TextInput.vue";
import PasswordInput from "./elements/PasswordInput.vue";
import SubmitBtn from "./elements/SubmitBtn.vue";
import ChangeFormText from "./elements/ChangeFormText.vue";

export default defineComponent({
  name: "AuthModal",
  components: { TextInput, PasswordInput, SubmitBtn, ChangeFormText },
  setup() {
    const login = ref("");
    const password = ref("");
    const { dispatch } = useStore();

    function handleSubmit(e: any): void {
      e.preventDefault();
      dispatch(LOGIN, { login: login.value, password: password.value });
    }

    return { handleSubmit, login, password };
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
}
</style>
