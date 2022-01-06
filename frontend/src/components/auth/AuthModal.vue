<template>
  <div class="auth-modal"><AuthForm /></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AuthForm from "./AuthForm.vue";

export default defineComponent({
  name: "AuthModal",
  components: { AuthForm },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.auth-modal {
  position: fixed;
  bottom: -1px;
  left: -50%;
  width: 200%;
  height: 80%;
  border-radius: 50% 50% 0 0;
  background: $navy-blue;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
</style>
