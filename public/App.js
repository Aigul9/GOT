import React, {useState, useEffect} from 'react';

function App() {
    const [count, setCount] = useState(0); // initial value of count is 0
    // count is a variable, not an object as in state
    let [data, refreshData] = useState([{
        name: 'Aiugl',
        gender: 'female'
    }]);

    // don't use inside loops and conditions and in classes, only in functions and in 
    useEffect(() => {
        updateChar(); // Mount
        console.log(Math.random());
        let timerId = setInterval(updateChar, 1500);
        return () => { // WillUnmount
            clearInterval(timerId);
        }
    });

    console.log(data);

    return (
        <div>
            <p>You pressed {count}</p>
            <button onClick={ () => setCount(++count)}>Click me</button>
            {data.map((item, i) => {
                return (
                    <div key={i}>
                        Name: {item.name}
                        Gender: {item.gender}
                    </div>
                )
            })}
            <button onClick={() => refreshData(data => ([...data, {name: 'Random', gender: 'male'}]))}>Add data</button>
        </div>
    )
}

export default App;