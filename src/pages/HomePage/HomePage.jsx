import React, { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);
  return <div>HomePage</div>;
};

export default HomePage;
