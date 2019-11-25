import 'mocha'
import { expect } from 'chai'
import * as sinon from 'sinon'
import request from 'supertest'

import { http, validateUserToken } from '../server/api/services/userTokenValidation.service'

describe('User token validation service ', function() {
    let res
    let spy: any
    let spyGet: any

    beforeEach(() => {
        res = {
            data: 'user details',
        }
        spyGet = sinon.stub(http, 'get').callsFake(() => {
            return Promise.resolve(res)
        })
    })

    afterEach(() => {
        spyGet.restore()
    })

    it('Should make a http.get call ', async () => {
        expect(await validateUserToken('testurl','testtoken')).to.equal('user details')
    })

})

