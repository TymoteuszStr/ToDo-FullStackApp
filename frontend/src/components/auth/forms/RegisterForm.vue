<template>
  <form class="register-form" @submit="handleSubmit">
    <TextInput v-model="login" placeholder="Username or email address" />
    <PasswordInput
      v-model="password[0]"
      placeholder="New password"
      :class="{ invalid: formError }"
    />
    <PasswordInput
      v-model="password[1]"
      placeholder="Repeat your password"
      :class="{ invalid: formError }"
    />
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
    const password = ref(["", ""]);
    const { dispatch } = useStore();
    let formError = ref(false);

    function handleSubmit(e: any): void {
      e.preventDefault();
      if (password.value[0] === password.value[1])
        dispatch(REGISTER, { login: login.value, password: password.value[0] });
      else {
        formError.value = true;
        setTimeout(() => {
          formError.value = false;
        }, 2000);
      }
    }

    return { handleSubmit, login, password, formError };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
@import "@/styles/animations.scss";

.register-form {
  display: flex;
  flex-direction: column;
  height: 520px;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 30px;
}

.invalid {
  animation-name: shakeX;
  animation-duration: 0.85s;
  border: 1px solid rgb(212, 32, 32);
}
</style>
