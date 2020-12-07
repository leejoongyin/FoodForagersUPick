import { filterAmountInput, filterDateInput, filterGroupCodeInput } from './filterInput';

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
    
}) 

describe("test filterAmountInput", ()=>{
    it("test valid chars", ()=>{
        expect( filterAmountInput("01")).toEqual("0.01");
    }); 
    it("test invalid chars", ()=>{
        expect( filterAmountInput("AB")).toEqual("0.00");
    }); 
    
}) 

describe("test filterDateInput", ()=>{
    it("test valid chars", ()=>{
        expect( filterDateInput("01")).toEqual("00/00/0001");
    }); 
    it("test invalid chars", ()=>{
        expect( filterDateInput("AB")).toEqual("00/00/0000");
    }); 
    
}) 