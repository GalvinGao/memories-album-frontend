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
        {{ $t('upload.title') }}
      </v-btn>
    </template>
    <v-card color="blue-grey darken-4">
      <v-card-title class="pb-4">
        {{ $t('upload.title') }}
      </v-card-title>
      <v-card-subtitle>
        {{ $t('upload.subtitle.0') }}<NameInline :person="person" />{{ $t('upload.subtitle.1') }}
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
          :label-idle="$t('upload.label.idle')"
          :file-validate-type-label-expected-types="$t('upload.label.types')"
          :label-file-waiting-for-size="$t('upload.label.waitSize')"
          :label-file-loading="$t('upload.label.loadingImage')"
          :label-file-load-error="$t('upload.label.cantLoadImage')"
          :label-file-processing="$t('upload.label.processing')"
          :label-tap-to-retry="$t('upload.label.tapToRetry')"
          :label-tap-to-cancel="$t('upload.label.tapToCancel')"
          :label-tap-to-undo="$t('upload.label.tapToUndo')"
          :label-file-processing-complete="$t('upload.label.complete')"
          :label-file-processing-error="$t('upload.label.error')"
          :label-file-processing-aborted="$t('upload.label.aborted')"
          :label-button-retry-item-processing="$t('upload.label.retry')"
          :label-button-abort-item-processing="$t('upload.label.abort')"
          :label-file-type-not-allowed="$t('upload.label.invalidType')"
          :label-max-file-size-exceeded="$t('upload.label.sizeExceeded')"
          :label-max-file-size="$t('upload.label.fileSize')"

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
          {{ $t('dialog.close') }}
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