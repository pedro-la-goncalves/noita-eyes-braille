import MESSAGES from './messages.json' with { type: "json" }
import DRAWINGS from './eyes.json' with { type: "json" }

const MAXIMUM_OF_EYES_PER_LINE = 40
const HORIZONTAL_GAP_BETWEEN_EYES = 1
const VERTICAL_GAP_BETWEEN_EYES = 0
const EYE_WIDTH = 11
const EYE_HEIGHT = 7
const SCALE = 1

export default class Canvas {
    draw(message) {
        const canvas = this.createCanvasElement(MESSAGES[message]);
        const eyes = this.createEyes(canvas, MESSAGES[message])

        // this.createEye(canvas, 0, 0, 0)

        this.appendCanvasToContainer(canvas)
    }

    getQuantityOfCanvasElements() {
        return document.getElementsByTagName('canvas').length
    }

    createCanvasElement(message) {
        const canvas = document.createElement('canvas')       
        canvas.id = `canvas-${this.getQuantityOfCanvasElements() + 1}`
        canvas.width = EYE_WIDTH * MAXIMUM_OF_EYES_PER_LINE + (HORIZONTAL_GAP_BETWEEN_EYES * (MAXIMUM_OF_EYES_PER_LINE - 1)) 
        canvas.height = EYE_HEIGHT * message.length + (VERTICAL_GAP_BETWEEN_EYES * (message.length - 1))
        canvas.style.border = "solid 1px #000";

        return canvas
    }

    appendCanvasToContainer(canvas) {
        const body = document.getElementsByTagName("body")[0]
        body.appendChild(canvas)
    }

    createEye(canvas, rectX1, rectY1, eye) {       
        const drawing = DRAWINGS[eye]
        
        const ctx = canvas.getContext("2d")
        ctx.fillStyle = "#000000";

        drawing.forEach(line => 
            {
                [...line].forEach(column => {
                    if (column === '#') {

                        for (let y = 0; y < EYE_HEIGHT; y++) {
                            for (let x = 0; x < EYE_WIDTH; x++) {
                                
                                ctx.fillRect(rectX1 + x, rectY1 + y, SCALE, SCALE);

                            }
                        }

                    }
                }
            )}
        )
    }

    createEyes(canvas, message) {
        message.forEach((line, lineIndex) => 
            [...line].forEach((eye, eyeIndex) => 
                this.createEye(
                    canvas,
                    eyeIndex * (EYE_WIDTH + HORIZONTAL_GAP_BETWEEN_EYES),
                    lineIndex * (EYE_HEIGHT + VERTICAL_GAP_BETWEEN_EYES),
                    eye
                )
            )
        )
    }
}