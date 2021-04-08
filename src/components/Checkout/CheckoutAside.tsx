import React from "react";
import { SiSemanticweb } from "react-icons/all";
import { Aside } from "routes/CartPage";

interface CheckoutProps {
  itemLength?: number;
  totalQuantityForShow?: number | false;
  totalPriceForShow?: string | false;
  notWantToShow?: boolean;
}

function CheckoutAside({ itemLength, totalPriceForShow, totalQuantityForShow, notWantToShow }: CheckoutProps) {
  return (
    <Aside>
      <div className="price_detail" style={notWantToShow ? { display: "none" } : undefined}>
        <div
          style={{
            borderBottom: "1px solid #e0e0e0",
            marginBottom: "10px",
            fontSize: "1.5rem",
            fontWeight: "bold",
            textTransform: "uppercase",
            color: "gray",
          }}
        >
          <p>Price details</p>
        </div>

        <div style={{ borderBottom: "1px solid #e0e0e0", marginBottom: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>How many</p>{" "}
            <p>{` ${
              itemLength && itemLength > 1
                ? `${itemLength} items / ${totalQuantityForShow ? totalQuantityForShow : 0} quantities`
                : `1 item / ${totalQuantityForShow ? totalQuantityForShow : 0} quantity`
            }`}</p>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>Delivery Charges</p>
            <p style={{ color: "green", fontWeight: "bold" }}>FREE</p>
          </div>
        </div>

        <div
          style={{
            padding: "20px 0",
            fontSize: "1.5rem",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <p>Total amount</p>
          <p style={{ color: "green" }}>{`$ ${totalPriceForShow ? totalPriceForShow : 0}`}</p>
        </div>

        <div style={{ padding: "20px 0 0 0" }}>
          <p style={{ margin: 0, color: "green", fontWeight: "bold" }}>You will save $2,121 on this order</p>
        </div>
      </div>

      <div className="sub_description">
        <SiSemanticweb /> <span>Sale and Secure Payments returns 100% Authentic products</span>
      </div>
    </Aside>
  );
}

export default CheckoutAside;
