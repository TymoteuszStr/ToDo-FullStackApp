<template>
  <form class="register-form" @submit="handleSubmit">
    <TextInput v-model="login" placeholder="Username or email address" />
    <PasswordInput v-model="password" placeholder="New password" />
    <PasswordInput v-model="password" placeholder="Reapeat your password" />
    <ChangeFormText @click="$emit('showLogin')">Back to login</ChangeFormText>
    <SubmitBtn>Sign up</SubmitBtn>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { REGISTER } from "@/store/types/user.type";
import TextInput from "./elements/TextInput.vue";
import PasswordInput from "./elements/PasswordInput.vue";
import SubmitBtn from "./elements/SubmitBtn.vue";
import ChangeFormText from "./elements/ChangeFormText.vue";

export default defineComponent({
  name: "RegisterForm",
  components: { TextInput, PasswordInput, SubmitBtn, ChangeFormText },
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
  height: 520px;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 30px;
}
</style>
