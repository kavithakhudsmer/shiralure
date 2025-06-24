import React from 'react';
import Advertisement from '../Advertisement/Advertisement';
import Trends from '../Trendings/Trendings';
import KitchenEssentials from '../KitchenEssentials/KitchenEssentials';
import HomeDecor from '../HomeDecor/HomeDecor';
import TopDeals from '../TopDeals/TopDeals';
 
const MainContent = () => {
  const wrapperStyle = {
    minHeight: '100vh',
    backgroundColor: '#ffffff', // from --background-color
    display: 'flex',
    justifyContent: 'center',
    padding: '2rem 0',
  };
 
  const containerStyle = {
    width: '100%',
    maxWidth: '1200px',
    backgroundColor: '#ffffff', // from --card-bg
   
  };
 
  return (
<div style={wrapperStyle}>
<div style={containerStyle}>
        {/* <Advertisement /> */}
<TopDeals />
<Trends />
<KitchenEssentials />
<HomeDecor />
</div>
</div>
  );
};
 
export default MainContent;