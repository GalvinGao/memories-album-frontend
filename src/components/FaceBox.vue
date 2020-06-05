<template>
  <div>
    <div
      ref="face"
      class="box"
      :style="style"
    />
    <span
      ref="faceName"
      class="box-name pa-2"
    >
      <NameInline
        :person="person"
      />
    </span>
  </div>
</template>

<script>
  import { createPopper } from '@popperjs/core/lib/popper-lite.js';
  import {parse, stringify} from 'flatted';
  import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow';
  import get from "@/utils/get";
  import NameInline from "@/components/NameInline";

  export default {
    name: "FaceBox",
    components: {NameInline},
    props: {
      image: {
        type: Object,
        required: true
      },
      face: {
        type: Object,
        required: true
      },
      dimensions: {
        type: Object,
        required: true
      },
    },
    data() {
      return {
        popper: null,
      }
    },
    computed: {
      style () {
        const ratioX = (this.dimensions.clientWidth / this.image.width)
        const ratioY = (this.dimensions.clientHeight / this.image.height)

        console.log("facebox calculate style", this.dimensions.clientHeight, this.image.height, this.face.faceY)

        return {
          top: ratioY * this.face.faceY + 'px',
          left: ratioX * this.face.faceX + 'px',
          width: ratioX * this.face.faceWidth + 'px',
          height: ratioY * this.face.faceHeight + 'px'
        }
      },
      person () {
        return get.person.byPersonId(this.face.personId)
      },
    },
    watch: {
      dimensions() {
        this.popper.update();
      }
    },
    updated: function () {
      console.log("facebox mounted nexttick refs after evt:UPDATED", this.$refs.face.style.left, this.$refs.faceName.style.transform)
    },
    mounted: function () {
      this.$nextTick(function () {
        console.log("facebox mounted nexttick")
        console.log("facebox mounted nexttick refs before popper", this.$refs.face.style.left, this.$refs.faceName.style.transform)
        this.popper = createPopper(this.$refs.face, this.$refs.faceName, {
          strategy: "absolute",
          modifiers: [preventOverflow]
        })

        console.log("facebox mounted nexttick refs after popper", this.$refs.face.style.left, this.$refs.faceName.style.transform)
      })
    },
    beforeDestroy () {
      if (this.popper) this.popper.destroy()
    }
  }
</script>

<style scoped>
  .box {
    position: absolute;
    border: 1px #58ea58 solid;

    z-index: 3;
    border-radius: 4px;
  }

  .box-name {
    background: rgba(0, 0, 0, .8);
    line-height: 1;
    overflow: visible;
    border-radius: 4px;
  }
</style>