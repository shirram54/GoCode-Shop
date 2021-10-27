import React, { useState } from 'react';
import './Counter.css';


function Counter() {
    const [count, setCount] = useState(true);

    return (
        <div className="App">
            <button className="btn" onClick={() => setCount(!count)}>Click me</button>
            {count && <div>you clicked the button!</div>}
        </div>
    );
}


export default Counter;





