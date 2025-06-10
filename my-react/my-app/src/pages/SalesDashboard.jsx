import React from "react";
import SalesOpportunities from "../components/SalesOpportunities";
import SalesForecast from "../components/SalesForecast";
import AddSalePage from "./AddSalePage";
import SalesPipeline from "../components/SalesPipeline";


const SalesDashboard = () => (
  <div>
    <h2>Sales Dashboard</h2>
    <AddSalePage />
    <SalesOpportunities />
    <SalesForecast />
    <SalesPipeline />
  </div>
);

export default SalesDashboard;
