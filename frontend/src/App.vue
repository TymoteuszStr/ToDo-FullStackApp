<template>
  <div>
    <router-view />
  </div>
</template>

<style lang="scss">
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
  touch-action: pan-x pan-y;
}

body {
  overscroll-behavior: contain;
  touch-action: pan-x pan-y;
  position: fixed;
  top: 0;
  left: 0;
  max-height: 100vh;
  max-width: 100vw;
}
</style>
