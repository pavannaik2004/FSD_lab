import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Display_Inventory() {
    const [res, setres] = useState([]);

    const resp = async () => {
        const response = await axios.get("http://localhost:8000");
        setres(response.data);
    };

    useEffect(() => { resp(); }, []);

    return (
        <div>
            <h1>Inventory Management</h1>
            <table border="1">
                <tbody>
                    <tr>
                        <th>ID</th><th>Name</th><th>Qty</th><th>Price</th>
                    </tr>
                    {res.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.prodname}</td>
                            <td>{item.qty}</td>
                            <td>{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function AddInventory() {
    const [id,setId] = useState('');
    const [name,setName] = useState('');
    const [qty,setQty] = useState('');
    const [price,setPrice] = useState('');

    const SubmitEvent = async () => {
        await axios.post("http://localhost:8000/add",
            {id:Number(id), prodname:name, qty:Number(qty), price:Number(price)});
        window.location.reload();
    };

    return (
        <div>
            <h1>Add Inventory</h1>
            ID: <input type="number" onChange={e=>setId(e.target.value)}/><br/>
            Name: <input onChange={e=>setName(e.target.value)}/><br/>
            Qty: <input type="number" onChange={e=>setQty(e.target.value)}/><br/>
            Price: <input type="number" onChange={e=>setPrice(e.target.value)}/><br/>
            <button onClick={SubmitEvent}>Submit</button>
        </div>
    );
}

export {Display_Inventory, AddInventory};
