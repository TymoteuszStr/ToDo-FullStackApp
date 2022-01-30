<!-- @format -->

<template>
  <div class="auth-modal bg-svg">
    <AuthForm v-if="showLogin" @showRegister="toggleForm(false)" />
    <RegisterForm v-else @showLogin="toggleForm(true)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import AuthForm from "./forms/AuthForm.vue";
import RegisterForm from "./forms/RegisterForm.vue";

export default defineComponent({
  name: "AuthModal",
  components: { AuthForm, RegisterForm },
  setup() {
    const emitter = require("tiny-emitter/instance");
    let showLogin = ref(true);
    function toggleForm(toggler: boolean): void {
      showLogin.value = toggler;
    }
    emitter.on("addNewToDo", function () {
      showLogin.value = true;
    });

    return { showLogin, toggleForm };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.auth-modal {
  position: fixed;
  bottom: 0px;
  left: 0;
  width: 100vw;
  height: 80%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 150px;
}
.bg-svg {
  background-image: url("../../assets/backgrounds/auth-bg.svg");
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
}
</style>
