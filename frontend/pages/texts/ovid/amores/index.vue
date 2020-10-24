<template>
  <div class="layout__body">
    <div>
      <h1 class="margin__bottom--none">Amores</h1>
      <h2 class="margin__top--none">Publius Ovidius Naso</h2>
      <TextPresenter author="ovid" title="amores" :initial-query="{ book: '1' }">
        <template v-slot:nav="slotProps">
          <div v-for="(poems, index) in [15, 19, 15]" class="margin__bottom--none">
            <h3 class="margin__bottom--none">Book {{ index + 1 }}:</h3>
            <button class="button button--secondary" @click="slotProps.getText({ book: index + 1 })">
              <span
                class="text-present__selector"
                :class="{'text-presenter__selector--active' : slotProps.lastQuery.book == index + 1 && slotProps.lastQuery.poem == null }"
              >
                Full text
              </span>
            </button>
            <button
              v-if="index == 0"
              class="button button--secondary"
              @click="slotProps.getText({ book: 1, poem: 'ep' })"
            >
              <span
                class="text-present__selector"
                :class="{'text-presenter__selector--active' : slotProps.lastQuery.book == 1 && slotProps.lastQuery.poem == 'ep' }"
              >
                Prologue
              </span>
            </button>
            <br />
            <template v-for="poem in poems">
              <template v-if="index == 1 && poem == 9">
                <button
                  key="9a"
                  class="button button--secondary"
                  @click="slotProps.getText({ book: 2, poem: '9a' })"
                >
                  <span
                    class="text-present__selector"
                    :class="{'text-presenter__selector--active' : slotProps.lastQuery.book == 2 && slotProps.lastQuery.poem == '9a' }"
                  >
                    9a
                  </span>
                </button>
                <button
                  key="9b"
                  class="button button--secondary"
                  @click="slotProps.getText({ book: 2, poem: '9b' })"
                >
                  <span
                    class="text-present__selector"
                    :class="{'text-presenter__selector--active' : slotProps.lastQuery.book == 2 && slotProps.lastQuery.poem == '9b' }"
                  >
                    9b
                  </span>
                </button>
              </template>

              <template v-else-if="index == 2 && poem == 11">
                <button
                  key="11a"
                  class="button button--secondary"
                  @click="slotProps.getText({ book: 3, poem: '11a' })"
                >
                  <span
                    class="text-present__selector"
                    :class="{'text-presenter__selector--active' : slotProps.lastQuery.book == 3 && slotProps.lastQuery.poem == '11a' }"
                  >
                    11a
                  </span>
                </button>
                <button
                  key="11b"
                  class="button button--secondary"
                  @click="slotProps.getText({ book: 3, poem: '11b' })"
                >
                  <span
                    class="text-present__selector"
                    :class="{'text-presenter__selector--active' : slotProps.lastQuery.book == 3 && slotProps.lastQuery.poem == '11b' }"
                  >
                    11b
                  </span>
                </button>
              </template>

              <button
                v-else
                :key="poem"
                class="button button--secondary"
                @click="slotProps.getText({ book: index + 1, poem })"
              >
                <span
                  class="text-present__selector"
                  :class="{'text-presenter__selector--active' : slotProps.lastQuery.book == index + 1 && slotProps.lastQuery.poem == poem }"
                >
                  {{ poem }}
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
