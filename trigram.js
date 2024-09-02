import { log } from "console"

export default {

    /**
     * <1> <2> <6>
     *   <3> <5> <4>
     */
    wikiTrigramPair(message, line, column) {
        // let trigramPair = []

        // if (message[line][column] != undefined) trigramPair.push(message[line][column])
        // if (message[line][column + 1] != undefined) trigramPair.push(message[line][column + 1])
        // if (message[line + 1][column] != undefined) trigramPair.push(message[line + 1][column])

        // if (message[line + 1][column + 2] != undefined) trigramPair.push(message[line + 1][column + 2])
        // if (message[line + 1][column + 1] != undefined) trigramPair.push(message[line + 1][column + 1])
        // if (message[line][column + 2] != undefined) trigramPair.push(message[line][column + 2])

        // console.log([
        //     ...this.wikiPointingDownTrigram(message, line, column),
        //     ...this.wikiPointingUpTrigram(message, line, column)
        // ]);
        

        // return trigramPair

        return [
            ...this.wikiPointingDownTrigram(message, line, column),
            ...this.wikiPointingUpTrigram(message, line, column)
        ]
    },

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
    pedrolaTrigramPair(splittedMessage, line, column) {
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

    groupEyesAsTrigramPairs(message, method = 'wiki') {
        let trigramMessage = []

        for (let line = 0; line < message.length; line += 2) {            
            for (let column = 0; column < message[line].length; column += 3) {                  
                if (!Array.isArray(trigramMessage[line])) trigramMessage[line] = []
                
                let trigram = method == 'wiki' ? this.wikiTrigramPair(message, line, column) : this.pedrolaTrigramPair(message, line, column)
            
                trigramMessage[line].push(trigram)
            }
        }

        return trigramMessage.filter(line => line.length > 0)
    },

    groupEyesAsTrigrams(message, method = 'wiki') {
        let trigramMessage = []

        for (let line = 0; line < message.length; line += 2) {            
            for (let column = 0; column < message[line].length; column += 3) {                  
                if (!Array.isArray(trigramMessage[line])) trigramMessage[line] = []
                
                let pointingUpTrigram = method == 'wiki' ? this.wikiPointingUpTrigram(message, line, column) : this.pedrolaTrigramPair(message, line, column)
                let pointingDownTrigram = method == 'wiki' ? this.wikiPointingDownTrigram(message, line, column) : this.pedrolaTrigramPair(message, line, column)

                if (pointingUpTrigram.length > 0) 
                    trigramMessage[line].push(pointingUpTrigram)

                if (pointingDownTrigram.length > 0)
                    trigramMessage[line].push(pointingDownTrigram)
            }
        }

        return trigramMessage.filter(line => line.length > 0)
    }
}