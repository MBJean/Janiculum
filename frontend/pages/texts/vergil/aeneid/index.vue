<template>
  <div class="layout__body">
    <div>
      <h1 class="margin__bottom--none">Aeneid</h1>
      <h2 class="margin__top--none">Publius Vergilius Maro</h2>
      <TextPresenter author="vergil" title="aeneid" :initial-query="{ book: '1' }">
        <template v-slot:nav="slotProps">
          <p class="margin__bottom--none">
            Book:
            <button
              v-for="book in 12"
              class="button button--secondary"
              @click="slotProps.getText({ book })"
            >
              <span
                class="text-present__selector"
                :class="{'text-presenter__selector--active' : slotProps.lastQuery.book == book }"
              >
                {{ book }}
              </span>
            </button>
          </p>
        </template>
      </TextPresenter>
    </div>
  </div>
</template>

<script>
import TextPresenter from '~/components/TextPresenter/TextPresenter'

export default {
  components: {
    TextPresenter
  },
}
</script>
