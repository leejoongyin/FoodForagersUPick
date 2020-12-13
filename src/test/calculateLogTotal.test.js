import calculateLogTotal from './calculateLogTotal';

describe("test calculateLogTotal", ()=>{
    var budget=[{ amount: '1.00', description: 'A', date: '12/22/2000'},{ amount: '1.00', description: 'A', date: '12/22/2000'}]
    it("test", ()=>{
        expect(calculateLogTotal( budget )).toEqual("2.00")
    })

    var empty = []
    it ("test empty budget", ()=>{
        expect(calculateLogTotal( empty )).toEqual('0.00')
    })

    it("test null", ()=>{
        expect(calculateLogTotal( null )).toEqual('0.00')
    })
})
