import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCart, selectCheckout } from "redux/mainReducer";
import styled from "styled-components";
import { TossedCheckoutInfo, useTossedCheckoutInfo_Context } from "routes/Checkout";
import CartItems from "components/CartItems";
import { setProcessCheck, setUserConfirm } from "redux/checkoutList";

function Content_body3() {
  const { selectedAddressInfo } = useSelector(selectCheckout).checkoutList;
  const addressSummary = ["name", "mobile number", "address", "state", "city distrcition"];
  const { everyItemArrayByKey, totalPriceForShow } = useTossedCheckoutInfo_Context() as TossedCheckoutInfo;
  const { cartItems } = useSelector(selectCart);
  const dispatch = useDispatch();

  return (
    <Styled_contentBody3_div>
      <article className="address_summary">
        {addressSummary.map((eachPart, index) => (
          <div className="eachAddressInfo_container" key={index}>
            <p>{eachPart}</p>
            <span>
              {eachPart === "mobile number"
                ? selectedAddressInfo.mobileNumber
                : eachPart === "city distrcition"
                ? selectedAddressInfo.cityDistrictTown
                : selectedAddressInfo[eachPart]}
            </span>
          </div>
        ))}
      </article>

      <article className="cartItem_summary">
        {everyItemArrayByKey.length > 0 &&
          everyItemArrayByKey.map((eachCart, index) => {
            return <CartItems key={index} {...cartItems[eachCart]} notWantToShowChangePart />;
          })}
      </article>

      <article className="price_summary">
        <article
          className="go_to_nextProcess_container"
          onClick={() => {
            dispatch(setUserConfirm(true));
            dispatch(setProcessCheck([false, false, false, true]));
          }}
        >
          <button>Confirm</button>
        </article>

        <p>{`$ ${totalPriceForShow}`}</p>
        <p>total price</p>
      </article>
    </Styled_contentBody3_div>
  );
}

const Styled_contentBody3_div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & .address_summary {
    padding: 20px;
    margin: 10px;
    width: 92%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #fcf5ea;

    & .eachAddressInfo_container {
      background-color: white;
      margin-bottom: 10px;
      display: flex;
      &:last-child {
        margin-bottom: 0;
      }
      & > p {
        flex: 1 1 10%;
        margin: 0;
        border-right: 1px solid lightgray;
        text-align: center;
        font-weight: 500;
      }
      & > span {
        margin-left: 10px;
        flex: 1 1 75%;
      }
    }
  }

  & .price_summary {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;

    & > p {
      margin-bottom: 0;
      margin-right: 30px;
    }
    & > p:nth-child(3) {
      text-transform: uppercase;
      font-size: 1.2rem;
      color: green;
    }
    & > p:nth-child(2) {
      font-size: 2rem;
    }

    & .go_to_nextProcess_container {
      padding: 20px;

      & > button {
        background-color: var(--buttoncolor);
        padding: 20px 30px;
        border-radius: 20px;
        color: white;
        font-weight: 500;
        font-size: 1rem;
        transition: all 0.1s ease-in;
        &:hover {
          background-color: #a3bbe9;
          transform: translateY(-1px);
        }
        &:active {
          transform: translateY(1px);
        }
      }
    }
  }
`;

export default Content_body3;
