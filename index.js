import MESSAGES from './messages.json' assert { type: 'json' }

import * as fs from 'fs';

import braille from './braille.js'
import trigram, { TRIGRAM_METHODS } from './trigram.js'
import binary from './binary.js'

let data = {}

for (let message in MESSAGES) {
    
    const messageBinary = binary.convertMessageIntoBinary(MESSAGES[message])

    const messageBinaryInverted = binary.convertMessageIntoInvertedBinary(MESSAGES[message])

    data[message] = {
        "message": MESSAGES[message].map(line => [...line].map(direction => Number(direction))),
 
        "message-binary": messageBinary,
        "message-binary-inverted": messageBinaryInverted,
    }

    Object.keys(TRIGRAM_METHODS).forEach(method => {
        const trigramsBinary = trigram.groupEyesAsTrigrams(messageBinary, method)
        
        const trigramsQuantity = trigramsBinary.flat().length
    
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

    // store all data
    // data[message] = {
    //     'eyes-as-directions': MESSAGES[message],
    //     'eyes-as-binary': binaryMessage,
    //     'eyes-as-inverted-binary': invertedBinaryMessage,
    //     'number-of-trigrams': trigramsQuantity,

    //     'wiki': {
    //         'binary-trigrams': wikiBinaryTrigramPairs,
    //         'braille-dot-trigrams': wikiTrigramDots,
    //         'braille': wikiBrailleMessage,
    //         'text': wikiMessageText,

    //         'inverted': {
    //             'binary-trigrams': invertedWikiBinaryTrigramPairs,
    //             'braille-dot-trigrams': invertedWikiTrigramDots,
    //             'braille': invertedWikiBrailleMessage,
    //             'text': invertedWikiMessageText,
    //         }
    //     },

    //     'pedrola': {
    //         'binary-trigrams': pedrolaBinaryTrigrams,
    //         'braille-dot-trigrams': pedrolaTrigramDots,
    //         'braille': pedrolaBrailleMessage,
    //         'text': pedrolaMessageText,

    //         'inverted': {
    //             'binary-trigrams': invertedPedrolaBinaryTrigrams,
    //             'braille-dot-trigrams': invertedPedrolaTrigramDots,
    //             'braille': invertedPedrolaBrailleMessage,
    //             'text': invertedPedrolaMessageText,
    //         }
    //     }
    // }

}

fs.writeFile('data.json', JSON.stringify(data), 'utf8', () => console.info('File created!'))
