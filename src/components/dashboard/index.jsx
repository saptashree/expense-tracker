import React from 'react'
import './dashboard.css'
import Main from './main'
import Details from './details'
import Transaction from './transaction'

const Dashboard = () => {
  return (
    <div className="dashboard">
        <div className="main">
          <Main />
        </div>
        <div className="details">
          <div className='tracker form'>
            <Details title="Income" />
            <Details title="Expense" />
          </div>
          <div className='transcation form'>
            <Transaction />
          </div>
        </div>
    </div>
  )
}

export default Dashboard