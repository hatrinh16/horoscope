import { useState, useContext } from "react";
import { AppContext, AppDisptachContext } from "./AppContext";

function Header() {
  const date = useContext(AppContext);
  const setDate = useContext(AppDisptachContext);

  function handlerDateInput(e) {
    console.log(e.target.value);
    setDate(new Date(e.target.value));
  }
  return (
    <>
      <div className="w-full flex flex-col items-center gap-4">
        <div className="text-3xl font-semibold">ENTER YOUR BIRTHDAY</div>
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
