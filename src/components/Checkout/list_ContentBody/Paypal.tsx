import React, { useEffect, useRef } from "react";
import { useTossedCheckoutInfo_Context } from "routes/Checkout";

interface PaypalProps {
  totalAmount: string;
}

function Paypal({ totalAmount }: PaypalProps) {
  const tossedData = useTossedCheckoutInfo_Context();

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
                  value: totalAmount,
                },
              },
            ],
          });
        },

        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            console.log(details, data);
            if (details.status === "COMPLETED") {
              localStorage.removeItem("cart");
              tossedData?.RouterProps.history.replace("/purchasement");
            }
          });
        },
      })
      .render(paypalRef.current);
  }, []);

  return <div ref={paypalRef} style={{ marginTop: "30px" }}></div>;
}

export default Paypal;
