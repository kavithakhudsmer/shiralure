import React from "react";
import "../../App.css";
import Advertisement from "../Advertisement/Advertisement";
import MainContent from "../MainContent/MainContent";
import ItemsDisplay from "../MainContent/ItemsDisplay";
import { Routes, Route, useLocation } from "react-router-dom";
import TopDeals from "../TopDeals/TopDeals";
import Trends from "../Trendings/Trendings";
import KitchenEssentials from "../KitchenEssentials/KitchenEssentials";
import HomeDecor from "../HomeDecor/HomeDecor";
import ProductView from "../ProductView/ProductView";

const Home = () => {
  return (
    <div>
      <Advertisement />
      <main className="main-content">
        <Routes>
          <Route index element={<MainContent />} />
          <Route path="/:category/:subcategory" element={<ItemsDisplay />} />
          <Route path="/product/:productId" element={<ProductView />} />
        </Routes>
      </main>
    </div>
  );
};

export default Home;
