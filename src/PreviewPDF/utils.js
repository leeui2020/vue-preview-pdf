const pdfjsLib = require('pdfjs-dist')
const worker = require('pdfjs-dist/build/pdf.worker')

// PDF二进制数据转图片
export function pdfToImage(url) {
  return new Promise(async (resolve) => {
    window.pdfjsWorker = worker
    pdfjsLib.getDocument(url).promise.then(pdf => {
      const imageList = []
      const total = pdf.numPages
      const loadNext = () => {
        if (imageList.length === total) {
          delete window.pdfjsWorker
          resolve(imageList)
          return
        }
        pdf.getPage(imageList.length + 1).then(page => {
          const viewport = page.getViewport({ scale: 1 })
          const canvas = document.createElement('canvas')
          canvas.width = viewport.width
          canvas.height = viewport.height
          const ctx = canvas.getContext('2d')
          page.render({
            canvasContext: ctx,
            viewport,
          }).promise.then(() => {
            canvas.toBlob((blob) => {
              const img = new Image()
              img.src = URL.createObjectURL(blob)
              img.onload = () => {
                imageList.push(img.src)
                loadNext()
              }
            })
          })
        })
      }
      loadNext()
    })
  })
}
