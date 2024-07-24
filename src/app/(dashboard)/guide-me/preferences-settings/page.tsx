"use client";

import SizeSettings from "@/components/parts/SizeSettings";
import WardrobeSearchResult from "@/components/parts/WardrobeSearchResult";
import React from "react";

const SizeSelection = () => {
  return (
    <>
      <div className="w-full flex">
        <SizeSettings />
        <WardrobeSearchResult />
      </div>
    </>
  );
};

export default SizeSelection;
