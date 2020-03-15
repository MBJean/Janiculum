<template>
  <div class="layout--main">
    <NavBase />
    <nuxt />
    <SidebarBase />
    <FooterBase />
  </div>
</template>

<script>
import FooterBase from '~/components/Footer/FooterBase.vue'
import NavBase from '~/components/Nav/NavBase.vue'
import SidebarBase from '~/components/Sidebar/SidebarBase.vue'

export default {
  components: {
    FooterBase,
    NavBase,
    SidebarBase
  },
  middleware: ['check-authenticated']
}

</script>
