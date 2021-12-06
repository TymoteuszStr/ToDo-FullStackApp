<!-- @format -->

<template>
	<div class="general">
		<div class="general__text-container" @click.stop="titleClickHandle">
			<input
				v-if="editMode"
				class="general__text-container__input"
				type="text"
				v-model="inputText"
				ref="textInput"
				@keydown="inputValidation"
			/>
			<p v-else class="general__text-container__title">{{ title }}</p>
		</div>
		<div class="general__arrow" ref="arrowRef" @click.stop="arrowClickHandle">
			<inline-svg class="general__arrow--svg" :src="require(`@/${arrowDown}`)" />
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent, ref, PropType } from "vue"
	import InlineSvg from "vue-inline-svg"

	export default defineComponent({
		name: "TaskGeneral",
		components: { InlineSvg },
		props: {
			title: {
				type: String as PropType<string>,
				default: "",
			},
		},
		setup(props, { emit }) {
			let inputText = ref(props.title as string)
			let editMode = ref(false)
			const arrowRef = ref()
			const textInput = ref()
			const arrowDown = `assets/icons/arrow-down.svg`
			const arrowClickHandle = () => {
				arrowRef.value.classList.toggle("rotateArrow")
				emit("arrowClick")
			}
			const titleClickHandle = () => {
				editMode.value = true
				setTimeout(() => {
					textInput.value.focus()
				}, 0)
			}
			document.addEventListener("click", () => {
				editMode.value = false
				//add saveing task
			})
			const inputValidation = (e: Event) => {
				if (inputText.value.length > 30) e.preventDefault()
			}
			return { arrowDown, arrowClickHandle, arrowRef, inputText, titleClickHandle, editMode, textInput, inputValidation }
		},
	})
</script>

<style lang="scss" scoped>
	@import "@/styles/mixins.scss";
	@import "@/styles/variables.scss";

	.general {
		@include flex-center;
		width: 100%;
		align-content: stretch;
		height: 50px;
		&__text-container {
			@include flex-center;
			width: 100%;
			height: inherit;

			&__title {
				display: flex;
				align-items: center;
				text-align: left;
				text-overflow: ellipsis;
				overflow: hidden;
				word-break: break-word;
				width: 100%;
				padding: 0 0 0 15px;
				font-size: 16px;
				height: inherit;
			}
			&__input {
				@extend .general__text-container__title;
				background: transparent;
				color: $font-color;
				border: none;
				height: inherit;
			}
		}
		&__arrow {
			@include flex-center;
			width: 50px;
			height: inherit;
			transition: transform 0.3s;
			&--svg {
				@include flex-center;
				width: 15px;
				height: 15px;
			}
		}
	}

	.rotateArrow {
		transform: rotate(-180deg);
	}
</style>
