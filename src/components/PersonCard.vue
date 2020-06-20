<template>
  <v-card
    min-width="140px"
    height="100%"
    @click="onCardClick"
  >
    <v-img
      :aspect-ratio="1"
      class="white--text align-end"
      :src="featured"
      gradient="to bottom, rgba(0, 0, 0, .0) 0%, rgba(0, 0, 0, .0) 50%, rgba(0, 0, 0, .7) 100%"
    >
      <v-card-title class="pb-1">
        <NameRender
          :person="person"
          dense
        />
      </v-card-title>
    </v-img>
  </v-card>
</template>

<script>
  import get from "@/utils/get"
  import NameRender from "@/components/NameRender";
  import {deliver} from "@/utils/deliver";
  export default {
    name: "PersonCard",
    components: {NameRender},
    props: {
      person: {
        type: Object,
        required: true
      },
      dense: {
        type: Boolean,
        default () {
          return false
        }
      },
      link: {
        type: Boolean,
        default () {
          return true
        }
      }
    },
    computed: {
      featured() {
        return this.person.featured || deliver(get.image.byImageId(get.face.all().find(el => el.personId === this.person.personId).imageId), "thumb")
      }
    },
    methods: {
      onCardClick() {
        if (this.link) this.$router.push({name: 'PersonDetails', params: {personId: this.person.personId}});
        this.$emit('click')
      }
    },
  }
</script>

<style scoped>

</style>