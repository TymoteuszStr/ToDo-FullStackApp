<template>
  <div>Home</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { GET_TASKS } from "@/store/types/task.type";

export default defineComponent({
  name: "Home",
  setup() {
    const store = useStore();
    store.dispatch(GET_TASKS);
  },
});
</script>

<style scoped lang="scss"></style>
