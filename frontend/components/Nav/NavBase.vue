<template>
  <nav class="layout__nav" role="navigation" aria-label="main navigation">
    <a href="/">
      <img src="~/assets/images/logo.png">
    </a>
  </nav>
</template>

<style lang="scss" scoped="true">
nav {
  align-items: center;
  display: flex;
  justify-content: space-between;
}
ul {
  display: flex;
  * {
    margin: 0 1rem;
  }
}
img {
  height: $spacer-3;
  width: auto;
}
</style>
