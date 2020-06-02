export function deliver (image, mode) {
  let url = `http://192.168.1.238:8080/i/${image['imageId']}`
  if (mode === "thumb") url += "?mode=thumb"
  return url
}