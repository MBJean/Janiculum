<template>
  <div class="layout--main">
    <NavBase />
    <nuxt />
    <SidebarBase />
    <FooterBase />
    <transition name="animation-toolkit">
      <ToolkitBase v-if="toolkitOpen" />
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import FooterBase from '~/components/Footer/FooterBase.vue'
import NavBase from '~/components/Nav/NavBase.vue'
import SidebarBase from '~/components/Sidebar/SidebarBase.vue'
import ToolkitBase from '~/components/Toolkit/ToolkitBase.vue'

export default {
  components: {
    FooterBase,
    NavBase,
    SidebarBase,
    ToolkitBase
  },
  computed: {
    ...mapState({
      toolkitOpen: state => state.base.toolkitOpen
    })
  },
  middleware: ['check-authenticated']
}
</script>

<style lang="scss" scoped="true">
.animation-toolkit-enter-active,
.animation-toolkit-leave-active {
  transition: transform 0.3s ease;
}
.animation-toolkit-enter {
  transform: translateX(100%);
}
.animation-toolkit-leave-to {
  transform: translateX(100%);
}
</style>
