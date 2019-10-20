import jsPdf from 'jspdf'
import qrCode from 'qrcode'

const NUMBER_OF_COLUMNS = 3
const NUMBER_OF_ROWS = 3
const TILES_PER_PAGE = NUMBER_OF_ROWS * NUMBER_OF_COLUMNS

// The font is assumed to be monospace.
const FONT_NAME = 'courier'
const FONT_STYLE = 'normal'
const FONT_SIZE = 12

export const print = async (tiles) => {
  let document = new jsPdf()
  document.setFont(FONT_NAME, FONT_STYLE)
  document.setFontSize(FONT_SIZE)
  let letterHeight = document.getTextDimensions('T').h
  let numberOfPages = Math.ceil(tiles.length / TILES_PER_PAGE)
  let page = document
  let tileIndex = 0
  for (let pageIndex = 0; pageIndex < numberOfPages; ++pageIndex) {
    if (pageIndex > 0) {
        page = page.addPage()
    }
    let dimensions = page.internal.pageSize
    let sH = dimensions.getWidth() / NUMBER_OF_COLUMNS
    let sV = dimensions.getHeight() / NUMBER_OF_ROWS
    let side = Math.min(sH, sV - letterHeight)
    let dH = (sH - side) / 2
    let dV = (sV - (side + letterHeight)) / 2
    for (let y = 0; y < NUMBER_OF_ROWS; ++y) {
      for (let x = 0; x < NUMBER_OF_COLUMNS; ++x) {
        if (tileIndex < tiles.length) {
          let tile = tiles[tileIndex]
          if (tile.content !== '') {
            let imageUrl = await qrCode.toDataURL(tile.content)
            document.addImage(
              imageUrl, 'PNG', x * sH + dH, y * sV + dV, side, side)
          }
          if (tile.header !== '') {
            let width = page.getTextWidth(tile.header)
            document.text(
              tile.header, x * sH + dH + (sH - width) / 2, y * sV + dV + side)
          }
          tileIndex += 1
        }
      }
    }
    for (let y = 1; y < NUMBER_OF_ROWS; ++y) {
      page.line(0, y * sV, dimensions.getWidth(), y * sV)
    }
    for (let x = 1; x < NUMBER_OF_COLUMNS; ++x) {
      page.line(x * sH, 0, x * sH, dimensions.getHeight())
    }
  }
  document.autoPrint()
  document.output('dataurlnewwindow')
}
