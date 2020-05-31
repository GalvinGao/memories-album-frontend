import store from "@/store"

const base = store.getters["data/content"]("merged")

const Collection = {};

Collection.face = {
  all () {
    return base["faces"]
  },
  byFaceId (faceId) {
    return this.all().filter(el => el["faceId"] === faceId)
  },
  byPersonId (personId) {
    return this.all().filter(el => el["personId"] === personId)
  },
  byImageId (imageId) {
    return this.all().filter(el => el["imageId"] === imageId)
  }
}
Collection.person = {
  all () {
    return base["people"]
  },
  byPersonId (personId) {
    return this.all().find(el => el["personId"] === personId)
  }
}
Collection.image = {
  all () {
    return base["images"]
  },
  byImageId (imageId) {
    return this.all().find(el => el["imageId"] === imageId)
  },
  byPersonId (personId) {
    const images = [];
    Collection.face.byPersonId(personId).forEach(face => {
      const id = face["imageId"]
      if (!images.includes(id)) images.push(id)
    })
    return images.map(el => {
      return Collection.image.byImageId(el)
    })
  }
}
export default Collection