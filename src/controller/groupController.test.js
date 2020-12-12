import groupController from './groupController';

describe('test groupController',()=>{
    it('test check()', ()=>{
        expect(groupController.checkCode('a')).toEqual(false);
    })
    it('test checkForm()', ()=>{
        expect(groupController.checkCodeForm('a')).toEqual(false);
    })
    it('test checkForCode: ', ()=>{
        expect(groupController.checkForCode('a')).toEqual(true);
    })
})