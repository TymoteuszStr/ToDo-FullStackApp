<template>
  <Tasks />
  <FloatButton />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Tasks from "../components/tasks/Tasks.vue";
import FloatButton from "../components/shared/FloatButton.vue";
export default defineComponent({
  name: "Home",
  components: { FloatButton, Tasks },
});
</script>

<style scoped lang="scss"></style>
