import braille from './braille.js'
import trigram, { TRIGRAM_METHODS } from './trigram.js'
import binary from './binary.js'

import MESSAGES from './messages.json' assert { type: 'json' }

export default {

    translate() {

        let data = {}

        for (let message in MESSAGES) {
            
            const messageBinary = binary.convertMessageIntoBinary(MESSAGES[message])

            const messageBinaryInverted = binary.convertMessageIntoInvertedBinary(MESSAGES[message])

            data[message] = {
                "message": MESSAGES[message].map(line => [...line].map(direction => Number(direction))),
                "message-binary": messageBinary,
                "message-binary-inverted": messageBinaryInverted,
            }

            Object.keys(TRIGRAM_METHODS).every(method => {
                const trigramsBinary = trigram.groupEyesAsTrigrams(messageBinary, method)

                const trigramsQuantity = trigramsBinary.length

                if (message == 'west-1') console.log(trigramsQuantity);
                
                const trigramsBinaryPaired = trigram.groupTrigramsAsPairs(trigramsBinary)
            
                const dots = braille.convertPairedBinaryTrigramsIntoDots(trigramsBinaryPaired)
                
                const brailleMessage = braille.toBraille(dots)
            
                const text = braille.toText(dots)

                data[message][method] = {
                    "trigrams-quantity": trigramsQuantity,
                    "trigrams-binary": trigramsBinary,
                    "trigrams-binary-paired": trigramsBinaryPaired,
                    "dots": dots,
                    "braille": brailleMessage,
                    "text": text,
                }
            })

            // // group binary eyes into trigrams
            // const invertedWikiBinaryTrigramPairs = trigram.groupEyesAsTrigramPairs(invertedBinaryMessage, 'wiki')

            // // convert binary trigrams into dots
            // const invertedWikiTrigramDots = braille.convertPairedTrigramsIntoDots(invertedWikiBinaryTrigramPairs)

            // // convert dots into braille
            // const invertedWikiBrailleMessage = braille.toBraille(invertedWikiTrigramDots);

            // // convert braille into text
            // const invertedWikiMessageText = braille.toText(invertedWikiTrigramDots)

        }

        return data;

    }

}