<template>
  <div class="app-view">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "@/styles/variables.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  scroll-behavior: smooth;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
}

body {
  position: fixed;
  top: 0;
  left: 0;
  max-height: 100vh;
  max-width: 100vw;
}
.app-view {
  position: absolute;
  background: $bg-color-dark;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
