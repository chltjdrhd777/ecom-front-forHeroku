import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { NativeError } from "mongoose";
import React, { createContext, useContext, useEffect, useState } from "react";
import { BiRadioCircleMarked, BiRadioCircle } from "react-icons/bi";
import { IoNavigate } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addAddressFunc, getAddressFunc, deleteAddressFunc, Received_addressInfo } from "redux/addressSlice";
import { loading } from "redux/cartSlice";
import { setProcessCheck, setSelectedAddress } from "redux/checkoutList";
import { selectAddress } from "redux/mainReducer";
import styled from "styled-components";
import AddressInputs from "./AddressInputs";

export const Contentbody2context = createContext<{ resetValue: boolean } | undefined>(undefined);
export const useContentBody2context = () => useContext(Contentbody2context);

function Content_body2() {
  const dispatch = useDispatch();

  //#dataSets//////////////////////////////////////////////////
  const { addressArr } = useSelector(selectAddress).userAddress;
  const [clickedAddress, setClickedAddress] = useState("");
  const [AddAddressExpand, setAddAddresExpand] = useState(false);

  let addressInfoDefault = { name: "", mobileNumber: "", pinCode: "", locality: "", address: "", cityDistrictTown: "", state: "", addressType: "" };

  const [addressInfoToServer, setAddressInfoToServer] = /* useState<Address_DocumentType_forFront>(addressInfoDefault); */ useState<any>(
    addressInfoDefault
  );
  const [resetValue, setResetValue] = useState(false);

  /*   console.log(addressInfoToServer); */
  ////////////# ////////////////////////////////////////////////

  //!functions///////////////////////////////////////////////////
  useEffect(() => {
    dispatch(getAddressFunc());
  }, []);

  useEffect(() => {
    setClickedAddress(addressArr && addressArr[0].address);
  }, [addressArr]);

  useEffect(() => {
    if (resetValue) {
      setAddressInfoToServer(addressInfoDefault);
    }
  }, [resetValue]);

  const [blankList, setBlankList] = useState([] as string[]);

  const isBlank = (name: string) => {
    if (blankList[0] === name) return true;
  };

  const getChildrenvalue = (name?: string, value?: string) => {
    setAddressInfoToServer({ ...addressInfoToServer, [name!]: value });
  };

  const onAddressSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //* 1. to find whether there is a "" or not
    const blankCheck = Object.values(addressInfoToServer);

    //# 2. set the blank list.
    let blankGathering = [] as string[];

    //# 3. check the conditions.

    //^ case 1. if there is a blank in the data to be sent to server
    if (blankCheck.some((eachValue) => eachValue === "")) {
      //& ok, we know that there is blank. so let's gether the blanks
      Object.keys(addressInfoToServer).forEach(
        (each) => addressInfoToServer[each as keyof typeof addressInfoToServer] === "" && blankGathering.push(each)
      );

      //& let's find out the case = ok phone is not empty but you sent text!!!
      const forMobileCheck = addressInfoToServer.mobileNumber.split(""); // ex "a123asgdga" = ["a","1","2","3,""a",.....]

      if (addressInfoToServer.mobileNumber !== "" && forMobileCheck.some((each: any) => isNaN(parseInt(each)))) {
        blankGathering.unshift("NaN");
        alert("plase enter number not text");
      } else if (addressInfoToServer.mobileNumber !== "" && addressInfoToServer.mobileNumber.length < 10) {
        blankGathering.unshift("!enough");
        alert("plase enter 10 digits");
      }

      setBlankList(blankGathering);

      return;
    }

    //^ case 2. if the optional phone number has the problem
    if (addressInfoToServer.alternatePhone !== undefined) {
      //#ok, when the optional phone is not blank,
      const forAlternatePhoneCheck = addressInfoToServer.alternatePhone?.split("");

      if (forAlternatePhoneCheck?.some((each: any) => isNaN(parseInt(each)))) {
        blankGathering.unshift("NaN-alternate");
        alert("please enter number not text");
        setBlankList(blankGathering);
        return;
      } else if (addressInfoToServer.alternatePhone?.length < 10) {
        blankGathering.unshift("!enough-alternate");
        alert("plase enter 10 digits");
        setBlankList(blankGathering);
        return;
      }
    }

    //^ case 3. there is no problem
    setBlankList([]);
    dispatch(loading("pending"));
    const updateTimesortObj = { ...addressInfoToServer, timeSort: Date.now() };

    new Promise((resolve: (value: any) => void) => {
      resolve(dispatch(addAddressFunc({ addressInfoToServer: updateTimesortObj })));
    }).then((result: PayloadAction<AxiosResponse<NativeError | Received_addressInfo>>) => {
      const { status, data } = result.payload;

      if (status === 400) {
        let receive = data as NativeError;
        alert(receive.message);
        return;
      }

      dispatch(loading("finished"));
      setResetValue(true);
      dispatch(getAddressFunc());
      setAddAddresExpand(false);
    });

    setResetValue(true);

    dispatch(getAddressFunc());

    setAddAddresExpand(false);
  };

  const onClickCircle = (eachAddress: any /* Address_DocumentType */) => {
    if (eachAddress.address === clickedAddress) return setClickedAddress("");
    setClickedAddress(eachAddress.address);
  };

  const onDelete = (eachAddress: any /* Address_DocumentType */) => {
    dispatch(loading("pending"));
    new Promise((resolve) => {
      resolve(dispatch(deleteAddressFunc(eachAddress._id)));
    }).then(() => {
      dispatch(loading("finished"));
      dispatch(getAddressFunc());
    });
  };

  const onDeliverHere = () => {
    const selectedAddress = addressArr.find((each: any) => each.address === clickedAddress);
    dispatch(setSelectedAddress(selectedAddress));
    dispatch(setProcessCheck([false, false, true, false]));
  };

  //! /////////////////////////////////////////////////////////////////

  return (
    <>
      <div className="checkout_detailCont2">
        {addressArr &&
          addressArr.length > 0 &&
          addressArr.map((eachAddress: any, index: any) => (
            <EachAddress_container key={index} clicked={eachAddress.address === clickedAddress} imLastOne={index === addressArr.length - 1 && true}>
              {/* //# 1. circle_clicekd */}
              <div className="checkedIcon">
                {eachAddress.address === clickedAddress ? (
                  <BiRadioCircleMarked style={{ cursor: "pointer", fontSize: "27px" }} onClick={() => onClickCircle(eachAddress)} />
                ) : (
                  <BiRadioCircle style={{ cursor: "pointer", fontSize: "27px" }} onClick={() => onClickCircle(eachAddress)} />
                )}
              </div>

              {/* //# 2. main address information */}
              <div className="eachAddress_mainInfo" style={{ flex: 1 }}>
                <div className="address_row_1">
                  <span>{eachAddress && eachAddress.name}</span>{" "}
                  <div className="phone_detail">
                    <div
                      style={{ background: "lightgray", fontSize: "10px", color: "gray", fontWeight: 500, padding: "0 10px", margin: "0 10px" }}
                      className="centering"
                    >
                      {eachAddress && eachAddress.addressType}
                    </div>
                    <span>{eachAddress && eachAddress.mobileNumber}</span>
                  </div>
                </div>
                {/* /////////////////////////////////////////////////////////////////// */}
                <div className="address_row_2">{eachAddress && eachAddress.address}</div>
                {/* ///////////////////////////////////////////////////////////// */}
                <button onClick={onDeliverHere}>DELIVER HERE</button>
              </div>

              {/* //# 3. left edit button */}
              <div>
                <span style={{ color: "var(--main)", cursor: "pointer" }} onClick={() => onDelete(eachAddress)}>
                  DELETE
                </span>
              </div>
            </EachAddress_container>
          ))}

        {/* //$ bottom add space */}
        <div
          className="add_newAddressContainer"
          style={{
            paddingTop: "10px",
            cursor: "pointer",
            background: "#e9f1f5",
            display: addressArr && addressArr.length >= 5 ? "none" : undefined,
          }}
          onClick={(e) => {
            setAddAddresExpand(!AddAddressExpand);
            setResetValue(false);
          }}
        >
          {/* //# 1. dropdown head */}
          <h2
            style={{
              marginBottom: 0,
              background: !AddAddressExpand ? "white" : "#e9f1f5",
              padding: "10px 20px",
              color: "var(--main)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                background: AddAddressExpand ? "lightgray" : undefined,
                color: AddAddressExpand ? "gray" : undefined,
                display: "flex",
                alignItems: "center",
                height: "100%",
              }}
            >
              <h3 style={{ height: "20px" }} className="centering">
                +
              </h3>
            </div>
            <div
              style={{
                fontSize: "1rem",
                marginLeft: "15px",
                color: !AddAddressExpand ? "var(--main)" : "gray",
                paddingBottom: "3px",
              }}
            >
              Add a new address
            </div>
          </h2>
        </div>
        {/* //# dropdown body */}
        <div
          className="add_newAddrress_fromHereContainer"
          style={{
            borderTop: "1px solid lightgray",
            padding: "20px 40px",
            display: !AddAddressExpand ? "none" : undefined,
            background: !AddAddressExpand ? "gray" : "#e9f1f5",
          }}
        >
          <div style={{ background: "var(--main)", padding: "10px 15px", border: "none", marginBottom: "15px", color: "white" }}>
            <IoNavigate style={{ marginRight: "15px" }} />
            you can add your addresses less then 5
          </div>

          <form onSubmit={(e) => onAddressSubmit(e)}>
            {/* //! AddressInputs = input gatering */}
            <Contentbody2context.Provider value={{ resetValue }}>
              <AddressInputs
                blankList={blankList}
                isBlank={isBlank}
                getChildrenvalue={getChildrenvalue}
                setAddressInfoToServer={setAddressInfoToServer}
                addressInfoToServer={addressInfoToServer}
                setAddAddresExpand={setAddAddresExpand}
              />
            </Contentbody2context.Provider>
          </form>
        </div>
      </div>
    </>
  );
}

export default Content_body2;

//! styled component && inline styles

interface IsThisAddressClicked {
  clicked: boolean;
  imLastOne?: boolean;
}

const EachAddress_container = styled.div<IsThisAddressClicked>`
  display: flex;
  padding: 20px;
  transition: all 0.18s ease-in;
  background: ${(props) => props.clicked && "#f0f0f0"};
  border-bottom: ${(props) => props.imLastOne && "3px solid lightgray"};
  &:hover {
    background: #ececec;
  }
  & .checkedIcon {
    margin-right: 10px;
    & svg {
      color: ${(props) => (props.clicked ? "var(--main)" : null)};
    }
  }
  & .eachAddress_mainInfo {
    & .address_row_1 {
      display: flex;
      margin-bottom: 10px;
      flex: 1;
      & .phone_detail {
        display: flex;
      }
      & span {
        font-weight: 500;
      }
    }
    & .address_row_2 {
      width: 70%;
    }
    & > button {
      display: ${(props) => !props.clicked && "none"};
      border: none;
      background-color: #ff5100;
      padding: 10px 30px;
      margin-top: 15px;
      font-size: 0.8rem;
      color: white;
      font-weight: 500;
      box-shadow: 0 1px 5px 2px lightgray;
    }
  }
`;
