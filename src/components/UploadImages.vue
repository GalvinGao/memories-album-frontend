<template>
  <v-dialog
    v-model="active"
    max-width="800px"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        color="primary"
        v-on="on"
      >
        <v-icon left>
          mdi-upload
        </v-icon>
        上传照片
      </v-btn>
    </template>
    <v-card color="blue-grey darken-4">
      <v-card-title class="pb-4">
        上传照片
      </v-card-title>
      <v-card-subtitle>
        向此相册上传更多关于「<NameInline :person="person" />」的照片
      </v-card-subtitle>
      <v-card-text />
      <v-card-text>
        <file-pond
          ref="pond"

          :allow-multiple="true"
          :allow-revert="false"
          :allow-replace="false"
          :instant-upload="true"

          :name="personId"
          label-idle="拖拽照片至此 或 <span class=&quot;filepond--label-action&quot;> 选择照片 </span><br><span class='caption'>可上传 <span class='overline'>JPG</span>, <span class='overline'>PNG</span> 与 <span class='overline'>GIF</span> 照片文件</span>"
          file-validate-type-label-expected-types="仅支持最大为 10MB 的 JPG, PNG 或 GIF 照片文件"
          label-file-waiting-for-size="等待照片大小..."
          label-file-loading="正在加载照片..."
          label-file-load-error="无法加载照片"
          label-file-processing="正在上传..."
          label-tap-to-retry="轻点以重试"
          label-tap-to-cancel="轻点以取消"
          label-tap-to-undo="轻点以撤销"
          label-file-processing-complete="上传成功"
          label-file-processing-error="上传时出现错误"
          label-file-processing-aborted="上传已取消"
          label-button-retry-item-processing="重试"
          label-button-abort-item-processing="取消"
          label-file-type-not-allowed="不支持的文件类型"
          label-max-file-size-exceeded="照片文件过大"
          label-max-file-size="仅可上传最大 {filesize} 的照片文件"

          accepted-file-types="image/jpg, image/jpeg, image/png, image/gif"
          max-file-size="10MB"

          :server="server"
          :files="images"
        />
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          @click="active = false"
        >
          关闭
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import axios from 'axios'

  // Import Vue FilePond
  import vueFilePond from 'vue-filepond';

  // Import FilePond styles
  import 'filepond/dist/filepond.min.css';

  // Import image preview plugin styles
  import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

  // Import image preview and file type validation plugins
  import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
  import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
  import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
  import service from "@/utils/service";
  import apis from "@/apis/apis";
  import NameInline from "@/components/NameInline";

  // Create component
  const FilePond = vueFilePond(FilePondPluginFileValidateSize, FilePondPluginFileValidateType, FilePondPluginImagePreview);

  export default {
    name: "UploadImages",
    components: {
      NameInline,
      FilePond
    },
    props: {
      person: {
        type: Object,
        default () {
          return {}
        }
      },
    },
    data() {
      return {
        images: [],
        active: false,
        server: {
          process: (personId, file, metadata, load, error, progress, abort) => {
            const cancelTokenSource = axios.CancelToken.source()
            apis.upload.initiate(file.name, personId)
              .then(initiateResp => {
                console.debug('initiation succeeded', initiateResp);
                return apis.upload.transfer(
                  file,
                  initiateResp.data,
                  {
                    progress: progressEvent => {
                      if (progressEvent.total > 0) {
                        progress(progressEvent.lengthComputable, progressEvent.loaded, progressEvent.total);
                      }
                    },
                    cancelToken: cancelTokenSource.token
                  }
                )
                  .then(transferResp => {
                    console.debug('transfer succeeded', transferResp)
                    load(initiateResp.data.filename);
                  })
                  .catch((err) => {
                    console.error('transfer failed', err);
                    error(err)
                  });
              })
              .catch(failure => {
                console.debug('initiated failed', failure);
                error();
              });
            return {
              abort: () => {
                cancelTokenSource.cancel("用户取消了上传操作")
                abort()
              }
            }
          },
        },
      }
    },
    computed: {
      personId() {
        return this.person && this.person.personId
      }
    }
  }
</script>

<style scoped>

</style>