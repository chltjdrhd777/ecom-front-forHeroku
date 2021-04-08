import React, { ChangeEvent, useState } from "react";
import { useEffect } from "react";
import { Address_DocumentType_forFront } from "../../../../../server/src/model/address";
import AddressInput_form from "./AddressInput_form";
import { useContentBody2context } from "./Content_body2";

interface AddressInputProps {
  blankList: string[];
  isBlank: (key: string) => true | undefined;
  getChildrenvalue: (name?: string, value?: string) => void;
  setAddressInfoToServer: /*  React.Dispatch<React.SetStateAction<Address_DocumentType_forFront>>; */ React.Dispatch<React.SetStateAction<any>>;
  addressInfoToServer: /* Address_DocumentType_forFront; */ any;
  setAddAddresExpand: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddressInputs({ blankList, isBlank, getChildrenvalue, setAddressInfoToServer, addressInfoToServer, setAddAddresExpand }: AddressInputProps) {
  const contentBody2_context = useContentBody2context();
  const [radio, setRadio] = useState({ value: "" });
  useEffect(() => {
    contentBody2_context?.resetValue && setRadio({ value: "" });
  }, [contentBody2_context?.resetValue]);

  const commonData = [
    { label: "Name", name: "name", maxLength: 20 },
    {
      label: "10-digit mobile number",
      name: "mobileNumber",
      isPhoneNumberErr: blankList[0] === "NaN" ? "NaN" : blankList[0] === "!enough" ? "!enough" : undefined,
      maxLength: 10,
    },
    { label: "Pincode", name: "pinCode", maxLength: 20 },
    { label: "Locality", name: "locality", maxLength: 40 },
    { label: "Address", name: "address", maxLength: 50 },
    { label: "City/District/Town", name: "cityDistrictTown", maxLength: 40 },
    { label: "State", name: "state", maxLength: 30, customSelector: true },
    { label: "Landmark(Optional)", name: "landmark", maxLength: 30, optional: true },
    {
      label: "Alternate 10-digit Phone(Optional)",
      name: "alternatePhone",
      isPhoneNumberErr: blankList[0] === "NaN-alternate" ? "NaN-alternate" : blankList[0] === "!enough-alternate" ? "!enough-alternate" : undefined,
      maxLength: 10,
      optional: true,
    },
  ];
  return (
    <>
      <fieldset>
        {commonData.slice(0, 4).map((eachData, index) => {
          return (
            <AddressInput_form
              key={index}
              label={eachData.label}
              name={eachData.name}
              maxLength={eachData.maxLength}
              giveMeYourValue={getChildrenvalue}
              isEmpty={eachData.optional ? undefined : isBlank(eachData.name)}
              isPhoneNumberErr={eachData.isPhoneNumberErr && (eachData.isPhoneNumberErr as any)}
              isReset={contentBody2_context?.resetValue}
            />
          );
        })}
      </fieldset>

      <AddressInput_form
        label={"Address"}
        maxLength={50}
        name={"address"}
        giveMeYourValue={getChildrenvalue}
        isEmpty={isBlank("address")}
        isReset={contentBody2_context?.resetValue}
      />

      <fieldset>
        {commonData.slice(5, 10).map((eachData, index) => {
          return (
            <AddressInput_form
              key={index}
              label={eachData.label}
              name={eachData.name}
              maxLength={eachData.maxLength}
              giveMeYourValue={getChildrenvalue}
              isEmpty={eachData.optional ? undefined : isBlank(eachData.name)}
              isPhoneNumberErr={eachData.isPhoneNumberErr && (eachData.isPhoneNumberErr as any)}
              customSelector={eachData.customSelector ? eachData.customSelector : undefined}
              isReset={contentBody2_context?.resetValue}
            />
          );
        })}
      </fieldset>

      <fieldset style={{ transition: "all 0.2s ease", border: blankList[0] === "addressType" ? "1px solid red" : "" }}>
        <p style={{ margin: "20px 0 10px 0", color: blankList[0] === "addressType" ? "red" : "gray", fontSize: "0.85rem" }}>Address type</p>
        <label>
          <input
            type="radio"
            name="addressType"
            value="home"
            checked={radio.value === "home"}
            onChange={(e) => {
              setRadio({ value: e.target.value });
              setAddressInfoToServer({ ...addressInfoToServer, [e.target.name]: e.target.value });
            }}
          />
          <span style={{ margin: "0 30px 0 10px" }}>{"Home (All day delivery)"}</span>
        </label>

        <label>
          <input
            type="radio"
            name="addressType"
            value="work"
            checked={radio.value === "work"}
            onChange={(e) => {
              setRadio({ value: e.target.value });
              setAddressInfoToServer({ ...addressInfoToServer, [e.target.name]: e.target.value });
            }}
          />
          <span style={{ margin: "0 10px" }}>{"Work (Delivery between 10AM - 5PM)"}</span>
        </label>
      </fieldset>

      <fieldset>
        <button
          type="submit"
          style={{
            border: "none",
            background: "#5c97f5",
            color: "white",
            padding: "15px",
            margin: "10px 30px 0 0",
            fontSize: "1rem",
            borderRadius: "10px",
          }}
        >
          {" "}
          save this address
        </button>
        <button
          type="button"
          style={{ background: "transparent", color: "var(--main)", marginLeft: "30px", fontWeight: "bold" }}
          onClick={() => setAddAddresExpand(false)}
        >
          cancel
        </button>
      </fieldset>
    </>
  );
}

export default AddressInputs;
