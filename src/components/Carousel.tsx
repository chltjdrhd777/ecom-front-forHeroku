import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { BiLeftArrow, BiRightArrow, RiContactsBookLine } from "react-icons/all";
import { Link, RouteComponentProps } from "react-router-dom";

export interface CarouselAndCardsProptype {
  typecheck?: { categoryId: string; type: string };
  pageData?: any /* PageBaseDocumentType; */;
  RouterProps?: RouteComponentProps;
}

function Carousel({ typecheck, pageData, RouterProps }: CarouselAndCardsProptype) {
  //* for banner
  const [bannerIndex, setBannerIndex] = useState(0);
  const [isClicked, setIsclicked] = useState(false);

  //! auto banner part =>remove for test
  /* const autoBanner = () => {
    if (bannerIndex === 2) {
      setBannerIndex(0);
    } else {
      setBannerIndex(bannerIndex + 1);
    }
  }; */

  /* let autoTimeout = setTimeout(autoBanner, 2000);

  if (isClicked) {
    clearTimeout(autoTimeout);
  }

  useEffect(() => {
    if (isClicked) {
      setTimeout(() => {
        setIsclicked(false);
      }, 2000);
    }
  }, [isClicked]); */
  //! ///////////////////////////////////

  const bannerRight = () => {
    setIsclicked(true);
    if (bannerIndex === 2) {
      setBannerIndex(0);
    } else {
      setBannerIndex(bannerIndex + 1);
    }
  };

  const bannerLeft = () => {
    setIsclicked(true);
    if (bannerIndex === 0) {
      setBannerIndex(2);
    } else {
      setBannerIndex(bannerIndex - 1);
    }
  };

  const onClickBanner = () => {
    RouterProps &&
      RouterProps.history.push(
        "/Samsung?categoryId=6038a7c80125eb12546d0d8a&type=store"
        /*    window.location.hostname === "localhost" ? "http://localhost:8070/Samsung?categoryId=6038a7c80125eb12546d0d8a&type=store" : "" */
      );
    /*  window.history.pushState({ whatyouget: { name: "whow", age: 2123123 } }, "", "/Samsung?categoryId=6038a7c80125eb12546d0d8a&type=store"); */
    /*   window.location.href = "http://localhost:8070/Samsung?categoryId=6038a7c80125eb12546d0d8a&type=store"; */
  };

  const imageData = pageData.banners && pageData.banners.map((each: any) => each.img.substring(22));

  return (
    <Conatiner>
      <p onClick={onClickBanner}>buy now</p>
      <Button1 onClick={bannerLeft}>
        <BiLeftArrow />
      </Button1>
      <SliderContainer index={bannerIndex}>
        {imageData &&
          imageData.map((eachBanner: any, index: any) => (
            <BannerImg
              key={index}
              src={
                window.location.hostname === "localhost"
                  ? `http://localhost:8080/${eachBanner}`
                  : `https://flipkartserverdelpoyed.herokuapp.com/${eachBanner}`
              }
              onClick={onClickBanner}
            />
          ))}
      </SliderContainer>
      <Button2 onClick={bannerRight}>
        <BiRightArrow />
      </Button2>
    </Conatiner>
  );
}

const Conatiner = styled.div`
  width: 90%;
  height: 50vh;
  min-width: 50em;
  min-height: 20em;
  margin: 0 auto;
  position: relative;
  overflow: hidden;

  & > p {
    color: white;
    position: absolute;
    z-index: 1;
    font-weight: bold;
    border: 3px solid white;
    border-radius: 20px;
    padding: 10px;
    cursor: pointer;

    top: 80%;
    right: 10%;
  }
`;

interface BannerIndex {
  index: number;
}

const SliderContainer = styled.div<BannerIndex>`
  width: 100%;
  height: 100%;
  display: flex;
  transition: all 0.3s ease-in-out;
  ${(props) => `transform:translateX(-${props.index}00%)`};
`;

const BannerImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  flex: 0 0 auto;
  &:hover {
    cursor: pointer;
  }
`;

const ButtonDefault = styled.button`
  position: absolute;
  top: 0;
  opacity: 0.5;
  height: 100%;
  width: 10%;
  color: white;
  background: transparent;
  border: none;
  font-size: x-large;
  outline: none;
  transition: all 0.3s ease-in-out;
  z-index: 100;

  &:hover {
    background-color: white;
    color: lightgray;
  }
`;

const Button1 = styled(ButtonDefault)``;

const Button2 = styled(ButtonDefault)`
  right: 0;
`;

export default Carousel;
