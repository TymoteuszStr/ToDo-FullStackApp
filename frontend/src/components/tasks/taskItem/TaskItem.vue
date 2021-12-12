<template>
  <div class="task" ref="taskRef">
    <taskGeneral
      @arrowClick="toggleDetails"
      :title="task.title"
      @editProperty="editPropertyHandle"
    />
    <taskDetails
      v-show="detailToggler"
      :description="task.description"
      @editProperty="editPropertyHandle"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import Task from "@/models/taskModel";
import taskGeneral from "./taskGeneral.vue";
import taskDetails from "./taskDetails.vue";

export default defineComponent({
  name: "TaskItem",
  components: { taskGeneral, taskDetails },
  props: { task: { type: Object as PropType<Task>, require: true } },
  setup(props, { emit }) {
    const taskRef = ref();
    let detailToggler = ref(false);

    function toggleDetails() {
      taskRef.value.classList.toggle("showDetails");
      detailToggler.value = !detailToggler.value;
    }

    function editPropertyHandle(e: Event) {
      emit("editProperty", e);
    }

    return { toggleDetails, taskRef, detailToggler, editPropertyHandle };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
@import "@/styles/variables.scss";
.task {
  color: $font-color;
  position: relative;
  width: 80%;
  height: 50px;
  border-radius: 9px;
  margin: 9px 0px;
  background: rgba(255, 255, 255, 0.08);
  transition: height ease-out 0.3s;
}

.showDetails {
  height: 250px;
}
</style>
