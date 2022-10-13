import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import useTransactions from '../../useTransactions'
import 'chart.js/auto';

const Details = ({ title}) => {
  const {total, chartData} = useTransactions(title)

  return (
    <div className='budget form-title'>
      <h3 className=''>{title}</h3>
      <div>
      <Doughnut data={chartData} />
      </div>
      <h1 className=''>${total}</h1>
    </div>
  )
}

export default Details