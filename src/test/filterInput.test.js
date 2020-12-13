import { filterAmountInput, filterDateInput, filterGroupCodeInput } from '../controller/filterInput';

describe("test filterGroupCodeInput", ()=>{
    it("test invalid chars", ()=>{
        expect( filterGroupCodeInput("01")).toEqual("");
    });
    it("test valid chars", ()=>{
        expect( filterGroupCodeInput("AB")).toEqual("AB");
    });
    it("test lowercase chars", ()=>{
        expect( filterGroupCodeInput("ab")).toEqual("AB");
    });
    it("test empty", ()=>{
        expect( filterGroupCodeInput("")).toEqual("");
    });

})

describe("test filterAmountInput", ()=>{
    it("test valid chars", ()=>{
        expect( filterAmountInput("01")).toEqual("0.01");
    });
    it("test invalid chars", ()=>{
        expect( filterAmountInput("AB")).toEqual("0.00");
    });
    it("test empty", ()=>{
        expect( filterAmountInput("")).toEqual("0.00");
    });

})

describe("test filterDateInput", ()=>{
    it("test valid chars", ()=>{
        expect( filterDateInput("01")).toEqual("00/00/0001");
        expect( filterDateInput("12/22/2000")).toEqual("12/22/2000");
        expect( filterDateInput("12222000")).toEqual("12/22/2000");
    });
    it("test invalid chars", ()=>{
        expect( filterDateInput("AB")).toEqual("00/00/0000");
    });
    it("test overflow", ()=>{
        expect( filterDateInput("12312222000")).toEqual("12/22/2000");
    });
    it("test empty", ()=>{
        expect( filterDateInput("")).toEqual("00/00/0000");
    });

})
