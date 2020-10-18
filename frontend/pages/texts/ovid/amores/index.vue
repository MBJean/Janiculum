<template>
  <div class="layout__body">
    <div>
      <h1 class="margin__bottom--none">Amores</h1>
      <h2 class="margin__top--none">Publius Ovidius Naso</h2>
      <TextPresenter author="ovid" title="amores" :initial-query="{ book: '1' }">
        <template v-slot:default="slotProps">
          <p v-for="(poems, index) in [15, 19, 15]" class="margin__bottom--none">
            <button class="button button--secondary" @click="slotProps.getText({ book: index + 1 })">
              Book {{ index + 1 }}:
            </button>
            <button
              v-if="index == 0"
              class="button button--secondary"
              @click="slotProps.getText({ book: index + 1, poem: 'ep' })"
            >
              Prologue
            </button>
            <button
              v-for="poem in poems" :key="poem"
              class="button button--secondary"
              @click="slotProps.getText({ book: index + 1, poem })"
            >
              {{ poem }}
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
