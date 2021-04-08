import Cards from "components/Cards";
import HeaderLayout from "Layout/Header";
import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import styled from "styled-components";
import CarouselMaker from "components/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from "redux/mainReducer";
import { getProductBySlug, getPage } from "redux/productslice";

function Home(props: RouteComponentProps) {
  const pageData = useSelector(selectProduct).pageInfo;
  const dispatch = useDispatch();
  const typeCheck = { categoryId: "6038a7e70125eb12546d0d8c", type: "page" };

  useEffect(() => {
    dispatch(getPage(typeCheck));
  }, []);

  return (
    <HeaderLayout>
      <>
        <CarouselMaker pageData={pageData} RouterProps={props} />

        <Cards pageData={pageData} />
      </>
    </HeaderLayout>
  );
}

export default Home;
