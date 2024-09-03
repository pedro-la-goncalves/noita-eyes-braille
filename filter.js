import _ from 'lodash'

export default {

    filterData(data, filter = undefined) {
        let filteredData = {}
        
        Object.entries(data).forEach(([key, value]) => {
            filteredData[key] = filter ? _.get(value, filter) : value
        })
        
        return filteredData
    }
}