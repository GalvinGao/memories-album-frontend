import axios from "axios";
import service from "@/utils/service";

export default {
  upload: {
    initiate (filename, personId) {
      return service.post("/upload/initiate", {
        filename,
        personId
      })
    },
    transfer (file, {policy, authorization, bucket, filename}, {progress, cancelToken}) {
      const formData = new FormData();
      formData.append("policy", policy);
      formData.append("authorization", authorization);
      formData.append("file", file, filename);

      return service({
        method: 'post',
        url: `https://v0.api.upyun.com/${bucket}`,
        timeout: 86400000, // 24 hours
        data: formData, // form data
        onUploadProgress: progress,
        cancelToken
      });
    }
  }
}