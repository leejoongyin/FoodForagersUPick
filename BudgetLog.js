import React, { useState } from 'react';
import LogPopup from './LogPopup';
import '../App.css';
import {ButtonToolbar} from "react-bootstrap";
import DynamicTable from './table'
import {Text, View} from 'react';


export default function BudgetLog() {
        const [isOpen,setIsOpen] = useState(false)
        return (
            <div>
                <div className="Top">
                    <view>
                        <text style={greet}>This month, you've spent:</text>
                        <br/>
                        <text style={amount}> $00.00 </text>
                        <br/>
                    </view>
                    <button style={addNew} onClick={() => setIsOpen(true)}>Add new expense</button>
                    <LogPopup open={isOpen} onClose={() => setIsOpen(false)}>
                        <input type="number" placeholder="$ Amount" step=".01"/>
                        <input type="text" placeholder="Descripton"/>
                        <input type="date"/>
                    </LogPopup>
                </div>
                <div className = "Bottom">
                    <br/>
                    <div className = "List">
                    </div>
                </div>
            </div>
        )

}



    const greet = {
        textAlign: 'center',
        //left: '50%',
        color: '#6B222D',
        fontSize: 16,
    }

    const amount = {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'Bold',
        //left: '50%',
    }

    const tHistory = {
        textAlign: 'center',
    }

    const addNew = {
        textAlign: 'center',
    }

