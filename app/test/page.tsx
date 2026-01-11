"use client";

import PanelTestWithButtons from "@/components/testing/PanelTestWithButtons";
import { zconfig } from "@/config/config";
import { Test___SendExampleEmail } from "@/utils/tests";


export default function PageTest() {

  const ___SendExampleEmail = async () => {
    await Test___SendExampleEmail();
  }


  return <>
    <div className="p-8">
      {/* grid: establishes the grid container
        grid-cols-3: creates 3 columns
        gap-2: adds small spacing between items 
      */}
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        <button
          type="button"
          onClick={() => {
            ___SendExampleEmail();
          }}
          className="bg-indigo-500 text-white p-4 rounded">Send test message to zlatkoflash@gmail.com</button>
        <button className="bg-indigo-500 text-white p-4 rounded">A2</button>
        <button className="bg-indigo-500 text-white p-4 rounded">A3</button>

        <button className="bg-indigo-500 text-white p-4 rounded">B1</button>
        <button className="bg-indigo-500 text-white p-4 rounded">B2</button>
        <button className="bg-indigo-500 text-white p-4 rounded">B3</button>

        <button className="bg-indigo-500 text-white p-4 rounded">C1</button>
        <button className="bg-indigo-500 text-white p-4 rounded">C2</button>
        <button className="bg-indigo-500 text-white p-4 rounded">C3</button>
      </div>
    </div>
  </>
}