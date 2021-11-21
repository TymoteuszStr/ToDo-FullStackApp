<template>
  <div>{{ tasks }}</div>
</template>

<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Tasks',
    props: {
      tasks: {
        type: Array,
      },
    },
  });
</script>

<style lang="scss" scoped></style>
