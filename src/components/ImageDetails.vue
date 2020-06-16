<template>
  <v-card>
    <BoxedImage
      :meta="meta"
      :image="image"
      :faces="renderFaces"

      class="elevation-4"
    />

    <v-card-subtitle class="subtitle-1 pb-3 mt-4">
      本照片中人物
    </v-card-subtitle>

    <v-card-actions class="d-flex flex-nowrap overflow-y-auto flex-row px-4 pt-0">
      <PersonCard
        v-for="(face, i) in faces"
        :key="face.faceId"
        :person="face.person"
        dense
        class="mx-1"
        :class="{'mr-4': i === faces.length - 1}"
        @click="$emit('close')"
      />
      <template v-if="faces.length === 0">
        <PersonCard
          :person="face.person"
          dense
          class="mx-1"
          :class="{'mr-4': i === faces.length - 1}"
          @click="$emit('close')"
        />
      </template>
      <v-card
        tile
        color="transparent"
        class="mr-3"
        width="140px"
        style="opacity:0"
      >
        .
      </v-card>
    </v-card-actions>

    <v-row class="mx-0 align-center">
      <v-col
        cols="12"
        md="6"
      >
        <v-card-subtitle class="subtitle-1">
          照片详细信息
        </v-card-subtitle>

        <v-card-actions class="mx-2 pt-0">
          <v-list>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>
                  mdi-calendar
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="formatTime(image.time)" />
                <v-list-item-subtitle v-text="'拍摄时间'" />
              </v-list-item-content>
            </v-list-item>

            <v-list-item v-bind="source.binding">
              <v-list-item-icon>
                <v-icon>
                  {{ source.icon }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="source.name" />
                <v-list-item-subtitle v-text="'图片来源'" />
              </v-list-item-content>

              <v-list-item-action v-if="source.binding">
                <v-icon>
                  mdi-open-in-app
                </v-icon>
                <v-list-item-action-text>
                  查看文章
                </v-list-item-action-text>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card-actions>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <BackdropCard
          darken
          hover
          color="blue-grey"
          :href="meta.src"
          target="_blank"
          download="image"
        >
          <template v-slot:backdrop>
            <v-icon>
              mdi-download
            </v-icon>
          </template>
          <v-card-title>
            下载原图
            <v-icon class="ml-2">
              mdi-image
            </v-icon>
          </v-card-title>
        </BackdropCard>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
  import get from "@/utils/get";
  import PersonCard from "@/components/PersonCard";
  import BoxedImage from "@/components/BoxedImage";
  import times from "@/utils/times";
  import types from "@/utils/types";
  import {deliver} from "@/utils/deliver";
  import BackdropCard from "@/components/BackdropCard";

  export default {
    name: "ImageDetails",
    components: {BackdropCard, BoxedImage, PersonCard},
    props: {
      image: {
        type: Object,
        required: true
      },
      active: {
        type: Boolean,
        required: true
      },
      person: {
        type: Object,
        required: true
      },
    },
    computed: {
      meta () {
        return {
          src: deliver(this.image),
          thumb: deliver(this.image, "thumb"),
          ratio: this.image.width / this.image.height,
        }
      },
      faces () {
        return get.face.byImageId(this.image.imageId)
          .filter(el => (el.faceX && el.faceY) || el.personId === this.person.personId)
          .map(el => {
            el.person = get.person.byPersonId(el.personId)
            return el
          })
      },
      renderFaces () {
        return get.face.byImageId(this.image.imageId)
          .filter(el => (el.faceX && el.faceY))
          .map(el => {
            el.person = get.person.byPersonId(el.personId)
            return el
          })
      },
      source () {
        const [type, meta] = this.image.source.split(":")
        if (type === "article") {
          return {
            ...types.source[type],
            binding: {
              href: `https://www.bestsch.cn/best/public/news/single?pubid=${meta}&pubtp=news&mid=1&sid=14`,
              target: "_blank"
            }
          }
        }
        return types.source[type]
      }
    },
    watch: {
      image() {
        this.loaded = false
      }
    },
    methods: {
      formatTime(t) {
        return times.format(t)
      }
    },

  }
</script>

<style scoped>

</style>