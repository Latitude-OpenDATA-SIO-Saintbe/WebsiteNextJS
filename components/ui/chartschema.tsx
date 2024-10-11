// LineChart.tsx (if in components directory)
import React from 'react'
import { GG } from '@graphique/graphique'
import { GeomLine } from '@graphique/geom-line'
import { stocks } from '@graphique/datasets'

// default basic line chart
const LineChart = () => {
  return (
    <GG
      data={stocks.filter((d) => d.symbol === 'AAPL')}
      aes={{
        x: (d) => new Date(d.date),
        y: (d) => d.marketCap,
      }}
    >
      <GeomLine />
    </GG>
  )
}

export default LineChart

