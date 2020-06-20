<template>
  <div v-resize="updateDimensions">
    <v-img
      ref="boxedImageContent"
      :src="meta.src"
      :lazy-src="meta.thumb"
      :aspect-ratio="meta.ratio"
      max-width="800px"
    >
      <v-btn
        rounded
        class="face-switch-btn"
        color="secondary darken-2"
        @click="faceActive = !faceActive"
      >
        <v-icon
          left
          small
        >
          {{ faceActive ? "mdi-eye-off" : "mdi-eye" }}
        </v-icon>
        {{ faceActive ? $t('hide') : $t('show') }}{{ $t('nameBox') }}
      </v-btn>
      <template v-slot:placeholder>
        <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
        >
          <v-progress-circular
            indeterminate
            color="white"
            class="drop-shadow"
          />
        </v-row>
      </template>
    </v-img>
    <template v-if="faceActive">
      <FaceBox
        v-for="face in faces"
        :key="face.faceId"
        :face="face"
        :image="image"
        :dimensions="dimensions"
      />
    </template>
  </div>
</template>

<script>
  import get from "@/utils/get"
  import FaceBox from "@/components/FaceBox";

  export default {
    name: "BoxedImage",
    components: {FaceBox},
    props: {
      meta: {
        type: Object,
        required: true
      },
      image: {
        type: Object,
        required: true
      },
      faces: {
        type: Array,
        required: true
      },
      // active: {
      //   type: Boolean,
      //   required: true
      // },
    },
    data() {
      return {
        dimensions: {
          clientHeight: 0,
          clientWidth: 0
        },
        faceActive: true
      }
    },
    watch: {
      image() {
        console.log("boxedimage image changed")
        this.updateDimensions()
      }
    },
    mounted () {
      this.$nextTick(function () {
        console.log("boxedimage mounted nexttick")
        this.updateDimensions()
      })
    },
    methods: {
      updateDimensions() {
        const el = this.$refs["boxedImageContent"]["$el"];
        this.dimensions.clientHeight = el.clientHeight
        this.dimensions.clientWidth = el.clientWidth
        console.log("boxedimage updated dimensions to ", this.dimensions.clientHeight, this.dimensions.clientWidth)
      }
    }
  }
</script>

<style scoped>
.face-switch-btn {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  z-index: 25 !important;
  opacity: 0.3;
}
  .face-switch-btn:hover {
    opacity: 1;
  }
  .drop-shadow {
    filter: drop-shadow(0 0 5px #000);
  }
</style>