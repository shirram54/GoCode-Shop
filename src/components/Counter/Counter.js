import React, { useState } from 'react';
import './Counter.css';


function Counter() {
    const [count, setCount] = useState(true);

    return (
        <div className="App">
            <button className="btn" onClick={() => setCount(!count)}>Welcome msg</button>
            {count && <div>Welcome to GoCode Shop</div>}
        </div>
    );
}


export default Counter;





