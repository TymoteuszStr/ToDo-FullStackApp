<template>
  <div class="details">
    <SeparatorLine>Szczegóły</SeparatorLine>
    <div class="text-container" @click.stop="descriptionClickHandle">
      <textarea
        v-if="editMode"
        class="details__input"
        type="text"
        v-model="inputText"
        ref="textInputRef"
        @blur="onBlurHandle"
      />
      <p v-else class="details__description">{{ inputText }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, PropType, ref } from "vue";
import SeparatorLine from "./SeparatorLine.vue";

export default defineComponent({
  name: "TaskDetail",
  components: { SeparatorLine },
  props: {
    description: {
      type: String as PropType<string>,
      default: "",
    },
  },
  setup(props, { emit }) {
    const textInputRef = ref();
    let inputText = ref(props.description as string);
    let editMode = ref(false);

    function descriptionClickHandle() {
      editMode.value = true;
      setTimeout(() => {
        textInputRef.value.focus();
      }, 0);
    }

    function turnOffEditMode() {
      editMode.value = false;
    }

    function onBlurHandle(e: Event) {
      if (inputText.value.length > 200) e.preventDefault();
      emit("editProperty", { description: inputText.value });
    }

    onMounted(() => {
      document.addEventListener("click", turnOffEditMode);
    });
    onUnmounted(() => {
      document.removeEventListener("click", turnOffEditMode);
    });

    return { inputText, descriptionClickHandle, editMode, textInputRef, onBlurHandle };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
@import "@/styles/mixins.scss";

.details {
  height: calc(180px - 2em);

  &__description {
    display: flex;
    color: rgba(255, 255, 255, 0.5);
    width: 100%;
    word-break: break-word;
    padding: 5px 15px;
  }
  &__input {
    @extend .details__description;
    background: transparent;
    color: $font-color;
    border: none;
    height: inherit;
    resize: none;

    &:focus {
      @include edit-focuse-input;
    }
  }

  .text-container {
    width: 100%;
    height: inherit;
  }
}
</style>
