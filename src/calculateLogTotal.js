import { filterAmountInput, filterDigits } from './filterInput';
import flatListData from './flatListData';

calculateLogTotal = () =>  {
    var total = 0;
    flatListData.forEach((Element)=>{
        total += parseInt(filterDigits(Element.amount));
    })
    return filterAmountInput(""+total);

};

export default calculateLogTotal;