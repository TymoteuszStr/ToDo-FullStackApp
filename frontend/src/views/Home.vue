<template>
  <div class="home">
    <TasksContainer />
    <FloatButton />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TasksContainer from "../components/tasks/TasksContainer.vue";
import FloatButton from "../components/shared/FloatButton.vue";
export default defineComponent({
  name: "Home",
  components: { FloatButton, TasksContainer },
});
</script>

<style scoped lang="scss">
@import "@/styles/variables.scss";

.home {
  position: absolute;
  background: $bg-color-dark;
  width: 100vw;
  height: 100vh;
}
</style>
