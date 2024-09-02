import MESSAGES from './messages.json' with { type: "json" }

export default class BrailleConverter {

    convertDirectionToBinary(direction) {
        return direction == 0 ? 1 : 0
    }

    convertMessageToBinary(message) {
        return MESSAGES[message].map(line => [...line]
            .map(direction => this.convertDirectionToBinary(direction))
        )
    }

    groupEyesAsTrigrams(message) {
        let trigramMessage = []

        let splittedMessage = message.map(line => [...line].map(direction => direction));

        for (let line = 0; line < message.length; line += 2) {            
            for (let column = 0; column < splittedMessage[line].length; column += 3) {
                let trigram = []

                if (splittedMessage[line][column] != undefined) trigram.push(splittedMessage[line][column])
                if (splittedMessage[line + 1][column] != undefined) trigram.push(splittedMessage[line + 1][column])
                if (splittedMessage[line][column + 1] != undefined) trigram.push(splittedMessage[line][column + 1])

                if (splittedMessage[line + 1][column + 1] != undefined) trigram.push(splittedMessage[line + 1][column + 1])
                if (splittedMessage[line][column + 2] != undefined) trigram.push(splittedMessage[line][column + 2])
                if (splittedMessage[line + 1][column + 2] != undefined) trigram.push(splittedMessage[line + 1][column + 2])
                    
                if (!Array.isArray(trigramMessage[line])) trigramMessage[line] = []
                
                trigramMessage[line].push(trigram)
            }
        }

        return trigramMessage.filter(line => line.length > 0)
    }

}