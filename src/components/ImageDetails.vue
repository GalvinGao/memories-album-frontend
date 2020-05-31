<template>
  <v-card>
    <v-card-title class="caption">
      viewing image #{{ dialog.image.imageId }} | mode: full | source: local
    </v-card-title>
    <v-img
        :src="dialog.src"
        :aspect-ratio="dialog.ratio"
        @mouseup="dialog.active = false"
    />
    <v-card-text>
      <h4>图片同时包含以下人物</h4>
      <ul v-if="dialog.image.imageId">
        <li
            v-for="face in get.face.byImageId(dialog.image.imageId).filter(f => f.personId !== personId)"
            :key="face.faceId"
        >
          {{ get.person.byPersonId(face.personId).name }} <small
            class="monospace"
            style="font-size: 10px"
        >(person#{{ face.personId }}, face#{{ face.faceId }})</small>
        </li>
      </ul>
    </v-card-text>
    <v-card-actions class="align-start body-2">
      全局忽略状态：{{ iglist.includes(dialog.image.imageId) }} <v-spacer /><code class="elevation-0 transparent">{{ dialog.image }}</code>
      <div>
        <v-btn
            block
            target="_blank"
            :href="`https://www.bestsch.cn/best/public/news/single?pubid=${dialog.image.source && dialog.image.source.split('article:')[1]}&pubtp=news&mid=1&sid=14`"
        >
          <v-icon left>
            mdi-link-variant
          </v-icon>
          前往对应学校新闻文章
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
  import get from "@/utils/get";
  import NameRender from "@/components/NameRender";

  // this.dialog.active = true;
  // this.dialog.src = `http://192.168.1.238:8080/${image['imageId']}`;
  // this.dialog.ratio = image.width / image.height;

  export default {
    name: "ImageDetails",
    components: {NameRender},
    props: {
      image: {
        type: Object,
        required: true
      },
    },
    computed: {

    },

  }
</script>

<style scoped>

</style>