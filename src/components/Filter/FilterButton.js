import React, { useState } from "react";
import { RiListRadio } from "react-icons/ri";

export default function FilterButton({ show, onClose }) {
  return (
    <div>
      <button
        onClick={() => onClose(!show)}
        className="border-2 border-zinc-400 rounded-3xl text-zinc-800 p-3 transition-all flex flex-row justify-center text-center items-center hover:border-black hover:text-black hover:bg-zinc-50"
      >
        <RiListRadio className="mr-2"/>
        <p className="text-center font-semibold">Filter</p>
      </button>
    </div>
  );
}
