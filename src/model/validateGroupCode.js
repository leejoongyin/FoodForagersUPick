import groupController from '../controller/groupController';
import {GROUP_CODE_LENGTH, GROUP_CODE_VALID_CHARS} from '../constants';

export class validateGroupCode {
    static check = ( code ) => {
        console.log("model: validateGroupCode: code: (" + code + ")" );
        if ( !this.checkForm( code ) ) {
            return false;
        }
        if( !groupController.checkForCode( code ) ) {
            return false; 
        }
        console.log("model: validateGroupCode: out: " + true );
        return true;
    }

    static checkForm = ( code ) => {
            
        if ( !code || code.length != GROUP_CODE_LENGTH ) {
            return false;
        }

        for( var i = 0; i < code.length; i++ ) {
            if( GROUP_CODE_VALID_CHARS.indexOf(code[i]) < 0 ) {
                return false;
            }
        }
        return true;
    }



}


export default validateGroupCode;
