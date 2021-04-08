import React from "react";
import { useState } from "react";
import { GiAntibody } from "react-icons/all";
import styled from "styled-components/macro";
import { generatePublicUrl } from "util/generatePublicUrl";
import { decQuantity, incQuantity, refreshCart } from "redux/cartSlice";
import { useDispatch } from "react-redux";

interface CartProps {
  img?: string;
  name?: string;
  price?: string;
  quantity?: number;
  _id?: string;
  notWantToShowChangePart?: boolean;
}

function CartItems({ img, name, price, quantity, _id, notWantToShowChangePart }: CartProps) {
  const dispatch = useDispatch();

  const onDeleteFromLocalStorage = () => {
    const getlocalStorage = JSON.parse(localStorage.getItem("cart")!);
    if (getlocalStorage) {
      delete getlocalStorage[`${_id}`];
      localStorage.setItem("cart", JSON.stringify(getlocalStorage));
      dispatch(refreshCart(getlocalStorage));
    }
  };

  return (
    <CartItemsListDiv>
      <div className="eachItems">
        <div className="item-img centering">
          <img src={img && generatePublicUrl(img)} alt="" />
        </div>

        <div className="item_details">
          <p style={{ fontWeight: 500, fontSize: "17px" }}>{name && name}</p>
          <span>8.0 rem</span>
          <span>provider</span>

          <div className="pricing flex">
            <span>$ {price && price}</span>
            <span style={{ textDecoration: "line-through", color: "lightgray", marginLeft: "10px" }}>$20.212</span>
            <span style={{ color: "green", marginLeft: "10px" }}>
              {`31% off 2offers applied`}
              <GiAntibody />
            </span>
          </div>
        </div>
        <div className="delivery_date flex-column">
          <span>
            {`Delivery in 10 - 12 days`} <span style={{ color: "green" }}>Free</span> <span style={{ textDecoration: "line-through" }}>#40</span>
          </span>

          <span style={{ color: "gray" }}>{`7 Days Replacement policy`}</span>

          <div className="product_quantity flex" style={{ visibility: notWantToShowChangePart ? "hidden" : undefined }}>
            <div className="counterButtonsCont flex">
              <button
                className="centering"
                onClick={() => {
                  const decreaseQuantity = new Promise((resolve, reject) => {
                    _id && resolve(dispatch(decQuantity({ _id })));
                  });

                  decreaseQuantity.then(() => {
                    const updatedData = JSON.parse(localStorage.getItem("cart")!);
                    dispatch(refreshCart(updatedData));
                  });
                }}
              >
                -
              </button>

              <div className="counter centering">{quantity}</div>

              <button
                className="centering"
                onClick={() => {
                  const increaseQuantity = new Promise((resolve, reject) => {
                    _id && resolve(dispatch(incQuantity({ _id })));
                  });

                  increaseQuantity.then(() => {
                    const updatedData = JSON.parse(localStorage.getItem("cart")!);
                    dispatch(refreshCart(updatedData));
                  });
                }}
              >
                +
              </button>
            </div>
          </div>

          <div className="save_or_delte" style={{ visibility: notWantToShowChangePart ? "hidden" : undefined }}>
            <button onClick={onDeleteFromLocalStorage}>delete from cart</button>
          </div>
        </div>
      </div>
    </CartItemsListDiv>
  );
}

const CartItemsListDiv = styled.div`
  & .eachItems {
    background: white;
    width: 100%;
    display: flex;
    border-bottom: 1px solid #efefef;
    & a {
      font-size: 1.3rem;
    }

    & .item-img {
      flex: 1 1 15%;
      padding: 10px;
      & img {
        background: white;
        width: 80%;
        height: 100px;
        object-fit: contain;
      }
    }

    & .item_details {
      flex: 1 1 50%;
      padding: 10px;
      background: white;
      display: flex;
      flex-direction: column;
    }

    & .delivery_date {
      flex: 1 1 30%;
      padding: 10px;
    }

    & .product_quantity {
      margin-top: 10px;
      .counterButtonsCont {
        & .counter {
          border: 1px solid lightgray;
          width: 50px;
          margin: 0 10px;
        }
        & > button {
          background: none;
          border: 1px solid lightgray;
          padding: 15px;
          border-radius: 50%;
          width: 20px;
          height: 20px;
        }
      }
    }

    & .save_or_delte {
      margin-top: 10px;

      & button {
        border: none;
        margin-right: 5px;
        cursor: pointer;
        padding: 3px 5px;
        color: white;
        transition: all 0.2s ease-in;
        border-radius: 10px;
        &:hover {
          transform: translateY(-2px);
        }
        &:active {
          transform: translateY(2px);
        }

        &:nth-child(1) {
          background-color: #45a745;
        }

        &:nth-child(2) {
          background-color: var(--main);
        }
      }
    }
  }
`;

export default CartItems;
