import { useState, useContext } from "react";
import { AppContext, AppDisptachContext } from "./AppContext";

function Header() {
  const date = useContext(AppContext);
  const setDate = useContext(AppDisptachContext);

  function handlerDateInput(e) {
    console.log(e.target.value);
    setDate(new Date(e.target.value));
  }

  function getSign() {
    let sign;
    if (!date) return "Please enter your birthday";

    starSign.forEach((item) => {
      if (
        date.getMonth() + 1 == item.start.split("-")[0] &&
        date.getDate() >= item.start.split("-")[1]
      ) {
        sign = item;
      }
      if (
        date.getMonth() + 1 == item.end.split("-")[0] &&
        date.getDate() <= item.end.split("-")[1]
      ) {
        sign = item;
      }
    });
    return sign;
  }

  return (
    <>
      <div className="w-full flex flex-col items-center gap-4">
        <div className="text-3xl">Find Your Sign</div>
        <input
          value={date ? date.toISOString().split("T")[0] : undefined}
          onChange={handlerDateInput}
          type="date"
          className="w-40"
        />
      </div>
    </>
  );
}

export default Header;
