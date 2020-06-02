<template>
  <v-container fluid>
    <v-dialog
      v-model="dialog.active"
      max-width="800px"
    >
      <ImageDetails
        :image="dialog.image"
        :active="dialog.active"
        @close="dialog.active = false"
      />
    </v-dialog>
    <v-btn :to="{name: 'Home'}">
      <v-icon left>
        mdi-home
      </v-icon>
      Home
    </v-btn>
    <h1 class="d-flex flex-row headline">
      <NameRender :person="person" />
    </h1>
    <v-row>
      <v-col
        v-for="image in images"
        :key="image.id"
        cols="6"
        sm="4"
        md="3"
        lg="2"
        xl="2"
      >
        <v-card @click="view(image)">
          <v-img
            :src="imageSrc(image)"
            aspect-ratio="1"
          />
          <v-card-title
            class="my-0 mx-0 px-0 py-0 mt-1 monospace justify-center"
            style="font-size: 16px"
          >
            {{ image.imageId }}
          </v-card-title>

          <v-card-actions>
            <v-btn icon>
              <v-icon>
                mdi-star
              </v-icon>
            </v-btn>
            <v-spacer />
            <v-btn icon>
              <v-icon>
                mdi-download
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import NameRender from "@/components/NameRender";
  import get from "@/utils/get";
  import ImageDetails from "@/components/ImageDetails";
  import {deliver} from "@/utils/deliver";
  export default {
    name: "PersonDetails",
    components: {ImageDetails, NameRender},

    props: {
      personId: {
        type: String,
        required: true,
      },
    },

    data() {
      return {
        dialog: {
          active: false,
          image: {}
        }
      }
    },

    computed: {
      person() {
        return get.person.byPersonId(this.personId);
      },
      images() {
        return get.image.byPersonId(this.personId)
      },
    },

    methods: {
      imageSrc(image) {
        return deliver(image, "thumb")
      },
      view (image) {
        this.dialog.active = true;
        this.dialog.image = image
      }
    },

  }
</script>

<style scoped>

</style>