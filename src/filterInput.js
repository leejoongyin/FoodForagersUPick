import {GROUP_CODE_VALID_CHARS} from './constants';

export function filterDigits ( input ) {
    const digits = "0123456789";
    var output = "";
    for( var i = 0; i < input.length; i++ ) {
        if( digits.indexOf(input[i]) > -1 ) {
            output += input[i];
        }
    }
    return output;
}

export function filterAmountInput ( input ) {
    return getAmountString( input );
}

export function getAmountString ( input ) {
    var numString = "000" + filterDigits(input);
    var output = "";
    var nonZeroSeen = false;
    for ( var i = 0; i < numString.length; i++ ) {
        if( numString[i] != '0' ) {
            nonZeroSeen = true;
        }

        if ( i == numString.length - 2 ){
            output += ".";
        }
        if( i >= numString.length - 3 || nonZeroSeen) {
            output += numString[i];
        }
        
    }
    return "$"+output;
}

export function filterDateInput ( input ) {
    return getDateString( input );
}

export function getDateString( input ) {
    var numString = ("00000000" + filterDigits( input ));
    numString = numString.substring(numString.length-8);
    var output = "";
    for ( var i = 0; i < numString.length; i++ ) {
        if ( i == numString.length - 4 || i == numString.length - 6 ){
            output += "/";
        }
        output += numString[i];
        
    }
    return output;
}

export function filterGroupCodeInput ( input ) {
    var output = "";
    input = input.toUpperCase();
    for( var i = 0; i < input.length; i++ ) {
        if( GROUP_CODE_VALID_CHARS.indexOf( input[i] ) > -1  ) {
            output += input[i];
        }
    }
    //console.log(input, " >filter> ", output );
    return output; 
}

