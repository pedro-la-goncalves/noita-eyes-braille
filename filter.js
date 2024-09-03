import _ from 'lodash'

export default {

    filterData(data, filter) {
        let filteredData = {}
        
        Object.entries(data).forEach(([key, value]) => {
            filteredData[key] = _.get(value, filter)
        })
        
        return filteredData
    }
}