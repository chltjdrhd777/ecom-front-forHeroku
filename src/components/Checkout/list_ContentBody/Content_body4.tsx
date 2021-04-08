import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCart, selectCheckout } from "redux/mainReducer";
import styled from "styled-components";
import { TossedCheckoutInfo, useTossedCheckoutInfo_Context } from "routes/Checkout";
import CartItems from "components/CartItems";
import { setProcessCheck, setUserConfirm } from "redux/checkoutList";
import { useState } from "react";
import ModalGlobal from "components/ModalsGlobal";
import { Spinner } from "react-bootstrap";

function Content_body4() {
  const totalAmmount = useTossedCheckoutInfo_Context()?.totalPriceForShow.replace(",", ".")!;
  console.log(totalAmmount);
  const { everyItemArrayByKey, totalPriceForShow } = useTossedCheckoutInfo_Context() as TossedCheckoutInfo;
  const { cartItems } = useSelector(selectCart);
  const dispatch = useDispatch();

  const [loadingShow, setLoadingShow] = useState(false);
  const [checkout, setCheckout] = useState(false);

  const Modalbody = () => {
    return (
      <div style={{ width: "100%", height: "100%", flexDirection: "column" }} className="centering">
        <p style={{ fontSize: "30px" }}>please wait</p>
        <Spinner animation="border" />
      </div>
    );
  };

  const paypalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.paypal
      .Buttons({
        style: {
          color: "blue",
          shape: "pill",
          label: "pay",
        },

        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: totalAmmount,
                },
              },
            ],
          });
        },

        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            console.log(details, data);
          });
        },
      })
      .render(paypalRef.current);
  }, []);

  return (
    <Styled_contentBody4_div>
      <div className="payment_container">
        <p className="centering">please finish your payment with</p>

        <div className="paypal_container" ref={paypalRef}></div>
      </div>

      <ModalGlobal show={loadingShow} setToContainer modalBody={Modalbody} />
    </Styled_contentBody4_div>
  );
}

const Styled_contentBody4_div = styled.div`
  width: 100%;
  position: relative;

  & .payment_container {
    display: flex;
    & > p {
      margin-right: 10px;
      margin-bottom: 0;
      border-right: 1px solid gray;
      padding: 20px;
    }

    & .paypal_container {
      margin-top: 10px;
    }

    & .payment_options_container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      cursor: pointer;
      & .payment_byPaypal {
        background-color: #7fc5ee;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        height: 50px;
        width: 177px;

        & > button {
          background-color: transparent;
        }
      }
    }
  }
`;

export default Content_body4;
