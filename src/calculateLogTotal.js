import { filterAmountInput, filterDigits } from './filterInput';
import flatListData from './flatListData';

calculateLogTotal = (e) =>  {
    var total = 0;
    if ( e == null ) {
        return "0.00";
    }
    e.forEach((Element)=>{
        total += parseInt(filterDigits(Element.amount));
    })
    return filterAmountInput(""+total);

};

export default calculateLogTotal;