<template>
  <v-card>
    <!--    <v-card-title class="caption">-->
    <!--      <v-avatar>-->
    <!--        孟祥宇-->
    <!--      </v-avatar>-->
    <!--      <div class="d-flex flex-column">-->
    <!--        <h3 class="body-1">-->
    <!--          孟祥宇-->
    <!--        </h3>-->
    <!--        <h4 class="body-2">-->
    <!--          Michael Meng-->
    <!--        </h4>-->
    <!--      </div>-->
    <!--    </v-card-title>-->

    <BoxedImage
      :src="meta.src"
      :aspect-ratio="meta.ratio"
      :image="image"
      :faces="faces"

      class="elevation-4"
    />

    <v-card-subtitle class="subtitle-1 pb-3 mt-4">
      人物
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

    <v-card-subtitle class="subtitle-1 pb-3 mt-4">
      详细信息
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

    <v-card-actions class="align-start body-2">
      <v-btn>
        <v-icon left>
          mdi-download
        </v-icon>
        下载
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import get from "@/utils/get";
  import PersonCard from "@/components/PersonCard";
  import BoxedImage from "@/components/BoxedImage";
  import times from "@/utils/times";
  import types from "@/utils/types";
  import {deliver} from "@/utils/deliver";

  export default {
    name: "ImageDetails",
    components: {BoxedImage, PersonCard},
    props: {
      image: {
        type: Object,
        required: true
      },
    },
    computed: {
      meta () {
        return {
          src: deliver(this.image),
          ratio: this.image.width / this.image.height,
        }
      },
      faces () {
        return get.face.byImageId(this.image.imageId)
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
    methods: {
      formatTime(t) {
        return times.format(t)
      }
    },

  }
</script>

<style scoped>

</style>