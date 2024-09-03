import * as fs from 'fs';

export default {
    generate(data, filename, ext = 'json') {
        fs.writeFile(`${filename}.${ext}`, JSON.stringify(data), 'utf8', () => console.info('File created!'))
    }
}