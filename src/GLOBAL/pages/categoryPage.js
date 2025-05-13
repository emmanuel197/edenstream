import React, { useEffect } from "react";

// components
import Header from "../components/Header";
import Footer from "../components/Footer";
import CategoryList from "../components/categorypage/CategoryList";

const CategoryPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
       
      <Header links={5} signup={1} />
      <CategoryList />
      <Footer />
    </>
  );
};

export default CategoryPage;
