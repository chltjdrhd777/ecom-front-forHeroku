import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAddress, selectCart, selectCheckout } from "redux/mainReducer";
import styled from "styled-components";
import { TossedCheckoutInfo, useTossedCheckoutInfo_Context } from "routes/Checkout";
import CartItems from "components/CartItems";
import { setProcessCheck, setUserConfirm } from "redux/checkoutList";
import { useState } from "react";
import ModalGlobal from "components/ModalsGlobal";
import { Spinner } from "react-bootstrap";
import PaypalButtons from "./Paypal";
import { IoIosAirplane } from "react-icons/io";
import CreateAccountModalbody from "./CreateAccountModalbody";

function Content_body4() {
  const totalAmmount = useTossedCheckoutInfo_Context()?.totalPriceForShow.replace(",", ".")!;
  const { cartItems } = useSelector(selectCart);
  const { selectedAddressInfo } = useSelector(selectCheckout).checkoutList;
  const { user } = useSelector(selectAddress).userAddress;
  const dispatch = useDispatch();

  const [modalShow, setModalShow] = useState(false);
  const [paypalComponent, setPaypalComponent] = useState<JSX.Element | null>(null);
  const [showCreateAccountBody, setShowCreateAccountBody] = useState(false);

  const sandToCreateAccountModalBodyProp = {
    showCreateAccountBody,
    setShowCreateAccountBody,
  };

  const onPaymentByCheckout = () => {
    let data = {
      userId: user && user,
      totalPrice: totalAmmount,
      products:
        cartItems &&
        Object.values(cartItems).map((each) => {
          return { _id: each._id, price: each.price, quantity: each.quantity };
        }),
      addressId: selectedAddressInfo._id,
    };

    setModalShow(true);
  };

  const onHandleClose = () => {
    setShowCreateAccountBody(false);
    setModalShow(false);
  };

  //! useReducer

  return (
    <Styled_contentBody4_div>
      <div className="payment_container">
        <p className="centering">please finish your payment with</p>

        <div className="payment_options_container">
          {/*     <div className="payment_FromHomepage" onClick={onPaymentByCheckout}>
            <button>By check</button>
          </div> */}

          {paypalComponent ? (
            paypalComponent
          ) : (
            <button
              type="button"
              className="payment_byPaypal"
              onClick={() => {
                setPaypalComponent(<PaypalButtons totalAmount={totalAmmount} />);
              }}
            >
              <IoIosAirplane />
              paypal
            </button>
          )}
        </div>
      </div>

      {/*    <ModalGlobal
        show={modalShow}
        setToContainer
        modalBody={() => <CreateAccountModalbody {...sandToCreateAccountModalBodyProp} />}
        closeFunction={onHandleClose}
      /> */}
    </Styled_contentBody4_div>
  );
}

const Styled_contentBody4_div = styled.div`
  width: 100%;
  position: relative;

  & .payment_container {
    display: flex;
    align-items: center;
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
      justify-content: center;
      align-items: center;
      cursor: pointer;

      & .payment_byPaypal,
      .payment_FromHomepage {
        background-color: #7fc5ee;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        height: 50px;
        width: 177px;

        & > button {
          background-color: transparent;
        }

        & > svg {
          font-size: 20px;
          margin-right: 10px;
        }
      }

      & .payment_FromHomepage {
        display: flex;
        justify-content: center;
        background: var(--buttoncolor);
        margin-right: 10px;

        & > button {
          color: white;
          font-weight: 500;
        }
      }
    }
  }

  & .payment_modalbody {
    width: 100%;
    height: 100%;
    flex-direction: column;

    & .account_summary {
      padding: 20px;
      margin: 10px;
      width: 92%;

      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #fcf5ea;

      & .eachAccountInfo_container {
        background-color: white;
        margin-bottom: 10px;
        display: flex;
        &:last-child {
          margin-bottom: 0;
        }
        & > p {
          flex: 1 1 35%;
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

    & .account_cotrolButton,
    .account_cotrolButton_continue {
      background: var(--main);
      padding: 10px;
      font-size: 15px;
      font-weight: 500;
      color: white;
      margin-top: 10px;
      border-radius: 10px;
    }

    & .account_cotrolButton_continue {
      background: var(--buttoncolor);
    }
  }
`;

export default Content_body4;
