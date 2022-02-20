<template>
  <div class="locale-changer">
    <select v-model="$i18n.locale">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang.code">
        {{ lang.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "locale-changer",
  data() {
    return {
      langs: [
        {
          name: "English",
          code: "en",
        },
        {
          name: "Español",
          code: "es",
        },
        {
          name: "Portugues",
          code: "pt",
        },
        {
          name: "Français",
          code: "fr",
        },
        {
          name: "Deutsch",
          code: "de",
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
};
</script>