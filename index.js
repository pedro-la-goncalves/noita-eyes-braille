import MESSAGES from './messages.json' assert { type: 'json' }

import * as fs from 'fs';

import braille from './braille.js'
import trigram from './trigram.js'
import binary from './binary.js'

let data = {}

for (let message in MESSAGES) {
    
    /**
     * convert directions into binary, where:
     * 1 | 2 | 3 | 4 ---> 0
     *       0       ---> 1
     */
    const binaryEyes = binary.convertMessageToBinary(MESSAGES[message])

    /**
     * convert directions into binary, where:
     * 1 | 2 | 3 | 4 ---> 1
     *       0       ---> 0
     */
    const invertedBinaryEyes = binary.convertMessageToBinary(MESSAGES[message], true)




    /**
     * using the wiki's order to generate trigrams
     * <1> <2> <6>
     *   <3> <5> <4>
     */

    // group binary eyes into trigram pairs
    const wikiBinaryTrigrams = trigram.groupEyesAsTrigrams(binaryEyes, 'wiki')

    const trigramsQuantity = wikiBinaryTrigrams.flat().length;

    const wikiBinaryTrigramPairs = trigram.groupEyesAsTrigramPairs(binaryEyes, 'wiki')

    // convert binary trigrams into dots
    const wikiTrigramDots = braille.convertTrigramsToDots(wikiBinaryTrigramPairs)

    // convert dots into braille
    const wikiBrailleMessage = braille.toBraille(wikiTrigramDots);

    // convert braille into text
    const wikiMessageText = braille.toText(wikiTrigramDots)

    // group binary eyes into trigrams
    const invertedWikiBinaryTrigramPairs = trigram.groupEyesAsTrigramPairs(invertedBinaryEyes, 'wiki')

    // convert binary trigrams into dots
    const invertedWikiTrigramDots = braille.convertTrigramsToDots(invertedWikiBinaryTrigramPairs)

    // convert dots into braille
    const invertedWikiBrailleMessage = braille.toBraille(invertedWikiTrigramDots);

    // convert braille into text
    const invertedWikiMessageText = braille.toText(invertedWikiTrigramDots)



    /**
     * using my own order to generate trigrams
     * <1> <3> <5>
     *   <2> <4> <6>
     */

    // group binary eyes into trigrams
    const pedrolaBinaryTrigrams = trigram.groupEyesAsTrigramPairs(binaryEyes, 'pedrola')

    // convert binary trigrams into dots
    const pedrolaTrigramDots = braille.convertTrigramsToDots(pedrolaBinaryTrigrams)

    // convert dots into braille
    const pedrolaBrailleMessage = braille.toBraille(pedrolaTrigramDots);

    // convert braille into text
    const pedrolaMessageText = braille.toText(pedrolaTrigramDots)

    // group binary eyes into trigrams
    const invertedPedrolaBinaryTrigrams = trigram.groupEyesAsTrigramPairs(invertedBinaryEyes, 'pedrola')

    // convert binary trigrams into dots
    const invertedPedrolaTrigramDots = braille.convertTrigramsToDots(invertedPedrolaBinaryTrigrams)

    // convert dots into braille
    const invertedPedrolaBrailleMessage = braille.toBraille(invertedPedrolaTrigramDots);

    // convert braille into text
    const invertedPedrolaMessageText = braille.toText(invertedPedrolaTrigramDots)



    // store all data
    data[message] = {
        'eyes-as-directions': MESSAGES[message],
        'eyes-as-binary': binaryEyes,
        'eyes-as-inverted-binary': invertedBinaryEyes,
        'number-of-trigrams': trigramsQuantity,

        'wiki': {
            'binary-trigrams': wikiBinaryTrigramPairs,
            'braille-dot-trigrams': wikiTrigramDots,
            'braille': wikiBrailleMessage,
            'text': wikiMessageText,

            'inverted': {
                'binary-trigrams': invertedWikiBinaryTrigramPairs,
                'braille-dot-trigrams': invertedWikiTrigramDots,
                'braille': invertedWikiBrailleMessage,
                'text': invertedWikiMessageText,
            }
        },

        'pedrola': {
            'binary-trigrams': pedrolaBinaryTrigrams,
            'braille-dot-trigrams': pedrolaTrigramDots,
            'braille': pedrolaBrailleMessage,
            'text': pedrolaMessageText,

            'inverted': {
                'binary-trigrams': invertedPedrolaBinaryTrigrams,
                'braille-dot-trigrams': invertedPedrolaTrigramDots,
                'braille': invertedPedrolaBrailleMessage,
                'text': invertedPedrolaMessageText,
            }
        }
    }

}

fs.writeFile('data.json', JSON.stringify(data), 'utf8', () => console.info('File created!'))
