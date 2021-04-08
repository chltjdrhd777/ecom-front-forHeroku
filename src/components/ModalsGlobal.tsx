import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/macro";

interface ModalProps {
  show?: boolean;
  modalBody?: () => React.ReactNode;
  onclickCheck?: any;
  LinkIcon?: any;
  setToContainer?: boolean;
  closeFunction?: () => void;
}

function ModalsGlobal({ show, modalBody, onclickCheck, setToContainer, closeFunction }: ModalProps) {
  const dispatch = useDispatch();

  return (
    <ModalSection show={show} setToContainer={setToContainer}>
      <ModalMainDiv>
        {modalBody && modalBody()}
        <button
          style={{ display: !closeFunction || !onclickCheck ? "none" : undefined }}
          onClick={() => {
            if (closeFunction) {
              return closeFunction();
            } else if (onclickCheck) {
              onclickCheck && dispatch(onclickCheck());
            }
          }}
        >
          X
        </button>
      </ModalMainDiv>
      <DarkBackground
        setToContainer={setToContainer}
        onClick={() => {
          if (closeFunction) {
            return closeFunction();
          } else if (onclickCheck) {
            onclickCheck && dispatch(onclickCheck());
          }
        }}
      ></DarkBackground>
    </ModalSection>
  );
}

const ModalSection = styled.section<ModalProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  display: ${(props) => (props.show === true ? undefined : "none")};
  transition: all 0.3s ease-in-out;
  opacity: ${(props) => (props.show ? 1 : 0)};
  z-index: 999;
  position: ${(props) => (props.setToContainer ? "undefined" : "absolute")};
  width: 100%;
  height: 100%;
  min-width: 770px;
  min-height: 450px;
`;

const ModalMainDiv = styled.div`
  width: 60%;
  height: 60%;
  min-height: 500px;
  background-color: white;
  position: absolute;
  top: 15%;
  z-index: 998;
  border-radius: 10px;

  & > button {
    background: transparent;
    position: absolute;
    top: 0;
    width: 5%;
    right: -5%;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    outline: none;
  }
`;

const DarkBackground = styled.div<ModalProps>`
  background-color: black;
  position: ${(props) => (props.setToContainer ? "absolute" : "fixed")};
  top: 0;

  opacity: 0.5;

  width: 100%;
  height: 100%;
  z-index: 997;
`;

export default ModalsGlobal;
