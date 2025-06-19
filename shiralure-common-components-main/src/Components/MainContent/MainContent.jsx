import React from 'react'
import Advertisement from '../Advertisement/Advertisement'
import Trends from '../Trendings/Trendings'
import KitchenEssentials from '../KitchenEssentials/KitchenEssentials'
import HomeDecor from '../HomeDecor/HomeDecor'
import TopDeals from '../TopDeals/TopDeals'

const MainContent = () => {
  return (
    <div>
      {/* <Advertisement/> */}
      <TopDeals />
      <Trends />
      <KitchenEssentials />
      <HomeDecor />
    </div>
  )
}

export default MainContent