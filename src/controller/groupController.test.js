import groupController from './groupController';

describe('test groupController',()=>{
    it('test checkForCode: ', ()=>{
        expect(groupController.checkForCode('a')).toEqual(true);
    })
})