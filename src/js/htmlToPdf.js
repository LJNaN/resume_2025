import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'

export default {
  install(app) {
    // Vue 3 uses app.config.globalProperties instead of Vue.prototype
    app.config.globalProperties.$getPdf = function (title = 'document', elementId = '#pdfDom') {
      return new Promise((resolve, reject) => {
        const element = document.querySelector(elementId)
        if (!element) {
          reject(new Error(`Element with selector "${elementId}" not found`))
          return
        }

        html2Canvas(element, {
          allowTaint: true,
          useCORS: true,
          scale: 2, // 高质量
          backgroundColor: '#ffffff',
          logging: false
        }).then(function (canvas) {
          try {
            // A4 页面尺寸 (pt): 595.28 x 841.89
            const A4_WIDTH = 595.28
            const A4_HEIGHT = 841.89

            // 设置页面边距 (pt) - 标准A4边距约20mm
            const MARGIN = 56.69 / 2 // 20mm = 56.69pt

            // 可用内容区域
            const CONTENT_WIDTH = A4_WIDTH - (MARGIN * 2)
            const CONTENT_HEIGHT = A4_HEIGHT - (MARGIN * 2)

            // 获取canvas尺寸
            const canvasWidth = canvas.width
            const canvasHeight = canvas.height

            // 计算缩放比例，确保内容适合A4页面宽度
            const scale = CONTENT_WIDTH / canvasWidth

            // 创建PDF文档
            const PDF = new JsPDF('portrait', 'pt', 'a4')

            let currentY = 0 // 当前在canvas中的Y位置
            let pageNumber = 1

            while (currentY < canvasHeight) {
              // 计算当前页面可以容纳的canvas高度
              const remainingCanvasHeight = canvasHeight - currentY
              const maxCanvasHeightForPage = CONTENT_HEIGHT / scale
              const canvasHeightForThisPage = Math.min(remainingCanvasHeight, maxCanvasHeightForPage)

              // 创建临时canvas来截取当前页面的内容
              const tempCanvas = document.createElement('canvas')
              const tempCtx = tempCanvas.getContext('2d')
              tempCanvas.width = canvasWidth
              tempCanvas.height = canvasHeightForThisPage

              // 绘制当前页面的内容到临时canvas
              tempCtx.drawImage(
                canvas,
                0, currentY, canvasWidth, canvasHeightForThisPage,
                0, 0, canvasWidth, canvasHeightForThisPage
              )

              // 转换为图片数据
              const pageImageData = tempCanvas.toDataURL('image/jpeg', 0.95)

              // 计算在PDF中的尺寸和位置
              const pdfImageWidth = CONTENT_WIDTH
              const pdfImageHeight = canvasHeightForThisPage * scale

              // 添加图片到PDF（居中显示）
              PDF.addImage(
                pageImageData,
                'JPEG',
                MARGIN, // X位置：左边距
                MARGIN, // Y位置：上边距
                pdfImageWidth,
                pdfImageHeight
              )

              // 更新位置
              currentY += canvasHeightForThisPage

              // 如果还有内容，添加新页面
              if (currentY < canvasHeight) {
                PDF.addPage()
                pageNumber++
              }

              // 清理临时canvas
              tempCanvas.remove()
            }

            // 保存PDF
            PDF.save(title + '.pdf')
            resolve(PDF)
          } catch (error) {
            reject(error)
          }
        }).catch(reject)
      })
    }

    // Also provide a composable function for use with Composition API
    app.provide('htmlToPdf', {
      generatePdf: app.config.globalProperties.$getPdf
    })
  }
}