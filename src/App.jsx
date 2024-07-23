import './App.css'

import { useState } from 'react';

export default function App() {
  const [cells, setCells] = useState(new Array(9).fill(0).map((_, idx) => ({
    id: idx,
    active: false,
  })));
  const [cellClickOrder, setCellClickOrder] = useState(new Set());

  function turnOffLights() {
    const intervalId = setInterval(() => {
      setCellClickOrder((origClickOrder) => {
        const clickOrder = [...origClickOrder];

        if (clickOrder.length === 0) {
          return clearInterval(intervalId);
        }

        const newCells = cells.slice();
        newCells[clickOrder.pop()].active = false;

        return new Set(clickOrder);
      });
    }, 300)
  }


  return (
    <section className="cell-wrapper">
      {cells.map(({ id, active }) => <div
        key={id}
        className={`cell ${active ? 'cell--active' : ''}`}
        onClick={() => {
          const newCells = cells.slice();
          const newCellClickOrder = new Set([...cellClickOrder, id]);

          newCells[id].active = true;

          setCellClickOrder(newCellClickOrder);
          setCells(newCells);

          if (newCellClickOrder.size === 9) {
            turnOffLights();
          }
        }}>
      </div>)}
    </section>
  );
}

