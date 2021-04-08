import React from "react";
import styled from "styled-components/macro";

interface CommonBodyProp {
  index: number;
  title: string | JSX.Element;
  processData: boolean;
  lowercase?: boolean;
  body: JSX.Element;
}

function CheckoutList_body({ index, title, processData, lowercase, body }: CommonBodyProp) {
  return (
    <div className="check_container">
      <ListHeadDiv className=" flex" process={processData} lowercase={lowercase}>
        <p className="centering">{index}</p>
        <div className="checkout_title">{title}</div>
      </ListHeadDiv>

      {processData ? <div className="checkout_content">{body}</div> : null}
    </div>
  );
}

interface ListHeadProp {
  process: boolean;
  lowercase?: boolean;
}
const ListHeadDiv = styled.div<ListHeadProp>`
  background-color: ${(props) => (props.process ? "var(--main)" : "white")};
  padding: 20px;
  align-items: center;
  & p {
    width: 30px;
    height: 30px;
    margin: 0;
    background: ${(props) => (props.process ? "white" : "lightgray")};
    color: var(--main);
    margin-right: 10px;
  }
  //*header title
  & .checkout_title {
    text-transform: ${(props) => (props.lowercase ? null : "uppercase")};
    font-weight: 500;
    font-size: 1.2rem;
    color: ${(props) => (props.process ? "white" : "lightgray")};
    width: 100%;
  }
  & .checkout_content {
    background-color: white;
  }
`;
export default CheckoutList_body;
