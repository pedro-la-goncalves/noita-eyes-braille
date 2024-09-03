export const TRIGRAM_METHODS = {
    WIKI: 'WIKI',
    ZIGZAG: 'ZIGZAG',
    ZIGGAZ: 'ZIGGAZ',
}

export default {

    /**
     * <1> <2>
     *   <3>
     */
    wikiPointingDownTrigram(message, line, column) {
        let trigram = []

        if (message[line] != undefined && message[line][column] != undefined)
            trigram.push(message[line][column])

        if (message[line] != undefined && message[line][column + 1] != undefined)
            trigram.push(message[line][column + 1])

        if (message[line + 1] != undefined && message[line + 1][column] != undefined)
            trigram.push(message[line + 1][column])

        return trigram
    },

    /**
     *    <6>
     *  <5> <4>
     */
    wikiPointingUpTrigram(message, line, column) {
        let trigram = []

        if (message[line + 1] != undefined && message[line + 1][column + 2] != undefined) 
            trigram.push(message[line + 1][column + 2])

        if (message[line + 1] != undefined && message[line + 1][column + 1] != undefined) 
            trigram.push(message[line + 1][column + 1])

        if (message[line] != undefined && message[line][column + 2] != undefined)
            trigram.push(message[line][column + 2])

        return trigram
    },

    /**
     * <1> <3> <5>
     *   <2> <4> <6>
     */
    zigzagTrigramPair(splittedMessage, line, column) {
        let firstTrigram = []
        let secondTrigram = []

        if (splittedMessage[line][column] != undefined) firstTrigram.push(splittedMessage[line][column])
        if (splittedMessage[line + 1][column] != undefined) firstTrigram.push(splittedMessage[line + 1][column])
        if (splittedMessage[line][column + 1] != undefined) firstTrigram.push(splittedMessage[line][column + 1])

        if (splittedMessage[line + 1][column + 1] != undefined) secondTrigram.push(splittedMessage[line + 1][column + 1])
        if (splittedMessage[line][column + 2] != undefined) secondTrigram.push(splittedMessage[line][column + 2])
        if (splittedMessage[line + 1][column + 2] != undefined) secondTrigram.push(splittedMessage[line + 1][column + 2])

        return [...firstTrigram, ...secondTrigram]
    },

    groupEyesAsTrigrams(message, method = 'wiki') {
        let trigramMessage = []

        for (let line = 0; line < message.length; line += 2) {            
            for (let column = 0; column < message[line].length; column += 3) {                  
                if (method.toUpperCase() === TRIGRAM_METHODS.WIKI) {
                    trigramMessage.push(this.wikiPointingUpTrigram(message, line, column))
                    trigramMessage.push(this.wikiPointingDownTrigram(message, line, column))
                }
            }
        }

        return trigramMessage.filter(line => line.length > 0)
    },

    groupTrigramsAsPairs(message) {
        let trigramPairedMessage = []

        for (let trigramIndex = 0; trigramIndex < message.length; trigramIndex += 2) {
            let pairedTrigrams = []

            pairedTrigrams.push(message[trigramIndex])

            if (message[trigramIndex + 1]) pairedTrigrams.push(message[trigramIndex + 1])

            trigramPairedMessage.push(pairedTrigrams)
        }

        return trigramPairedMessage
    }
}