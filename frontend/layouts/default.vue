<template>
  <div class="layout--main">
    <Nav />
    <nuxt />
    <SidebarBase />
    <Footer />
  </div>
</template>

<script>
import Footer from '~/components/Footer.vue'
import Nav from '~/components/Nav.vue'
import SidebarBase from '~/components/Sidebar/SidebarBase.vue'

export default {
  components: {
    Footer,
    Nav,
    SidebarBase
  }
}

</script>
