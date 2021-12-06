<!-- @format -->

<template>
	<div class="separator">
		<div class="separator--line"></div>
		<div class="separator__text"><slot></slot></div>
		<div class="separator--line"></div>
	</div>
</template>

<style lang="scss" scoped>
	.separator {
		display: flex;
		width: 100%;
		align-items: center;
		padding: 0px 15px 15px;
		&__text {
			font-size: 12px;
			color: rgba(255, 255, 255, 0.5);
			letter-spacing: 1px;
		}
		&--line {
			background-color: hsla(0, 0%, 100%, 0.2);
			width: 100%;
			height: 1px;
		}
	}
</style>
