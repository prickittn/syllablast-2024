/* import { Model, Puzzle, Syllable } from './model'


export function drawPuzzle (ctx:any, puzzle:Puzzle) {
    ctx.shadowColor = 'black'
    let selected = puzzle.selected

    puzzle.pieces?.forEach(piece => {
        let rect = computeRectangle(piece)
        if (piece === selected) {
            ctx.fillStyle = 'yellow'
        } else {
            if (piece.isWinner) {
                ctx.fillStyle = 'red';
            } else {
                ctx.fillStyle = 'lightblue';
            }
        }

        ctx.shadowBlur = 10;
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height)
    })
}


export function redrawCanvas(model:Model, canvasObj:any) {
    const ctx = canvasObj.getContext('2d')

    // during testing, might not actually be present because running in "offline" headless mode
    if (ctx) {
      ctx.clearRect(0, 0, canvasObj.width, canvasObj.height)

      let nr = model.puzzle.numRows
      let nc = model.puzzle.numColumns

      if (model.puzzle) {
        drawPuzzle(ctx, model.puzzle)
      }
    }
} */