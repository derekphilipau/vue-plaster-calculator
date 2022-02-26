<template>
  <div class="locale-changer">
    <div v-if="isSelect">
      <select v-model="$i18n.locale">
        <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang.code">
          {{ lang.name }}
        </option>
      </select>
    </div>
    <div v-else>
      <a v-for="(lang, i) in langs"
        :key="`Lang${i}`"
        href="#"
        @click.prevent="selectLang(lang.code)"
        >
        {{ lang.name }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "locale-changer",
  props: {
    isSelect: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      langs: [
        {
          name: "Deutsch",
          code: "de",
        },
        {
          name: "English",
          code: "en",
        },
        {
          name: "Español",
          code: "es",
        },
        {
          name: "Français",
          code: "fr",
        },
        {
          name: "Italiano",
          code: "it",
        },
        {
          name: "Portugues",
          code: "pt",
        },
        {
          name: "Nederlands",
          code: "nl",
        },
        {
          name: "中文",
          code: "zh",
        },
      ],
    };
  },
  methods: {
    selectLang(lang) {
      this.$i18n.locale = lang;
    }
  }
};
</script>