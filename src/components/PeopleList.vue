<template>
  <v-container>
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        v-for="person in people"
        :key="person.id"
        cols="6"
        sm="4"
        md="3"
        lg="2"
        xl="2"
      >
        <v-card @click="$router.push({name: 'PersonDetails', params: {personId: person.personId}})">
          <v-card-title>
            <NameRender :person="person" />
          </v-card-title>
          <v-card-subtitle class="caption monospace">
            {{ person.personId }}
          </v-card-subtitle>
          <v-card-actions>
            <v-spacer />
            <span class="display-1">
              {{ get.image.byPersonId(person.personId).length }}
            </span>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import get from "@/utils/get";
  import NameRender from "@/components/NameRender";

  export default {
    name: "PeopleList",
    components: {NameRender},
    computed: {
      people() {
        return get.person.all();
      },
      get () { return get }
    },

  }
</script>

<style scoped>

</style>