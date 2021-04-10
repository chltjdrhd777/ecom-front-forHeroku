import React, { createContext, useContext } from "react";
import { RouteComponentProps } from "react-router";
import { Aside, CartContainer_Main, MainCartPartArticle } from "routes/CartPage";
import Header from "Layout/Header";
import styled from "styled-components/macro";
import CheckoutAside from "components/Checkout/CheckoutAside";
import { useSelector } from "react-redux";
import { selectUser } from "redux/mainReducer";
import CheckoutList from "components/Checkout/CheckoutList";

export interface TossedCheckoutInfo {
  everyItemArrayByKey: string[];
  totalPriceForShow: string;
  totalQuantityForShow: number;
  RouterProps: RouteComponentProps;
}

export const TossedCheckoutInfo_Context = createContext<TossedCheckoutInfo | undefined>(undefined);
export const useTossedCheckoutInfo_Context = () => useContext(TossedCheckoutInfo_Context);

function Checkout(props: RouteComponentProps) {
  const tossedCheckoutInfo = props.history.location.state as TossedCheckoutInfo;
  const { userData } = useSelector(selectUser);

  return (
    <>
      <TossedCheckoutInfo_Context.Provider value={{ ...tossedCheckoutInfo, RouterProps: props }}>
        <Header wantBarOnly>
          <CartContainer_Main style={{ height: "100%", minHeight: "600px", flexWrap: "wrap" }}>
            <MainCartPartArticle style={{ backgroundColor: "#e9f1f5" }}>
              <CheckoutList />
            </MainCartPartArticle>

            <CheckoutAside
              itemLength={tossedCheckoutInfo && tossedCheckoutInfo.everyItemArrayByKey.length}
              totalPriceForShow={tossedCheckoutInfo && tossedCheckoutInfo.totalPriceForShow}
              totalQuantityForShow={tossedCheckoutInfo && tossedCheckoutInfo.totalQuantityForShow}
              notWantToShow={!userData ? true : false}
            />

            {/*  <Footer_Checkout>
              <article>
                Policies|Terms of use|Security|Privacy|Infringement <span>@2007-2020 Flipkart.com</span>{" "}
              </article>
            </Footer_Checkout> */}
          </CartContainer_Main>
        </Header>
      </TossedCheckoutInfo_Context.Provider>
    </>
  );
}

export const Footer_Checkout = styled.footer`
  width: 100%;
  border-top: 1px solid lightgray;
  height: 150px;
  min-height: 150px;
  background: #e9f1f5;
  padding: 2rem;
  display: flex;

  & article {
    margin-left: 5rem;
    color: gray;
    & span {
      margin-left: 2rem;
    }
  }
`;

export default Checkout;
