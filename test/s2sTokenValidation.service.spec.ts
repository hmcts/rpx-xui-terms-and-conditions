import 'mocha'
import { expect } from 'chai'
import * as sinon from 'sinon'
import request from 'supertest'

import { http, validateS2sToken } from '../server/api/services/s2sTokenValidation.service'

describe('S2S token validation service ', function() {
    let res
    let spy: any
    let spyGet: any

    beforeEach(() => {
        res = {
            data: 'application name',
        }
        spyGet = sinon.stub(http, 'get').callsFake(() => {
            return Promise.resolve(res)
        })
    })

    afterEach(() => {
        spyGet.restore()
    })

    it('Should make a http.get call ', async () => {
        expect(await validateS2sToken('testurl','testtoken')).to.equal('application name')
    })

})

