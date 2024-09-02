import MESSAGES from './messages.json' with { type: "json" }


export default class Trigrams {

    /**
     * <1> <2> <6>
     *   <3> <5> <4>
     */
    wikiTrigramsMethod(splittedMessage, line, column) {
        let trigram = []

        if (splittedMessage[line][column] != undefined) trigram.push(splittedMessage[line][column])
        if (splittedMessage[line][column + 1] != undefined) trigram.push(splittedMessage[line][column + 1])
        if (splittedMessage[line + 1][column] != undefined) trigram.push(splittedMessage[line + 1][column])

        if (splittedMessage[line + 1][column + 2] != undefined) trigram.push(splittedMessage[line + 1][column + 2])
        if (splittedMessage[line + 1][column + 1] != undefined) trigram.push(splittedMessage[line + 1][column + 1])
        if (splittedMessage[line][column + 2] != undefined) trigram.push(splittedMessage[line][column + 2])

        return trigram
    }

    /**
     * <1> <3> <5>
     *   <2> <4> <6>
     */
    pedrolaTrigramsMethod(splittedMessage, line, column) {
        let trigram = []

        if (splittedMessage[line][column] != undefined) trigram.push(splittedMessage[line][column])
        if (splittedMessage[line + 1][column] != undefined) trigram.push(splittedMessage[line + 1][column])
        if (splittedMessage[line][column + 1] != undefined) trigram.push(splittedMessage[line][column + 1])

        if (splittedMessage[line + 1][column + 1] != undefined) trigram.push(splittedMessage[line + 1][column + 1])
        if (splittedMessage[line][column + 2] != undefined) trigram.push(splittedMessage[line][column + 2])
        if (splittedMessage[line + 1][column + 2] != undefined) trigram.push(splittedMessage[line + 1][column + 2])

        return trigram
    }

    groupEyesAsTrigrams(message) {
        let trigramMessage = []

        let splittedMessage = message.map(line => [...line].map(direction => direction));

        for (let line = 0; line < message.length; line += 2) {            
            for (let column = 0; column < splittedMessage[line].length; column += 3) {
                // this.pedrolaTrigramsMethod(splittedMessage, line, column)
                // this.wikiTrigramsMethod(splittedMessage, line, column)
                    
                if (!Array.isArray(trigramMessage[line])) trigramMessage[line] = []
                
                trigramMessage[line].push(...this.pedrolaTrigramsMethod(splittedMessage, line, column))
            }
        }

        return trigramMessage.filter(line => line.length > 0)
    }
}