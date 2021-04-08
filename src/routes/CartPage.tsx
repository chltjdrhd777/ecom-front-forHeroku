import React, { useEffect } from "react";
import Header from "Layout/Header";
import styled from "styled-components/macro";
import { SiSemanticweb } from "react-icons/all";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Spinner } from "react-bootstrap";
import CartItems from "components/CartItems";
import { useSelector } from "react-redux";
import { selectCart, selectUser } from "redux/mainReducer";
import { RouteComponentProps } from "react-router";
import CheckoutAside from "components/Checkout/CheckoutAside";

function CartPage(props: RouteComponentProps) {
  const [orderClicked, setOrderClicked] = useState(false);
  const { cartItems } = useSelector(selectCart);
  const everyItemArrayByKey = Object.keys(cartItems);
  const { userData } = useSelector(selectUser);

  //! calculate total quantity
  let totalQuantities = cartItems && Object.values(cartItems).map((eachCart) => eachCart.quantity);

  let totalQuantityForShow = totalQuantities.length !== 0 && totalQuantities.reduce((pre, cur) => pre + cur);

  //! calculate total price
  let totalPrices =
    cartItems &&
    Object.values(cartItems).map((eachCart) => {
      const renderPrice = (parseFloat(eachCart.price.replace(",", ".")) * eachCart.quantity).toFixed(3);
      return parseFloat(renderPrice);
    });

  let totalPriceForShow =
    totalPrices.length > 0 &&
    totalPrices
      .reduce((previous, current) => previous + current)
      .toFixed(2)
      .replace(".", ",");

  return (
    <>
      <Header>
        <CartContainer_Main>
          <MainCartPartArticle>
            <div className="Cart_header">
              <div className="Total_amount">{`My Cart (${everyItemArrayByKey.length})`}</div>
            </div>

            {/*Cart_List > eachItems > item-img, ,item_details, delivery_date   */}
            <div className="Cart_List">
              {everyItemArrayByKey.length > 0 &&
                everyItemArrayByKey.map((eachCart, index) => {
                  return <CartItems key={index} {...cartItems[eachCart]} />;
                })}
            </div>

            <div className="purchase_button">
              {everyItemArrayByKey.length === 0 ? (
                <button
                  onClick={() => {
                    props.history.push("/Samsung?categoryId=6038a7c80125eb12546d0d8a&type=store");
                    /*              window.location.href = "http://localhost:8070/Samsung?categoryId=6038a7c80125eb12546d0d8a&type=store"; */
                  }}
                >
                  shopping now
                </button>
              ) : (
                <button
                  style={{ background: orderClicked ? "gray" : "orange" }}
                  onClick={() => {
                    setOrderClicked(!orderClicked);
                    props.history.push({
                      pathname: `checkout/justWantToSeeHistoryState?loginState=${userData !== undefined ? "true" : "false"}`,
                      state: { everyItemArrayByKey, totalQuantityForShow, totalPriceForShow },
                    });
                    setOrderClicked(!orderClicked);
                  }}
                >
                  {orderClicked ? (
                    <>
                      <Spinner animation="border" /> please wait
                    </>
                  ) : (
                    <>place order</>
                  )}
                </button>
              )}
            </div>
          </MainCartPartArticle>
          <CheckoutAside
            itemLength={everyItemArrayByKey.length}
            totalPriceForShow={totalPriceForShow !== false && totalPriceForShow}
            totalQuantityForShow={totalQuantityForShow !== false && totalQuantityForShow}
          />
        </CartContainer_Main>
      </Header>
    </>
  );
}

export const MainCartPartArticle = styled.article`
  background: white;
  flex: 1 1 70%;
  margin-right: 16px;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;

  & .Cart_header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #efefef;
    width: 100%;

    background: white;
    & .Total_amount {
      font-size: 1.3rem;
      font-weight: 500;
    }
  }
  /* Cart_List > eachItems > item-img, ,item_details, delivery_date   */

  & .Cart_List {
    padding: 10px;
    flex: 1;
    overflow: auto;
  }

  & .purchase_button {
    padding: 20px;
    display: flex;
    flex-direction: row-reverse;
    box-shadow: 0px -2px 5px 0 lightgray;
    transition: all 0.3s ease-in-out;

    & button {
      background: orange;
      width: 40%;
      text-transform: uppercase;
      padding: 10px;
      outline: none;
      border: none;
      transition: all 0.3s ease;
      color: white;
      border-radius: 10px;

      & .spinner-border {
        width: 20px;
        height: 20px;
        font-size: 10px;
        margin-right: 10px;
      }

      & :hover {
        background: orange;
        transform: translateY(-2px);
      }

      & :active {
        transform: translateY(2px);
      }
    }
  }
`;

export const Aside = styled.aside`
  flex: 1 1 25%;
  height: 80%;
  display: flex;
  flex-direction: column;

  & .price_detail {
    background-color: white;
    box-shadow: 0 3px 5px 0 lightgray;
    flex: 1 1 60%;
    padding: 20px;
  }
  & .sub_description {
    background-color: transparent;
    padding: 20px;
    flex: 1 1 40%;
    color: gray;
    margin-top: 20px;
    display: flex;
    & svg {
      font-size: 2rem;
      margin-right: 10px;
    }
  }
`;

export const CartContainer_Main = styled.main`
  background: #e9f1f5;
  display: flex;
  justify-content: center;
  padding: 20px;
  height: 88.3vh;
  min-height: 550px;
`;

export default CartPage;
