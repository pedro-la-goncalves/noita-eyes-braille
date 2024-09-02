export default {


    fromDirectionToBinary(direction, inverted = false) {
        if (inverted) {
            return direction != 0 ? 1 : 0
        }
        
        return direction == 0 ? 1 : 0
    },

    convertMessageToBinary(message, inverted = false) {
        return message.map(line => [...line]
            .map(direction => this.fromDirectionToBinary(direction, inverted))
        )
    },

    invertBinaryMessage(message) {
        return message.map(line => line.map(column => column == 0 ? 1 : 0))
    },

}