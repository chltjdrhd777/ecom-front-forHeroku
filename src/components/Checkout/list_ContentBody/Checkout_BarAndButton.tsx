import React from "react";
import { IoIosCheckmark } from "react-icons/io";

interface ButtonProps {
  userData?: /* UserBaseDocumentType; */ any;
  barTitle: string;
  emailShow?: true;
  buttonTitle: string;
  onClick: any;
  additionalCss?: true;
}

function Checkout_BarAndButton({ userData, barTitle, emailShow, buttonTitle, onClick, additionalCss }: ButtonProps) {
  return (
    <div style={{ marginLeft: "10px", width: "", display: "flex", justifyContent: "space-between" }}>
      <div>
        <div
          style={{
            color: "darkslategray",
            display: additionalCss ? "flex" : undefined,
            alignItems: additionalCss ? "center" : undefined,
            height: additionalCss ? "50px" : undefined,
          }}
        >
          {barTitle} <IoIosCheckmark style={{ fontSize: "1.5rem", color: "green" }} />
        </div>
        <div style={{ fontSize: "1rem" }}>{userData && userData.email && emailShow && userData.email}</div>
      </div>

      <div style={{ marginRight: "10px" }}>
        <button
          style={{
            color: "var(--main)",
            background: "transparent",
            border: "1px solid lightgray",
            height: "100%",
            width: "100px",
            textTransform: "uppercase",
            fontSize: "15px",
            fontWeight: 500,
            borderRadius: "10px",
          }}
          onClick={onClick}
        >
          {buttonTitle}
        </button>
      </div>
    </div>
  );
}

export default Checkout_BarAndButton;
