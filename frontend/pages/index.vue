<template>
  <div class="layout__body">
    <div>
      <h1>Janiculum: <br/> A Latin Learning Application</h1>
      <p>Welcome to Janiculum! This website is a digital playground for its creator to explore new web technologies, with the ultimate goal of aiding the student of Latin in their language learning journey.</p>
      <h2>Feature proposals</h2>
      <p>Access the current state of the proposed features by clicking on the <strong><span class="hide">Toggle</span> Toolkit</strong> button above.</p>
      <br/>
      <ul>
        <li class="card card--green">
          <h3>Latin dictionary</h3>
          <p>Search <i>Lewis & Short's Latin Dictionary</i>.</p>
          <span class="status">Completed</span>
        </li>
        <li class="card card--purple">
          <h3>Vocabulary lists</h3>
          <p>Create and share custom vocabulary lists composed of entries from <i>Lewis & Short's Latin Dictionary</i>.</p>
          <span class="status">Coming soon</span>
        </li>
        <li class="card card--purple">
          <h3>Notes</h3>
          <p>Create notes keyed to vocabulary and Latin texts.</p>
          <span class="status">Coming soon</span>
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
.hide {
  display: none;
  @include min-breakpoint(tablet) {
    display: inline;
  }
}
.card {
  position: relative;
}
.status {
  color: $color-primary-1-1;
  font-size: $font-size-5;
  position: absolute;
  right: 0.25rem;
  top: 0.25rem;
}
</style>
