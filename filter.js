import DATA from './data.json' assert { type: 'json' }

const filteredData = {}

Object.entries(DATA).forEach(([key, value]) => {
    filteredData[key] = value['number-of-trigrams']
})

console.log(filteredData)