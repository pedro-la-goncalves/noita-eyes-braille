export default {
    /**
     * convert directions into binary, where:
     * 1 | 2 | 3 | 4 ---> 0
     *       0       ---> 1
     */
    convertMessageIntoBinary(message) {
        return message.map(line => [...line]
            .map(direction => direction == 0 ? 1 : 0)
        )
    },
    
    /**
     * convert directions into binary, where:
     * 1 | 2 | 3 | 4 ---> 1
     *       0       ---> 0
     */
    convertMessageIntoInvertedBinary(message) {
        return message.map(line => [...line]
            .map(direction => direction != 0 ? 1 : 0)
        )
    },
}