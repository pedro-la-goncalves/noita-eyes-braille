import translator from './translator.js'
import filter from './filter.js'
import fileGenerator from './file-generator.js'

import MESSAGES from './input/messages.json' assert { type: 'json' }

// translates the messages
const data = translator.translate(MESSAGES)

// filters for specific data of each message
// const dataFilteredBySubitem = filter.filterData(data, 'zeroes-as-ones.message-as-binary')
// const dataFilteredBySubitem = filter.filterData(data, 'zeroes-as-ones.wiki.braille-characters')
const dataFilteredBySubitem = filter.filterData(data)

// filters for data for each message
// const dataFilteredByMessage = dataFilteredBySubitem['west-1']
const dataFilteredByMessage = dataFilteredBySubitem

// generates an output data file
fileGenerator.generate(dataFilteredByMessage, `output/${new Date().getTime()}`, 'json')

// prints in the console
console.log(dataFilteredByMessage);
