<!-- @format -->

<template>
	<div class="app-view">
		<h1 class="logo">MyToDoes</h1>
		<AuthModal />
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue"
	import AuthModal from "@/components/auth/AuthModal.vue"

	export default defineComponent({
		name: "Home",
		components: { AuthModal },
	})
</script>

<style scoped lang="scss">
	@import "@/styles/variables.scss";
	.app-view {
		background: #c9dddb;
	}
	.logo {
		width: 100%;
		text-align: center;
		font-family: "Share Tech Mono", monospace;
		padding: 100px 0px;
	}
</style>
