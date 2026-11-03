import React from 'react';
import ReactDOM from 'react-dom/client';
import {Display_Inventory, AddInventory} from './to_inventory';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <>
        <Display_Inventory/>
        <AddInventory/>
    </>
);
