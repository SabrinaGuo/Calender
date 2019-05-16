import React, { Component } from "react";
import "./style.scss";
import groupInfo from "./json/data1.json";
import moment from "moment";

export default class Calender extends Component {
  state = {
    changeClass: true,
    monthArray: [],
    nowShow: 1,
    initYearMonth: "201705"
  };
  weekList = [
    "星期天",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六"
  ];

  //顯示星期
  weekShow = () => {
    let weekArr = [];
    for (let i = 0; i < this.weekList.length; i += 1) {
      weekArr.push(this.weekList[i]);
    }
    return weekArr;
  };
  //月曆與列表狀態變更
  changeList = () => {
    let changeList = this.state.changeClass;

    this.setState({
      changeClass: !changeList
    });
    // console.log(changeList);
  };
  //月曆上的月份顯示
  componentDidMount() {
    let { initYearMonth } = this.state;
    let groupInfoDate = groupInfo;
    let mouthListArr = [];

    //從json中取出date
    const dateList = groupInfoDate.map(function(groupItem) {
      return groupItem["date"];
    });
    //進行排序
    dateList.sort((a, b) => {
      return a > b ? 1 : -1;
    });
    //為了符合initYearMonth將資料中的"/"以及日期去除
    for (let i = 0; i < groupInfoDate.length; i += 1) {
      mouthListArr.push(dateList[i].substring(0, 7).replace("/", ""));
    }
    //將重複的月份去除
    const monthArray = mouthListArr.filter((date, idx) => {
      return (
        mouthListArr
          .map((item, idx) => {
            return item;
          })
          .indexOf(date) === idx
      );
    });
    //找出initYearMonth在此陣列中第幾筆
    let nowShow = monthArray.indexOf(initYearMonth);
    // console.log(monthArray);
    this.setState({
      monthArray,
      nowShow
    });
  }

  //倒退
  monthPrev = () => {
    let { monthArray, nowShow, initYearMonth } = this.state;
    if (nowShow === 0) {
      nowShow = 0;
    } else {
      nowShow -= 1;
    }
    initYearMonth = monthArray[nowShow];
    this.setState({
      nowShow,
      initYearMonth
    });
  };
  //前進
  monthNext = () => {
    let { monthArray, nowShow, initYearMonth } = this.state;
    if (nowShow >= monthArray.length - 1) {
      nowShow = monthArray.length - 1;
    } else {
      nowShow += 1;
    }
    initYearMonth = monthArray[nowShow];
    this.setState({
      nowShow,
      initYearMonth
    });
    // console.log(" monthArray.length", monthArray.length);
    // console.log("nowShow", nowShow);
  };

  //月份的li
  showLi() {
    let { monthArray, nowShow, initYearMonth } = this.state;
    let showarr = [
      monthArray[nowShow - 1],
      monthArray[nowShow],
      monthArray[nowShow + 1]
    ];
    //最小月份
    if (nowShow === 0) {
      showarr = [
        monthArray[nowShow],
        monthArray[nowShow + 1],
        monthArray[nowShow + 2]
      ];
    }
    //最大月份
    if (nowShow >= monthArray.length - 1) {
      showarr = [
        monthArray[nowShow - 2],
        monthArray[nowShow - 1],
        monthArray[nowShow]
      ];
    }
    //li的map
    let monthli = showarr.map((item, idx) => {
      return (
        <li
          key={`mouth${idx}`}
          className={item === initYearMonth ? "currentMonth" : ""}
          onClick={() => this.getNowMonth(item)}
        >
          {this.addLine(item)}
        </li>
      );
    });
    // console.log("aaaaaa", monthli);
    return monthli;
  }
  //顯示月份的資料重新加上"/"
  addLine(itemcome) {
    if (typeof itemcome === "string") {
      let reg = /^(\d{4})(\d{2})$/;
      let str = itemcome.replace(reg, "$1/$2");
      return str;
    }
  }
  //將資料去除"/"
  deleteLine(itemcome) {
    if (typeof itemcome === "string") {
      let str = itemcome.replace(/\//g, "");
      return str;
    }
  }
  //click之後會得到initYearMonth更新state
  getNowMonth = item => {
    // console.log(item);
    // let str = this.deleteLine(item);
    this.setState({
      initYearMonth: item
    });
  };
  //得到相對應月份的天數與星期
  getDays() {
    // let groupInfoDate = groupInfo;
    // let provMonth =  groupInfoDate["date"]
    const initDay = this.state.initYearMonth;
    let yearStr = Number(initDay.substring(0, 4));
    let monthStr = Number(initDay.substring(4, 6));
    let daysCount = new Date(yearStr, monthStr, 0);
    let dayTotal = daysCount.getDate();
    let dayArr = [];
    for (let i = 1; i <= dayTotal; i += 1) {
      dayArr.push(i);
    }
    // console.log(dayTotal); //31

    let reg = /^(\d{4})(\d{2})$/;
    let str = initDay.replace(reg, "$1,$2,01");
    // console.log("str", str);
    // console.log("initDay", initDay);
    let weekStr = new Date(str);
    let week = weekStr.getDay();
    for (let i = 0; i < week; i += 1) {
      dayArr.unshift(-1);
    }
    for (let i = 0; i < 42 - dayTotal - week; i += 1) {
      dayArr.push(-1);
    }
    // console.log("=====", dayArr); //1
    return dayArr;
  }

  whichDay(day) {
    let reg = /^(\d{4})(\d{2})(\d{1,2})$/;
    let str = day.replace(reg, "$1,$2,$3");
    let weekStr = new Date(str);
    let week = weekStr.getDay();
    return week;
  }

  render() {
    // console.log("groupInfo", groupInfo);
    let changeClass =
      this.state.changeClass === true ? "fas fa-list " : "far fa-calendar-alt";
    let changeWord =
      this.state.changeClass === true ? "切換列表顯示 " : "切換月曆顯示";
    let changeWeek =
      this.state.changeClass === true ? "weekCover " : "weekCover listCover";
    let changeCover =
      this.state.changeClass === true ? "calenderCover " : "listCover";

    return (
      <div>
        <div className="container">
          <div className="change" onClick={this.changeList}>
            <i className={changeClass} />
            {/* <i className="far fa-calendar-alt"></i> */}
            <span>{changeWord}</span>
            {/* <span>切換月曆顯示</span> */}
          </div>
          <div className="sliderCover">
            <div className="arrowL" onClick={this.monthPrev} />
            <ul>{this.showLi()}</ul>
            <div className="arrowR" onClick={this.monthNext} />
          </div>
          <div className={changeWeek}>
            {this.weekShow().map((weekItem, idx) => {
              return <div key={"week" + idx}>{weekItem}</div>;
            })}
          </div>
          <div className={changeCover}>
            {this.getDays().map((dd, idx) => {
              const initDay = this.state.initYearMonth;
              let newDD = dd < 10 ? "0" + dd : dd;
              // console.log("newDD", newDD);
              let groupDetail;
              let useDate = [];
              let row = groupInfo.find((value, idx) => {
                if (
                  value.date ===
                  moment(`${initDay}${newDD}`, "YYYYMMDD").format("YYYY/MM/DD")
                ) {
                  useDate.push(value);
                  console.log(useDate);
                  return value;
                }
              });

              if (newDD > 0 || newDD === Number) {
                groupDetail = (
                  <React.Fragment>
                    <span>{newDD > 0 ? dd : ""}</span>
                    <span>{this.weekList[this.whichDay(initDay + newDD)]}</span>
                    {/* <span>成團</span> */}
                    <span
                      className={
                        row && row.guaranteed === true ? "removebg" : ""
                      }
                    >
                      {row && row.guaranteed === true ? "成團" : ""}
                    </span>
                    <span
                      className={
                        row && row.status === "後補" ? "greenText" : ""
                      }
                    >
                      {row && row.status}
                    </span>
                    <span>{row && "可賣：" + row.availableVancancy}</span>
                    <span>{row && "團位：" + row.totalVacnacy}</span>
                    <span>{row && "價錢：" + row.price.toLocaleString()}</span>
                  </React.Fragment>
                );
              } else {
                groupDetail = "";
              }
              return (
                <div
                  className={`eachDate ${dd > 0 ? "" : "gray "}${
                    row ? "" : "diNo"
                  }`}
                  key={"day" + idx}
                >
                  {groupDetail}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
