<template>
  <v-container>
    <v-row
      v-for="category in categorizedPeople"
      :key="category.name"
      align="center"
      justify="start"
    >
      <v-col cols="12">
        <Subheader>
          {{ category.name }}
        </Subheader>
      </v-col>
      <v-col
        v-for="person in category.results"
        :key="person.personId"
        cols="6"
        sm="4"
        md="3"
        lg="2"
        xl="1"
        class="align-self-stretch"
      >
        <PersonCard
          :person="person"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import get from "@/utils/get";
  import PersonCard from "@/components/PersonCard";
  import Subheader from "@/components/Subheader";

  export default {
    name: "PeopleList",
    components: {Subheader, PersonCard},
    computed: {
      categorizedPeople() {
        return get.person.categorized();
      }
    },
  }
</script>

<style scoped>

</style>