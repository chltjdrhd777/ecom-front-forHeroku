import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from "redux/mainReducer";
import { getProductBySlug } from "redux/productslice";
import styled from "styled-components/macro";
import { ProductBaseDocumentType } from "../../../server/src/model/product";
import { PramsType2 } from "./ProductList";
import { Link } from "react-router-dom";

function StorePageForSamsung(props: PramsType2) {
  const dispatch = useDispatch();
  const {
    products: { productByPrice },
  } = useSelector(selectProduct);
  const { slug } = props.match.params;

  /*   useEffect(() => {
    dispatch(getProductBySlug(slug));
  }, []); */

  const generatePublicUrl = (query: string) => {
    return `http://localhost:8080/public/${query}`;
  };

  const priceRange: { [key: string]: string } = {
    under10: "under 10k",
    is10to15: "under 15k",
    is15to20: "under 20k",
    over20: "over 20k",
  };
  return (
    <>
      {productByPrice !== undefined &&
        Object.keys(productByPrice).map((key, index) => {
          if (productByPrice[key].length > 0) {
            return (
              <ProductCardSection key={index}>
                <section className="product_cards">
                  <article className="card_header" style={{ backgroundColor: "#f4fdff" }}>
                    <div style={{ fontSize: "20px", fontWeight: "bold" }}>{`${props.match.params.slug} mobile ${priceRange[key]}`}</div>
                  </article>

                  <div style={{ display: "flex" }}>
                    {productByPrice[key] !== undefined &&
                      productByPrice[key].map((each: any /* ProductBaseDocumentType */, index: number) => {
                        return (
                          <Link
                            to={`/${each.slug}/${each._id}`}
                            className="product_container"
                            key={index}
                            style={{ color: "black", textDecoration: "none" }}
                          >
                            <div className="product_images">
                              <img src={generatePublicUrl(each.productPictures[0].img)} alt="" />
                            </div>

                            <div className="product_info">
                              <div className="product_title">{each.name}</div>
                              <div>
                                <span>stock</span>
                                <span>{each.quantity}</span>
                              </div>
                              <div className="product_Price">{each.price}</div>
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                </section>
              </ProductCardSection>
            );
          }
        })}
    </>
  );
}

const ProductCardSection = styled.section`
  .product_cards {
    width: calc(100% - 20px);
    margin: 10px 10px;
    border: 1px solid #cecece;
    box-shadow: 0 0 2px -2px gray;

    & .card_header {
      display: flex;
      justify-content: space-between;
      padding: 1.5rem 2rem;
      border-bottom: 1px solid #cecece;
    }

    & .product_container {
      width: 15rem;
      margin: 0 10px;

      & .product_images {
        width: 10rem;
        height: 10rem;
        overflow: hidden;
        text-align: center;
        margin: 10px auto;

        & > img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
      }

      & .product_info {
        text-align: center;
        font-size: 0.8rem;
        & .product_title {
          margin: 5px 0;
        }

        & .product_Price {
          font-size: 1rem;
          font-weight: bold;
          margin: 5px 0;
        }
      }
    }
  }
`;

export default StorePageForSamsung;
