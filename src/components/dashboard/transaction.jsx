import React, { useContext } from 'react'
import { ExpenseTrackerContext } from '../../context/context'
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi'
import { MdDelete } from 'react-icons/md'

const Transaction = () => {

  const { deleteTransaction, transactions } = useContext(ExpenseTrackerContext)

  return (
    <>
    <h1>Transcation</h1>
    <div>
      {
        transactions.map(ele => (
          <div key={ele.id} className='transactionList'>
            <div className='transactionIcon'>
              {ele.type === 'Expense' ? <GiPayMoney /> : <GiReceiveMoney /> }
            </div>
            <div className='transactiondetails'>
              <div className='transactionType'>
                <h1>{ele.type}</h1>
                <h4>{ele.category}</h4>
              </div>
              <div className='transactionAmount'>
                <h1>${ele.amount}</h1>
                <h4>{ele.date}</h4>
              </div>
            </div>
            <div className='transactionDelete'>
              <MdDelete onClick={() => deleteTransaction(ele.id)} />
            </div>
          </div>
        ))
      }
    </div>
    </>
  )
}

export default Transaction