import braille from './braille.js'
import trigram, { TRIGRAM_METHODS } from './trigram.js'
import binary from './binary.js'

export default {

    translate(messages) {
        
        let data = {}

        for (let message in messages) {
            
            const messageAsBinaryUsingZeroesAsOnes = binary.convertMessageToBinaryUsingZeroesAsOnes(messages[message])

            const messageAsBinaryUsingZeroesAsZeroes = binary.convertMessageToBinaryUsingZeroesAsZeroes(messages[message])

            const BINARY_INTERPRETATIONS = {
                "zeroes-as-ones": messageAsBinaryUsingZeroesAsOnes,
                "zeroes-as-zeroes": messageAsBinaryUsingZeroesAsZeroes,
            }

            Object.entries(BINARY_INTERPRETATIONS).forEach(([key, value]) => {

                data[message] = data[message] == undefined ? {} : data[message]

                data[message][key.toLocaleLowerCase()] = {
                    "message-as-binary": value
                }

                Object.keys(TRIGRAM_METHODS).forEach(method => {

                    const trigramsBinary = trigram.groupEyesAsTrigrams(value, TRIGRAM_METHODS[method])

                    const trigramsQuantity = trigramsBinary.length

                    const trigramsAsBinaryAndPaired = trigram.groupTrigramsAsPairs(trigramsBinary)
                
                    const dots = braille.convertPairedBinaryTrigramsIntoBrailleDots(trigramsAsBinaryAndPaired)
                    
                    const brailleCharacters = braille.convertDotsIntoBrailleCharacters(dots)
                
                    const text = braille.convertDotsIntoText(dots)

                    data[message][key.toLocaleLowerCase()] = data[message][key.toLocaleLowerCase()] == undefined
                        ? {}
                        : data[message][key.toLocaleLowerCase()]

                    data[message][key.toLocaleLowerCase()][TRIGRAM_METHODS[method]] = {
                        "trigrams-quantity": trigramsQuantity,
                        "trigrams-as-binary": trigramsBinary,
                        "trigrams-as-binary-and-paired": trigramsAsBinaryAndPaired,
                        "braille-dots": dots,
                        "braille-characters": brailleCharacters,
                        "text": text,
                    }

                })

            })

        }

        return data;

    }

}