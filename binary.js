export default {
    /**
     * convert directions into binary, where:
     * 1 | 2 | 3 | 4 ---> 0
     *       0       ---> 1
     */
    convertMessageToBinaryUsingZeroesAsOnes(message) {
        return message.map(line => [...line]
            .map(direction => direction == 0 ? 1 : 0)
        )
    },
    
    /**
     * convert directions into binary, where:
     * 1 | 2 | 3 | 4 ---> 1
     *       0       ---> 0
     */
    convertMessageToBinaryUsingZeroesAsZeroes(message) {
        return message.map(line => [...line]
            .map(direction => direction == 0 ? 0 : 1)
        )
    },
}