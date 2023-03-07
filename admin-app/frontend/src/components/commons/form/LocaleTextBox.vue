<template>
  <div style="margin-bottom: 20px" class="d-flex flex-column">
    <transition-group name="fade" tag="div">
      <div
        v-for="selectedLocale in selectedLocales"
        :key="selectedLocale"
        class="d-flex align-center"
      >
        <slot
          :inputHandler="(e) => inputHandler(e, selectedLocale)"
          name="text-input"
          :model="
            res.languageTexts[
              calculateIndexByLocale({ locale: selectedLocale })
            ]
          "
          :label="`${$t(labelPrefixI18nSelector, passPayloadToI18n)} (${
            localeToFlag.find((l) => l.locale === selectedLocale).flag
          })`"
        ></slot>
        <div class="pb-7" v-if="selectedLocale !== $i18n.fallbackLocale">
          <v-btn
            color="primary"
            outlined
            icon
            class="ml-2"
            @click="removeSelectedLocale(selectedLocale)"
          >
            <v-icon> mdi-minus </v-icon>
          </v-btn>
        </div>
      </div>
    </transition-group>
    <div class="d-flex justify-center" v-if="isAddNewLocaleButtonShown">
      <v-btn rounded x-large @click="addNewLocale">
        <v-icon class="mr-2"> mdi-plus </v-icon>
        <span class="overflow-hidden">
          {{
            $t("general.form.addInNewLocale", {
              x: $t(labelPrefixI18nSelector, passPayloadToI18n),
            })
          }}
        </span>
      </v-btn>
      <v-select
        class="ml-2"
        style="max-width: 8rem"
        filled
        :items="localeToFlagCanBeAdded"
        v-model="currentLocale"
        item-text="flag"
        item-value="locale"
        rounded
      ></v-select>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mutableI18nString } from "../../../lib/classes";
import { localeToFlagArray } from "../../../lib/constants";
// import { I18nString } from '../../models';
// import { emptyI18nString } from '../../lib/classes';

export default {
  props: {
    labelPrefixI18nSelector: {
      type: String,
      required: true,
    },
    initVal: {
      type: Object,
      required: true,
    },
    passPayloadToI18n: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      selectedLocales: [this.$i18n.fallbackLocale],
      res: {
        languageKeys: this.$i18n.availableLocales,
        languageTexts: this.initVal.languageTexts,
      } ?? {
        languageKeys: this.$i18n.availableLocales,
        languageTexts: Array(this.$i18n.availableLocales.length).fill(""),
      },
      currentLocale:
        this.$i18n.availableLocales[0] === this.$i18n.fallbackLocale
          ? this.$i18n.availableLocales[1]
          : this.$i18n.availableLocales[0],
    };
  },
  watch: {
    localesCanBeAdded: function (newValue) {
      if (newValue.length === 0) {
        this.currentLocale = null;
      } else {
        this.currentLocale = newValue[0];
      }
    },
  },
  computed: {
    avaliableLocales() {
      return this.$i18n.availableLocales;
    },
    isAddNewLocaleButtonShown() {
      return this.avaliableLocales.length > this.selectedLocales.length;
    },
    localesCanBeAdded() {
      return this.avaliableLocales.filter(
        (l) => !this.selectedLocales.includes(l)
      );
    },
    localeToFlag() {
      return localeToFlagArray;
    },
    localeToFlagCanBeAdded() {
      return localeToFlagArray.filter((l) =>
        this.localesCanBeAdded.includes(l.locale)
      );
    },

    ...mapGetters({
      calculateIndexByLocale: "calculateIndexByLocale",
    }),
  },
  methods: {
    removeSelectedLocale(locale) {
      const foundIndex = this.res.languageKeys.findIndex((k) => k === locale);
      const languageTexts = this.res.languageTexts.map((t, i) =>
        i === foundIndex ? "" : t
      );
      this.res = {
        languageKeys: this.res.languageKeys,
        languageTexts,
      };
      this.selectedLocales = this.selectedLocales.filter((l) => l !== locale);
    },
    addNewLocale() {
      this.selectedLocales.push(this.currentLocale);
    },
    inputHandler(value, locale) {
      if (!value && value !== "") return;
      const foundIndex = this.res.languageKeys.findIndex((k) => k === locale);
      const languageTexts = this.res.languageTexts.map((t, i) =>
        i === foundIndex ? value : t
      );
      this.res.languageTexts[this.calculateIndexByLocale({ locale })] = value;
      this.res = mutableI18nString({ languageTexts });
      this.$emit("res", this.res);
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
