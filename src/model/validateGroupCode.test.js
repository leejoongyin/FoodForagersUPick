import validateGroupCode from './validateGroupCode';

describe('test validateGroupCode',()=>{
    it('test check()', ()=>{
        expect(validateGroupCode.check('a')).toEqual(false);
    })
    it('test checkForm()', ()=>{
        expect(validateGroupCode.checkForm('a')).toEqual(false);
    })
})