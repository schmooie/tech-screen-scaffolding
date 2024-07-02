import { useState } from 'react';
import './App.css'
import transactions from '../constants/transactions';

function getTopCustomer(transactions) {
  const mapOfCustomersBySpend = new Map();

  for (let tx of transactions) {
    const { customer, amount } = tx;
    const spendSoFar = mapOfCustomersBySpend.get(customer) ?? 0;

    mapOfCustomersBySpend.set(customer, spendSoFar + amount)
  }

  let topSpendSoFar = -Infinity;
  let topCustomerName;

  // we don't care about ties here, today
  mapOfCustomersBySpend.forEach((amt, name) => {
    if (amt > topSpendSoFar) {
      topCustomerName = name;
      topSpendSoFar = amt;
    }
  })

  return topCustomerName;
}

function filterTransactions(transactionsArr, filterStr = '') {
  const sanitizedFilterStr = filterStr.toLocaleLowerCase();

  return transactionsArr.filter(({ customer }) => {
    if (filterStr === '') return true;

    const sanitizedCustomerName = customer.toLocaleLowerCase();

    return sanitizedCustomerName.indexOf(sanitizedFilterStr) >= 0;
  });
}

function App() {
  return (
    <>
      <Transactions txs={transactions}/>
    </>
  )
}

function Transactions({ txs }) {
  const [filterStr, setFilterStr] = useState('');
  const filteredTransactions = filterTransactions(txs, filterStr)
  const topCustomerName = getTopCustomer(filteredTransactions);

  function onInputChange(e) {
    setFilterStr(e.target.value);
  }

  return (
    <>
      <div className="flex">
        <label htmlFor="customer">Filter</label>
        <input type="text" name="customer" value={filterStr} className="border-black" onChange={onInputChange} />
      </div>
      <ul>
        {filteredTransactions.map(({ id, customer, amount }) => (
          <li key={id}>
            <span className={customer === topCustomerName ? 'bg-yellow-300' : ''}>{customer}:</span> {amount}
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
