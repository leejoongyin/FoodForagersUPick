import React from "react";

export default class DynamicTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: "",
            items: []
        }
    }

    updateMessage(event) {
        this.setState({
            message: event.target.value
        });
    }

    handleClick(){
        var items = this.state.items;
        items.push(this.state.message);
        this.setState({
            items: items
        });
    }

    renderRows(){
        var context = this;

        return this.state.items.map(function(o,i){
            return (
                <tr key={"item-" + i}>
                    <td>
                        <input
                            type="text"
                            value={o}
                            onChange={context.handleItemsChanged.bind(context,i)}
                            />
                    </td>
                    <td>
                        <button onCLick={context.handleItemDelete.bind(context,i)}>
                            Delete
                        </button>
                    </td>
                </tr>
            );
        });
    }

    handleItemsChanged(i,event) {
        var items = this.state.items;

        items[i] = event.target.value;

        this.setState({
            items:items
        });
    }

    handleItemDelete(i){
        var items = this.state.items;

        items.splice(i,1);
        this.setState({
            items:items
        });
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>Transaction History</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
                <hr/>
                <input type="text" onChange={this.updateMessage.bind(this)}/>
                <button onClick={this.handleClick.bind(this)}>
                    Add Item
                </button>
            </div>
        );
    }
}