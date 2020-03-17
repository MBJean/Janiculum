<template>
  <aside class="layout__sidebar">
    <div class="sidebar__container">
      <a class="twitter-timeline" href="https://twitter.com/Janiculum4/lists/classical-twitter?ref_src=twsrc%5Etfw">A Twitter List by Janiculum4</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
    </div>
  </aside>
</template>

<style lang="scss" scoped="true">
aside {
  max-height: 100vh;
  overflow-y: hidden;
  position: relative;
  background-color: $color-primary-1-4;
  padding: $spacer-1;
}

.sidebar__container {
  max-height: 100vh;
  overflow-y: scroll;
}


</style>
