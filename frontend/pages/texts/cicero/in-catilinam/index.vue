<template>
  <div class="layout__body">
    <div>
      <h1 class="margin__bottom--none">In Catilinam</h1>
      <h2 class="margin__top--none">Marcus Tullius Cicero</h2>
      <TextPresenter author="cicero" title="in-catilinam" :initial-query="{ speech: '1' }">

        <template v-slot:nav="slotProps">
          <div v-for="(sections, index) in [33, 29, 29, 24]" class="margin__bottom--none">
            <h3 class="margin__bottom--none">Speech {{ index + 1 }}:</h3>
            
            <button class="button button--secondary" @click="slotProps.getText({ speech: index + 1 })">
              <span
                class="text-present__selector"
                :class="{'text-presenter__selector--active' : slotProps.lastQuery.speech == index + 1 && slotProps.lastQuery.section == null }"
              >
                Full text
              </span>
            </button>

            <template v-for="section in sections">
              <button
                :key="section"
                class="button button--secondary"
                @click="slotProps.getText({ speech: index + 1, section })"
              >
                <span
                  class="text-present__selector"
                  :class="{'text-presenter__selector--active' : slotProps.lastQuery.speech == index + 1 && slotProps.lastQuery.section == section }"
                >
                  {{ section }}
                </span>
              </button>
            </template>
          </div>
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
