<template>
  <span
    class="line-height--narrow light-text-shadow"
    :class="{'large': large, 'title': !large}"
  >
    <p
      v-if="chinese"
      class="person-name-chinese"
      :class="{'mb-2': large, 'mb-0': !large}"
    >
      {{ chinese.last }}{{ chinese.first }}
    </p>
    <p
      v-if="english"
      :class="{'subtitle-2 mb-2': chinese, 'person-name-only-english mb-2': english && !chinese}"
    >
      <span
        v-if="english.title"
        class="overline"
      >{{ english.title }}</span><span>{{ dense && isTeacher ? "" : `${english.first} ` }}{{ english.last }}</span>
    </p>
  </span>
</template>

<script>
  export default {
    name: "NameRender",

    props: {
      person: {
        type: Object,
        default () {
          return {}
        }
      },
      dense: {
        type: Boolean,
        default () {
          return false
        }
      },
      large: {
        type: Boolean,
        default () {
          return false
        }
      }
    },

    computed: {
      isTeacher () {
        return this.person["isTeacher"]
      },
      chinese() {
        if (!this.person || !this.person["chineseName"]) return null
        let [last, first] = this.person["chineseName"].split("|");
        if (this.isTeacher) first = `${first}老师`
        return {last, first}
      },
      english () {
        if (!this.person || !this.person["englishName"]) return null
        if (this.isTeacher) {
          const [title, first, last] = this.person["englishName"].split("|");
          return {title, first, last}
        } else {
          const [first, last] = this.person["englishName"].split("|");
          return {first, last}
        }
      }
    },
  }
</script>

<style scoped>
  .person-name-chinese {
    font-family: "Source Han Serif", "Source Han Serif SC", "Songti SC", serif;
  }
  .line-height--narrow {
    line-height: 2rem !important;
  }
  .person-name-only-english {
    word-break: break-word;
    font-size: 90%;
    line-height: 1.6rem !important;
  }
  .large {
    font-size: 36px;
  }
  .large-s {
    font-size: 16px !important;
  }
</style>