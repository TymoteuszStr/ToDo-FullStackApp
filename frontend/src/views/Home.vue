<template>
  <div class="home">
    <TasksContainer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TasksContainer from "@/components/tasks/TasksContainer.vue";

export default defineComponent({
  name: "Home",
  components: { TasksContainer },
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
