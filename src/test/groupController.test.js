import { GROUP_CODE_LENGTH } from '../constants';
import groupController from '../controller/groupController';

describe('test groupController',()=>{
    it('test check()', ()=>{
        expect(groupController.checkCode('a')).toEqual(false);
    })
    it('test checkForm()', ()=>{
        expect(groupController.checkCodeForm('a')).toEqual(false);
    })
    it('test generateCode()',()=>{
        expect(groupController.checkCodeForm(groupController.generateCode(GROUP_CODE_LENGTH))).toEqual(true);
    })
})
