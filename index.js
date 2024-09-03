import translator from './translator.js'
import filter from './filter.js'
import fileGenerator from './file-generator.js'

const data = translator.translate()

const filteredData = filter.filterData(data, 'WIKI.trigrams-quantity')
// const filteredData = JSON.stringify(filter.filterData(data, 'WIKI.trigrams-binary-paired'))

fileGenerator.generate(data, 'data', 'json')

console.log(filteredData);
