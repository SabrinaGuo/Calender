import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

//計算數量
// countPages = () => {
//   let { initYearMonth, groupInfo } = this.state;
//   let countPage = [];

//   const dateList = groupInfo.map(function(groupItem) {
//     return groupItem["date"];
//   });
//   dateList.sort((a, b) => {
//     return a > b ? 1 : -1;
//   });
//   let repeat = dateList.filter((date, idx) => {
//     return (
//       dateList
//         .map((item, idx) => {
//           return item;
//         })
//         .indexOf(date) === idx
//     );
//   });
//   for (let i = 0; i < repeat.length; i += 1) {
//     countPage.push(repeat[i].substring(0, 7).replace("/", ""));
//   }
//   let total = [];
//   for (let i = 0; i < countPage.length; i += 1) {
//     if (countPage[i] === initYearMonth) {
//       total.push(countPage[i]);
//     }
//   }
//   let ppage = Math.floor(total.length / 8);
//   let pgArr = [];
//   for (let p = 0; p <= ppage; p += 1) {
//     pgArr.push(p);
//   }
//   // console.log(total.length);
//   return pgArr;
// };

{
  /* <div className={changeCover === "listCover" ? "pages" : "pagesNo"}>
            {this.countPages().map((pgs, idx) => {
              return <span key={"page" + idx}>{pgs + 1}</span>;
            })}
          </div> */
}

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
