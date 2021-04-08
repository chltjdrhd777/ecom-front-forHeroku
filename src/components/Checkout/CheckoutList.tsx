import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCheckout, selectUser } from "redux/mainReducer";
import { userLogouts } from "redux/userSlice";
import styled from "styled-components/macro";

import CheckoutList_body from "./CheckoutList_body";
import ContentBody1 from "./list_ContentBody/Content_body1";
import ContentBody2 from "./list_ContentBody/Content_body2";
import ContentBody3 from "./list_ContentBody/Content_body3";
import ContentBody4 from "./list_ContentBody/Content_body4";

import { setProcessCheck, setSelectedAddress, setUserConfirm } from "redux/checkoutList";
import Checkout_BarAndButton from "./list_ContentBody/Checkout_BarAndButton";
import { useState } from "react";

function CheckoutList() {
  const { userData } = useSelector(selectUser);
  const { processCheck, selectedAddressInfo, userConfirm } = useSelector(selectCheckout).checkoutList;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData && selectedAddressInfo && Object.keys(selectedAddressInfo).length > 0) {
      //# if there is an user data
      //# skip the first process
      dispatch(setProcessCheck([false, false, true, false]));
    } else if ((userData && !selectedAddressInfo) || (userData && selectedAddressInfo && Object.keys(selectedAddressInfo).length === 0)) {
      dispatch(setProcessCheck([false, true, false, false]));
    } else {
      dispatch(setProcessCheck([true, false, false, false]));
    }
  }, [userData]);

  return (
    <ListArticles>
      <CheckoutList_body
        index={1}
        title={
          userData ? (
            <Checkout_BarAndButton
              userData={userData}
              barTitle={"login"}
              emailShow={true}
              buttonTitle={"change"}
              onClick={() => {
                dispatch(setSelectedAddress({}));
                dispatch(userLogouts());
              }}
            />
          ) : (
            "login or signup"
          )
        }
        processData={processCheck[0]}
        lowercase
        body={<ContentBody1 />}
      />

      <CheckoutList_body
        index={2}
        title={
          selectedAddressInfo && Object.keys(selectedAddressInfo).length > 0 ? (
            <Checkout_BarAndButton
              barTitle={"delivery address"}
              buttonTitle={"change"}
              onClick={() => {
                dispatch(setSelectedAddress({}));
                dispatch(setProcessCheck([false, true, false, false]));
              }}
              additionalCss
            />
          ) : (
            "delivery address"
          )
        }
        processData={processCheck[1]}
        body={<ContentBody2 />}
      />
      <CheckoutList_body
        index={3}
        title={
          userConfirm && processCheck[3] === true ? (
            <Checkout_BarAndButton
              barTitle={"order summary"}
              buttonTitle={"reCheck"}
              onClick={() => {
                dispatch(setUserConfirm(false));
                dispatch(setProcessCheck([false, false, true, false]));
              }}
              additionalCss
            />
          ) : (
            "order summary"
          )
        }
        processData={processCheck[2]}
        body={<ContentBody3 />}
      />

      <CheckoutList_body index={4} title={"payment options"} processData={processCheck[3]} body={<ContentBody4 />} />
    </ListArticles>
  );
}

//# styled-component///////////////////////////////////////////////////

const ListArticles = styled.article`
  //# Common body = .check_container > ListHeadeDiv / .checkout_content > .checkout_detailCont 1~4
  & .check_container {
    margin-bottom: 20px;
    box-shadow: 0 5px 5px 0 lightgray;
    & .checkout_content {
      background-color: white;
      & .checkout_detailCont1 {
        display: flex;
        & .list_login_part {
          padding: 25px;
          flex: 1 1 50%;
          & form {
            display: flex;
            flex-direction: column;
            position: relative;
            & input {
              border: none;
              width: 100%;
              border-bottom: 1px solid lightgray;
              &:focus {
                border-bottom: 1.2px solid var(--main);
              }
              &::-webkit-input-placeholder {
                color: #a8a6a6;
                font-weight: 500;
              }
              &:first-child {
                margin-bottom: 20px;
              }
              &:nth-child(2) {
                margin-bottom: 15px;
              }
            }
            & button {
              padding: 15px;
              font-size: 17px;
              font-weight: 500;
              text-transform: uppercase;
              color: white;
              background-color: #ff5100;
              border: none;
              cursor: pointer;
              border-radius: 5px;
            }
          }
        }
        & .list_login_detail {
          flex: 1 1 50%;
          margin-left: 7%;
          margin-top: 15px;
          & svg {
            color: var(--main);
          }
        }
      }
      & .checkout_detailCont2 {
        width: 100%;
        height: 100%;

        & .add_newAddrress_fromHereContainer {
          & form {
            & fieldset:nth-child(1) {
              display: grid;
              grid-template-rows: repeat(2, 1fr);
              grid-template-columns: repeat(2, 1fr);
              grid-gap: 10px;
            }
            & > .addressInputs_container:nth-child(2) {
              width: 100%;
              height: 100px;
              margin: 10px 0;
            }
            & fieldset:nth-child(3) {
              display: grid;
              grid-template-rows: repeat(2, 1fr);
              grid-template-columns: repeat(2, 1fr);
              grid-gap: 10px;
            }
          }
        }
      }
    }
  }
`;

//# styled-component///////////////////////////////////////////////////
export default CheckoutList;
