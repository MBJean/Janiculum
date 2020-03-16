<template>
  <div class="layout__body">
    <div>
      <h1>Janiculum: <br/> A Latin Learning Application</h1>
      <p>Welcome to Janiculum! This website is a digital playground for its creator to explore new web technologies, with the ultimate goal of aiding the student of Latin in their language learning journey.</p>
      <h2>Feature proposals</h2>
      <ul>
        <li class="card card--red">
          <h3>Latin dictionary</h3>
          <p>Search <i>Lewis & Short's Latin Dictionary</i>.</p>
        </li>
        <li class="card card--green">
          <h3>Vocabulary lists</h3>
          <p>Create and share custom vocabulary lists composed of entries from <i>Lewis & Short's Latin Dictionary</i>.</p>
        </li>
        <li class="card card--blue">
          <h3>Notes</h3>
          <p>Create notes keyed to vocabulary and Latin texts.</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped="true">
ul {
  > *:not(:last-child) {
    margin-bottom: $spacer-1;
  }
  @include min-breakpoint(tablet) {
    display: flex;
    > * {
      flex: 1;
    }
    > *:not(:last-child) {
      margin-bottom: 0;
      margin-right: $spacer-1;
    }
  }
}
</style>
