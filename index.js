import translator from './translator.js'
import filter from './filter.js'
import fileGenerator from './file-generator.js'

import MESSAGES from './input/messages.json' assert { type: 'json' }
import MESSAGES_BINARY from './input/messages-binary.json' assert { type: 'json' }

const data = translator.translate(MESSAGES)

const filteredData = filter.filterData(data)
// const filteredData = JSON.stringify(filter.filterData(data))

fileGenerator.generate(filteredData, `output/${new Date().getTime()}`, 'json')

console.log(filteredData['east-1']);
