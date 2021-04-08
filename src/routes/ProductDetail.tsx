import Header from "Layout/Header";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { getProductById } from "redux/productslice";
import { IoIosArrowForward, IoIosCart, IoIosStar, IoMdCart } from "react-icons/io";
import { AiFillThunderbolt } from "react-icons/ai";
import styled from "styled-components/macro";
import { selectCart, selectCategory, selectProduct } from "redux/mainReducer";
import { useState, useRef } from "react";
import { MakingCategoryTree } from "util/MakingCategoryTree";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Spinner } from "react-bootstrap";
import { IconType } from "react-icons";
import { addToCart } from "redux/cartSlice";

function ProductDetail(props: RouteComponentProps<{ productId: string; productSlug: string }>) {
  const dispatch = useDispatch();
  const { params, path, url } = props.match;
  const { productId, productSlug } = params;
  const generatePublicUrl = (query: string) => {
    let host = window.location.hostname === "localhost" ? "http://localhost:8080" : "https://flipkartserverdelpoyed.herokuapp.com";

    return `${host}/public/${query}`;
  };

  //* for the category family tree
  const {
    categories: { categoryList },
  } = useSelector(selectCategory);
  const { productDetail } = useSelector(selectProduct);

  //# each data
  const categoryTree = MakingCategoryTree(productDetail, categoryList).reverse();

  const { _id, updatedAt, slug, quantity, productPictures, price, name, description, createdBy, category } = useSelector(selectProduct).productDetail;

  useEffect(() => {
    dispatch(getProductById({ productId, productSlug }));
  }, []);

  //* for mouseoverEvnet
  const [mouseOverImg, setMouseOverImg] = useState("");

  useEffect(() => {
    if (productDetail.productPictures && productDetail.productPictures.length > 0) {
      const defaultImgUrl = generatePublicUrl(productDetail.productPictures[0].img);
      setMouseOverImg(defaultImgUrl);
    }
  }, [productDetail.productPictures && productDetail.productPictures.length]);

  const onImgMouseOver = (imgUrl: string) => {
    setMouseOverImg(imgUrl);
  };

  //* for addCart button && buy now button
  const [addCartClicked, setAddCartClicked] = useState(false);
  const [buyNowClicked, setBuyNowClicked] = useState(false);
  const [buttonCount, setButtonCount] = useState(1);
  const [itemqty, setItemQty] = useState(1);

  const onAddCartHandler = async () => {
    setButtonCount(buttonCount - 1);

    if (buttonCount <= 0) {
      alert("already clicked");
    } else {
      setAddCartClicked(true);
      setBuyNowClicked(false);

      const addCartAsync = new Promise((resolve, reject) => {
        const cartData = {
          _id,
          name,
          img: productPictures[0].img,
          price,
          quantity: itemqty,
        };
        resolve(dispatch(addToCart(cartData)));
      });

      await addCartAsync.then(() => {
        setButtonCount(1);
        setAddCartClicked(false);
      });
    }
  };

  return (
    <Header>
      {Object.keys(productDetail).length === 0 ? (
        <div>sorry there is no product detail</div>
      ) : (
        <ProductDetailContainer>
          <article className="flex_imgBoxs_container">
            {productPictures &&
              productPictures.length > 0 &&
              productPictures.map((eachImg: any, index: any) => {
                return (
                  <div className="img_thumbs" key={index}>
                    <img
                      src={generatePublicUrl(eachImg.img)}
                      alt="product_imgThumb"
                      onMouseOver={() => {
                        onImgMouseOver(generatePublicUrl(eachImg.img));
                      }}
                    />
                  </div>
                );
              })}
          </article>

          <article className="img_full">
            <div className="img_container">
              <img src={mouseOverImg} alt="" />
            </div>
          </article>

          <article className="product_details">
            {/* a> b> c> d */}
            <div className="familyTree">
              <ul>
                {categoryTree[0] !== undefined && categoryTree.length > 0
                  ? categoryTree.map((eachParent, index) => {
                      return (
                        <li key={index}>
                          <Link to={`category/${eachParent.name}`}>
                            {eachParent.name} <IoIosArrowForward />
                          </Link>
                        </li>
                      );
                    })
                  : null}

                <li>
                  <a href="#">{productDetail.name}</a>
                </li>
              </ul>
            </div>

            {/* title */}
            <p className="product_title">{productDetail.name}</p>

            <div>
              <span className="rating">
                4.3 <IoIosStar />
              </span>
              <span className="reviews">72,234 Ratings & 8,140 Reviews</span>
            </div>

            <div className="extra_offer">Extra $ 30% off</div>

            <div className="price_container">
              <span className="price">$ 7812312</span>
              <span className="discount"> 22% off</span>
            </div>

            <div className="offerInfo">
              <p>Available : {quantity}</p>
              <p>
                <span>Description</span>
                <span>{description}</span>
              </p>
            </div>

            <div className="item_count_container">
              <span>{`quantity : `}</span>
              <button
                onClick={() => {
                  itemqty > 1 && setItemQty(itemqty - 1);
                }}
              >
                -
              </button>
              <span>{itemqty}</span>
              <button
                onClick={() => {
                  setItemQty(itemqty + 1);
                }}
              >
                +
              </button>
            </div>

            <ButtonContainer style={{ marginTop: "20px" }}>
              <Button
                variant="primary"
                size="lg"
                style={{
                  background: addCartClicked ? "lightgray" : "orange",
                }}
                onClick={onAddCartHandler}
              >
                {addCartClicked ? (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Spinner animation="border" style={{ marginRight: "10px" }} />
                    please wait
                  </div>
                ) : (
                  <>
                    <IoIosCart /> add to your cart
                  </>
                )}
              </Button>

              <Button
                variant="primary"
                size="lg"
                style={{
                  background: buyNowClicked ? "lightgray" : `var(--main)`,
                }}
                onClick={() => {
                  props.history.push("/cart");
                }}
              >
                {buyNowClicked ? (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Spinner animation="border" style={{ marginRight: "10px" }} />
                    please wait
                  </div>
                ) : (
                  <>
                    <AiFillThunderbolt />
                    go to your cart
                  </>
                )}
              </Button>
            </ButtonContainer>
          </article>
        </ProductDetailContainer>
      )}
    </Header>
  );
}

const ProductDetailContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 10px;

  height: 100%;
  font-size: 11px;

  & .flex_imgBoxs_container {
    background-color: white;
    flex: 0.05;
    height: 70vh;
    border-right: 1px solid #ebe4e4;
    display: flex;
    flex-direction: column;

    & .img_thumbs {
      width: 100%;
      height: 70px;
      margin-bottom: 10px;
      box-sizing: border-box;
      border: 2px solid lightgray;
      padding: 2px;
      transition: all 0.2s ease;

      &:hover {
        border: 2px solid #2874f0;
      }

      & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  & .img_full {
    flex: 0.35;
    background-color: white;

    & .img_container {
      width: 100%;
      height: 100%;

      display: flex;
      align-items: center;
      justify-content: center;

      & img {
        width: 100%;
        height: 15rem;
        object-fit: contain;
      }
    }
  }

  & .product_details {
    flex: 0.6;
    background-color: white;
    display: flex;
    flex-direction: column;
    position: relative;

    & .familyTree {
      & ul {
        display: flex;
        & li {
          display: flex;
          align-items: center;
          & a,
          svg {
            font-size: 1rem;
            color: gray;
            margin-right: 10px;
          }
        }
      }
    }

    & > p {
      font-size: 1.5rem;
      font-weight: 500;
      margin: 1.3rem 0;
    }

    & .rating {
      display: inline-block;
      background: #388e3c;
      color: #fff;
      font-weight: 400;
      font-size: 12px;
      border-radius: 3px;
      padding: 2px 5px;
      margin: 0 10px 10px 0;
    }

    & .extra_offer {
      color: #388e3c;
      font-weight: bold;
      font-size: 12px;
    }

    & .price_container {
      position: relative;

      & .price {
        font-size: 1.5rem;
        font-weight: bolder;
        margin-right: 10px;
      }

      & .discount {
        position: absolute;
        top: 20%;
        color: lightcoral;
      }
    }

    & .offerInfo {
      & p:nth-child(1) {
        font-weight: bold;
        font-size: 0.8rem;
        margin-top: 10px;
        margin-bottom: 10px;
      }

      & p:nth-child(2) {
        display: flex;
        & span:nth-child(1) {
          margin-right: 10px;
        }
      }
    }

    & .item_count_container {
      & span {
        &:nth-child(1) {
          font-size: 1.2rem;
          margin-right: 10px;
        }
        &:nth-child(3) {
          border: 1px solid lightgray;
          font-size: 1.1rem;
          margin: 0 20px;
          padding: 0 20px;
          border-radius: 5px;
        }
      }

      & button {
        border: none;
        width: 25px;
        font-size: 1.1rem;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
        &:nth-child(2) :hover {
          background: var(--main);
        }
        &:nth-child(4) :hover {
          background: lightcoral;
        }
      }
    }
  }
`;

const ButtonContainer = styled.div`
  & button {
    border: none;
    width: 15rem;
    height: 3.5rem;
    margin-right: 20px;
    font-size: 1rem;
    text-transform: uppercase;
    outline: none;
  }
`;

export default ProductDetail;
