import { useState } from 'react';
import './App.css'

function App() {
  const [txLog, setTxLog] = useState([]);
  const [undoneAction, setUndoneAction] = useState(null);
  const [counter, setCounter] = useState(0);

  function undo() {
    if (undoneAction) {
      return;
    }

    const newTxLog = txLog.slice();
    const lastTransaction = newTxLog.shift();

    setUndoneAction(lastTransaction);
    setTxLog(newTxLog);
    setCounter(newTxLog[0]?.new ?? 0);
  }

  function redo() {
    if (!undoneAction) {
      return;
    }

    setTxLog([undoneAction, ...txLog]);
    setCounter(undoneAction.new)
    setUndoneAction(null);
  }

  function reset() {
    setTxLog([]);
    setCounter(0);
    setUndoneAction(null);
  }

  function updateCounter(operation) {
    const OPERATIONS = {
      'x2'(x) { return x * 2},
      '/2'(x) { return x / 2},
      '-1'(x) { return x - 1},
      '+1'(x) { return x + 1},
    };

    const newVal = OPERATIONS[operation](counter);

    const tx = {
      operation,
      new: newVal,
      old: counter,
    };

    setCounter(newVal);
    setTxLog([tx, ...txLog]);
    setUndoneAction(null);
  }

  return (
    <div >
      <div className="flex w-full items-center">
        <button onClick={() => undo()} disabled={undoneAction || txLog.length === 0}>Undo</button>
        <button onClick={() => redo()} disabled={!undoneAction}>Redo</button>
        <button onClick={() => reset()}>Reset</button>
      </div>
      <div className="flex w-full items-center">
        <div>
          <button onClick={() => updateCounter('/2')}>/2</button>
          <button onClick={() => updateCounter('-1')}>-1</button>
        </div>
        <h1 className="mx-3">{counter}</h1>
        <div>
          <button onClick={() => updateCounter('+1')}>+1</button>
          <button onClick={() => updateCounter('x2')}>x2</button>
        </div>
      </div>
      <table className="w-full text-center">
        <thead>
          <tr className="border-b border-black">
            <th>Op</th>
            <th>Old</th>
            <th>New</th>
          </tr>
        </thead>
        <tbody>
          {txLog.map((tx, idx) => (
            <tr key={idx} className="border-b border-black">
              <td>{tx.operation}</td>
              <td>{tx.old}</td>
              <td>{tx.new}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
