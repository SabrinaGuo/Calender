import React, { Component } from "react";
import "./index.css";
import Calender from "./Calender";
import * as serviceWorker from "./serviceWorker";

export default class App extends Component {
  render() {
    return (
      <div>
        <Calender
          dataSource="./json/data3.json"
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
          onClickPrev={function($btn, data, module) {
            console.log($btn, data, module);
          }}
          // 點下一個月時
          onClickNext={function($btn, data, module) {
            console.log($btn, data, module);
          }}
          // 點日期時
          onClickDate={function($date, data) {
            console.log($date, data);
          }}
        />
      </div>
    );
  }
}
