'use client'
import ImageCarousel from "@/components/parts/ImageCarousel";
import ImageGrid from "@/components/parts/ImageGrid";
import Menu from "@/components/parts/Menu";
import React from "react";

type Props = {};

const Home = (props: Props) => {
  return (
    <div>
      {/* <ImageGrid /> */}
      <ImageCarousel />
      <Menu />
    </div>
  );
};

export default Home;
