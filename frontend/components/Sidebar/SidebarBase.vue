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
}

.sidebar__container {
  max-height: 100vh;
  overflow-y: scroll;
}

aside::after {
  background: linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 100%);
  bottom: 0;
  content: '';
  height: 2rem;
  left: 0;
  position: absolute;
  width: 100%;
  z-index: 1;
}
</style>
