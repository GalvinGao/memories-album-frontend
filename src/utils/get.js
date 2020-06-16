import store from "@/store"

const Collection = {};

Collection.face = {
  all () {
    return store.getters["data/content"]("merged")["faces"] || []
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
    return store.getters["data/content"]("merged")["people"] || []
  },
  categorized () {
    const categories = [{
      name: "同学",
      filter: (el) => !el["isTeacher"]
    }, {
      name: "老师",
      filter: (el) => el["isTeacher"]
    }]
    return categories.map(category => {
      category["results"] = this.all().filter(category.filter)
      return category
    })
  },
  byPersonId (personId) {
    return this.all().find(el => el["personId"] === personId)
  }
}
Collection.image = {
  all () {
    return store.getters["data/content"]("merged")["images"] || []
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