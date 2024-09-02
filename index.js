import Converter from './converter.js'
import Trigrams from './trigrams.js'
import Braille from './braille.js'

const converter = new Converter()
const trigrams = new Trigrams()
const braille = new Braille()

const east1BinaryEyes = converter.convertMessageToBinary("east-1")
const east1BinaryTrigrams = trigrams.groupEyesAsTrigrams(east1BinaryEyes)

braille.createMessage(east1BinaryTrigrams)
