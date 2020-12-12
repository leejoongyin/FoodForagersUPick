import {GROUP_CODE_LENGTH, GROUP_CODE_VALID_CHARS} from '../constants';
export class groupController {
    static checkCodeExists = ( code ) => {
        console.log("groupController: " + code);
        return true;
    }

    static checkCodeForm = ( code ) => {
            
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

    static checkCode = ( code ) => {
        console.log("model: validateGroupCode: code: (" + code + ")" );
        if ( !this.checkCodeForm( code ) ) {
            return false;
        }
        if( !this.checkCodeExists( code ) ) {
            return false; 
        }
        console.log("model: validateGroupCode: out: " + true );
        return true;
    }

    static generateRandomCode = (length) => {
        var result           = '';
        var characters       = GROUP_CODE_VALID_CHARS;
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    static generateCode = (length) =>{
        var code = this.generateRandomCode(length);
        /*
        while ( this.checkCodeExists(code) ) {
            var code = this.generateRandomCode(length);
        } */  
        return code;
    }
}

export default groupController;