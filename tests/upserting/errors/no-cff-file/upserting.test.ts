import { upsert_prereserved_doi } from '../../../../src/upserting/'
import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'
import { AssertionError } from 'assert'


let temporary_directory: string;

beforeEach(() => {
    temporary_directory = fs.mkdtempSync(`${os.tmpdir()}${path.sep}zenodraft-action-testing.`)
    process.chdir(temporary_directory)
})


test('upserting a doi',() => {

    const upsert_location = 'doi'
    const prereserved_doi = '10.5281/upserted.1234567'

    const throwfun = () => {
        upsert_prereserved_doi(upsert_location, prereserved_doi)
    }
    expect(throwfun).toThrow(AssertionError)
    try {
        throwfun()
    } catch (err) {
        expect(err.message).toBe('File CITATION.cff doesn\'t exist.')
    }
})


afterEach(() => {
    fs.rmSync(temporary_directory, { recursive: true });
})
