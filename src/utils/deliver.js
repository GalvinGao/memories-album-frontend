export function deliver (image, mode) {
  if (~window.location.href.indexOf("localhost")) {
    if (image.source === "upload") {
      let base = `https://memories.upyun.galvincdn.com/_development/album/images/`
      // if (mode === "thumb") base += "thumb/"
      return base + image['src']
    } else {
      let url = `http://192.168.1.238:8080/i/${image['imageId']}`
      if (mode === "thumb") url += "?mode=thumb"
      return url
    }
  } else {
    let base = `https://memories.upyun.galvincdn.com/album/images/`
    if (mode === "thumb") base += "thumb/"
    return base + image['src']
  }

}