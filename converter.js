import MESSAGES from './messages.json' with { type: "json" }

export default class Converter {

    fromDirectionToBinary(direction) {
        return direction == 0 ? 1 : 0
    }

    convertMessageToBinary(message) {
        return MESSAGES[message].map(line => [...line]
            .map(direction => this.fromDirectionToBinary(direction))
        )
    }

}