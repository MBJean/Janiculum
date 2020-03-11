<template>
  <div class="container">
    <div>
      <h1 class="title">
        Janiculum
      </h1>
      <h2>A Latin Learning Application</h2>
      </div>
    </div>
  </div>
</template>

<script>
import QUERIES from '~/graphql/queries'

export default {
  mounted() {
    this.foo();
  },
  methods:{
    foo(){
      this.$apollo
        .query({
          query: QUERIES.LEMMA_SEARCH,
          variables: { searchQuery: 'acervus' },
        })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          console.log('finished search')
        })
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
