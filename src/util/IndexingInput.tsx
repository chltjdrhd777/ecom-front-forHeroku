import React, { ChangeEvent } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectProduct } from "redux/mainReducer";
import styled from "styled-components/macro";
import product, { ProductBaseDocumentType } from "../../../server/src/model/product";

interface InputProps {
  targetData: any[];
}

function IndexingInput({ targetData }: InputProps) {
  const [inputFocused, setInputfocused] = useState(false);
  const [filteredNameList, setFilteredNamelist] = useState([] as any[]);
  const [serachValue, setSearchValue] = useState("");

  const { docs } = useSelector(selectProduct)?.products;

  const renderKeywords = () => {
    const targetData = filteredNameList;
    let keywordList = [] as string[];
    for (let i = 0; i < 5; i++) {
      keywordList.push(targetData[i]);
    }

    return keywordList;
  };

  const renderedList = renderKeywords().filter((each) => each !== undefined);

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    let targetValue = serachValue;
    targetValue = e.target.value;
    setSearchValue(targetValue);

    //Make list's name as capital
    let targetNameList = targetData.map((eachName): string => eachName.toUpperCase());

    let toPushThisData2 =
      targetValue === "" ? [] : targetNameList.map((eachstring) => (eachstring.indexOf(targetValue.toUpperCase()) !== -1 ? eachstring : undefined));

    let finalData = targetData.filter((each, defaultDataIndex) => toPushThisData2[defaultDataIndex] !== undefined && each);

    setFilteredNamelist(finalData);
    finalData.length > 0 ? setInputfocused(true) : setInputfocused(false);
  };

  return (
    <Styled_InputDiv inputFocused={inputFocused}>
      <input
        type="text"
        placeholder="Search what you find here"
        value={serachValue}
        onChange={onChangeValue}
        onFocus={() => {
          filteredNameList.length > 0 && setInputfocused(true);
        }}
        onBlur={() => {
          setInputfocused(false);
        }}
        style={{ height: "100%", width: "600px", padding: 0 }}
      />

      <div className="productList_withKeyword">
        {renderedList.map((e, i) => {
          let target = docs && (docs.find((each: any) => each.name === e) as any); /* ProductBaseDocumentType */

          return (
            <Link to={target ? `/${target.slug}/${target._id}` : ""} target="_blank" key={i}>
              {e}
            </Link>
          );
        })}
      </div>
    </Styled_InputDiv>
  );
}

interface Styled_InputType {
  inputFocused?: boolean;
}
const Styled_InputDiv = styled.div<Styled_InputType>`
  position: relative;
  & .productList_withKeyword {
    &:hover {
      display: flex;
    }

    display: ${(props) => (props.inputFocused ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    background: white;
    width: 570px;
    margin-top: 10px;
    z-index: 999;
    padding: 20px;
  }
`;

export default IndexingInput;
