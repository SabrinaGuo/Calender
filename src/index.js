import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Calender from "./Calender";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Calender
    dataSource="./json/data1.json"
    initYearMonth111="201612"
    dataKeySetting={{
      guaranteed: "guaranteed", //可變
      //有沒有成團
      //如果false要刪掉
      status: "status",
      //狀態
      available: "availableVancancy",
      //可賣座位
      total: "totalVacnacy",
      //團位
      price: "price"
    }}
  />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
