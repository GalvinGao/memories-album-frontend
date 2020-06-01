<template>
  <div>
    <v-img
      ref="boxedImageContent"
      :src="src"
      :lazy-src="src + '?mode=thumb'"
      :aspect-ratio="aspectRatio"
      max-width="800px"
    >
      <template v-slot:placeholder>
        <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
        >
          <v-progress-circular
            indeterminate
            color="grey darken-3"
          />
        </v-row>
      </template>
    </v-img>
    <div
      v-for="face in []"
      :key="face.faceId"
      class="box"
      :style="style(face)"
    >
      <span class="box-name">
        <span style="font-size: 7px">
          识别结果
        </span>
        <NameRender
          :person="person(face.personId)"
        />
      </span>
    </div>
  </div>
</template>

<script>
  import get from "@/utils/get"
  import NameRender from "@/components/NameRender";

  export default {
    name: "BoxedImage",
    components: {NameRender},
    props: {
      src: {
        type: String,
        required: true
      },
      aspectRatio: {
        type: Number,
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
    },
    methods: {
      style (face) {
        // if (!(this.$refs.image)) {
        //   console.log(this.$refs, this.image)
        //   return {}
        // }
        console.log(this.$refs)
        // const {clientHeight, clientWidth} = this.$refs["boxedImageContent"] && this.$refs["boxedImageContent"].$el
        const {clientHeight, clientWidth} = {clientHeight: 600, clientWidth: 800}

        const ratioX = (clientWidth / this.image.width)
        const ratioY = (clientHeight / this.image.height)

        return {
          top: ratioY * face.faceY + 'px',
          left: ratioX * face.faceX + 'px',
          width: ratioX * face.faceWidth + 'px',
          height: ratioY * face.faceHeight + 'px'
        }
      },
      person (personId) {
        return get.person.byPersonId(personId)
      }
    }
  }
</script>

<style scoped>
  .box {
    position: absolute;
    border: 1px #58ea58 solid;

    z-index: 3;
  }

  .box-name {
    position: absolute;
    background: #c1e5c1;
    font-size: 80%;
    margin-top: 120%;
    font-family: monospace;
    line-height: 1;
    width: 150%;
    left: -25%;
    overflow: visible;
    opacity:0.9
  }
</style>