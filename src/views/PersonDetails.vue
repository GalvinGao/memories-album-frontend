<template>
  <v-container fluid>
    <v-dialog
      v-model="dialog.active"
      max-width="800px"
    >
      <ImageDetails :image="dialog.image"
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
        <v-card :color="iglist.includes(image.imageId) ? 'black' : 'white'">
          <div>
            <v-img
              :src="imageSrc(image)"
              aspect-ratio="1"
              :gradient="iglist.includes(image.imageId) ? 'to bottom, rgba(0,0,0,.9), rgba(0,0,0,.9)' : 'to bottom, rgba(0,0,0,.0), rgba(55, 55, 55,.0)'"
              @mousedown="view(image)"
              @mouseup="dialog.active = false"
            />
          </div>

          <v-card-title
            class="my-0 mx-0 px-0 py-0 mt-1 monospace justify-center"
            style="font-size: 16px"
          >
            {{ image.imageId }}
          </v-card-title>

          <v-card-actions
            style="z-index:999999"
            :class="{'white--text': iglist.includes(image.imageId)}"
          >
            <v-spacer />
            <v-btn
              icon
              small
              :color="iglist.includes(image.imageId) ? 'blue' : 'red'"
              @click="iglist.includes(image.imageId) ? remove(image.imageId) : add(image.imageId)"
            >
              <v-icon>
                {{ iglist.includes(image.imageId) ? "mdi-check-circle" : "mdi-delete" }}
              </v-icon>
            </v-btn>
            <v-btn
              color="error"
              x-small
              @click="add(image.imageId, true)"
            >
              全局忽略
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <h2>ignores: </h2>
      <v-card
        v-for="(ob, i) in iglist"
        :key="ob + '' + i"
        class="d-flex ma-1"
      >
        <v-card-title class="body-1 my-0 py-0 mx-0 px-0 ml-2">
          {{ Array.isArray(ob) ? ( "精确#" + [ob[0].substr(0, 8) + '..', ob[1]].join("+") ) : "全局#" + ob }}
        </v-card-title>
        <v-btn
          icon
          @click="remove(ob)"
        >
          <v-icon>
            mdi-close-circle
          </v-icon>
        </v-btn>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
  import NameRender from "@/components/NameRender";
  import get from "@/utils/get";
  import ImageDetails from "@/components/ImageDetails";
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
        iglist: JSON.parse(localStorage.getItem("IGNOREDIMGS")) || [],
        dialog: {
          active: false,
          src: "",
          ratio: -1,
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
      get () { return get }
    },

    watch: {
      iglist(newValue) {
        localStorage.setItem("IGNOREDIMGS", JSON.stringify(newValue))
      }
    },

    methods: {
      imageSrc(image) {
        return `http://192.168.1.238:8080/${image['imageId']}?mode=thumb`
      },
      add(i, glo) {
        if (glo) {
          this.iglist.push(i)
        } else {
          this.iglist.push([this.personId, i])
        }
      },
      remove(i) {this.iglist = this.iglist.filter(el => el !== i)},
      view (image) {
        this.dialog.active = true;
        this.dialog.image = image
      }
    },

  }
</script>

<style scoped>

</style>