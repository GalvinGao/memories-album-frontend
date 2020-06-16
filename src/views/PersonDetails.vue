<template>
  <v-container>
    <v-dialog
      v-model="dialog.active"
      max-width="800px"
    >
      <ImageDetails
        :image="dialog.image"
        :active="dialog.active"
        :person="person"
        @close="dialog.active = false"
      />
    </v-dialog>

    <v-breadcrumbs
      :items="breadcrumbs"
      large
      class="pa-0 my-3 pb-3"
    >
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>

    <h1 class="d-flex flex-row headline">
      <NameRender
        :person="person"
        large
      />
      <v-spacer />
      <UploadImages :person="person" />
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
          <v-card-title class="title">
            {{ image.relativeTime.title }}
            <!--            <v-spacer />-->
            <!--            <v-btn icon>-->
            <!--              <v-icon>-->
            <!--                mdi-bookmark-->
            <!--              </v-icon>-->
            <!--            </v-btn>-->
          </v-card-title>
          <v-card-subtitle class="d-flex">
            <v-icon
              x-small
              class="mr-1"
            >
              mdi-clock
            </v-icon>
            {{ image.relativeTime.subtitle }}
          </v-card-subtitle>
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
  import UploadImages from "@/components/UploadImages";
  import times from "@/utils/times";
  export default {
    name: "PersonDetails",
    components: {UploadImages, ImageDetails, NameRender},

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
        return get.image.byPersonId(this.personId).map(el => {
          el.relativeTime = times.relative(el.time)
          console.log(el.time, times.dayjs(el.time), el.relativeTime)
          return el
        }).sort((a, b) => b.relativeTime.ts - a.relativeTime.ts)
      },
      breadcrumbs () {
        return [
          {
            text: "首页",
            exact: true,
            to: {
              name: "Home"
            }
          },
          {
            text: "人物详情",
            disabled: true,
          }
        ]
      }
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