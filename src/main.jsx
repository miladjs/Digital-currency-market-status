import React from "react";
import ReactDOM from "react-dom/client";
import MainIndex from "./MainIndex.jsx";
import "./global.scss";
import Layout from "./layout.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Layout>
    <MainIndex />
  </Layout>
);
