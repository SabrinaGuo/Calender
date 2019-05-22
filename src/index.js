import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Calender from "./Calender";
import * as serviceWorker from "./serviceWorker";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
  }
  prevMonth = () => {
    return this.child.current.prevMonth();
  };
  nextMonth = () => {
    return this.child.current.nextMonth();
  };
  switch = () => {
    return this.child.current.switch();
  };
  inputData = data => {
    let a = this.child.current.state.groupInfo;

    this.child.current.setState({
      groupInfo: [...data, ...a]
    });
  };
  resetData = data => {
    this.child.current.setState({
      groupInfo: [...data]
    });
  };
  destroy = data => {
    this.child.current.setState({
      groupInfo: []
    });
  };
  render() {
    return (
      <div>
        <Calender
          ref={this.child}
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
          onClickDate={function(abc, data) {
            console.log(abc, data);
            // console.log("abc");
          }}
        />
      </div>
    );
  }
}

window.calendar = ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
