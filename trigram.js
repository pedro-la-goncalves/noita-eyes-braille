export const TRIGRAM_METHODS = {
    WIKI: 'wiki',
    ZIGZAG: 'zigzag'
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
     * <1> <3>
     *   <2>
     */
    zigzagPointingDownTrigram(message, line, column) {
        let trigram = []

        if (message[line] != undefined && message[line][column] != undefined)
            trigram.push(message[line][column])

        if (message[line] != undefined && message[line + 1][column] != undefined)
            trigram.push(message[line + 1][column])

        if (message[line] != undefined && message[line][column + 1] != undefined)
            trigram.push(message[line][column + 1])

        return trigram
    },

    /**
     *    <6>
     *  <5> <4>
     */
    zigzagPointingUpTrigram(message, line, column) {
        let trigram = []

        if (message[line + 1] != undefined && message[line + 1][column + 1] != undefined) 
            trigram.push(message[line + 1][column + 1])

        if (message[line] != undefined && message[line][column + 2] != undefined) 
            trigram.push(message[line][column + 2])

        if (message[line + 1] != undefined && message[line + 1][column + 2] != undefined)
            trigram.push(message[line + 1][column + 2])

        return trigram
    },

    groupEyesAsTrigrams(message, method = TRIGRAM_METHODS.WIKI) {
        let trigramMessage = []

        for (let line = 0; line < message.length; line += 2) {            
            for (let column = 0; column < message[line].length; column += 3) {
                if (method == TRIGRAM_METHODS.WIKI) {    
                    trigramMessage.push(this.wikiPointingDownTrigram(message, line, column))
                    trigramMessage.push(this.wikiPointingUpTrigram(message, line, column))
                } else if (method == TRIGRAM_METHODS.ZIGZAG) {    
                    trigramMessage.push(this.zigzagPointingDownTrigram(message, line, column))
                    trigramMessage.push(this.zigzagPointingUpTrigram(message, line, column))
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