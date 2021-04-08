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
  const slug = "Apple";
  const typeCheck = { categoryId: "6038a7e70125eb12546d0d8c", type: "page" };

  useEffect(() => {
    dispatch(getProductBySlug(slug));
    dispatch(getPage(typeCheck));
  }, []);

  return (
    <HeaderLayout>
      <>
        <CarouselMaker typecheck={typeCheck} pageData={pageData} />

        <Cards pageData={pageData} />
      </>
      {/*     <Styld_home_div className="centering">
        <h1>hello</h1>
        <p>please start your shopping</p>
      </Styld_home_div> */}
    </HeaderLayout>
  );
}

const Styld_home_div = styled.div`
  width: 100%;
  height: 85vh;
  flex-direction: column;
`;

export default Home;
