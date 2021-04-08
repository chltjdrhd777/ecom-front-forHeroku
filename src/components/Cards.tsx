import React from "react";
import styled from "styled-components/macro";
import { CarouselAndCardsProptype } from "components/Carousel";

function Cards({ typecheck, pageData }: CarouselAndCardsProptype) {
  return (
    <CardContainerSection>
      {pageData?.products &&
        pageData.products.map((eachProductImg: any, index: any) => {
          return (
            <div className="eachCardDiv" key={index}>
              <img src={eachProductImg.img} alt="" />
            </div>
          );
        })}
    </CardContainerSection>
  );
}

const CardContainerSection = styled.section`
  width: 90%;
  height: 30vh;
  min-width: 50em;
  min-height: 10em;
  background-color: black;
  margin: 20px auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  & .eachCardDiv {
    width: 30%;
    height: 90%;
    background-color: white;
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > img {
      width: 100%;

      height: 70%;
      object-fit: cover;
    }
  }
`;

export default Cards;
