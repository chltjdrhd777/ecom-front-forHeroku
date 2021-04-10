import React, { ChangeEvent, useState, useReducer } from "react";
import { useEffect } from "react";
import { BsSearch } from "react-icons/all";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectProduct } from "redux/mainReducer";
import { useTossedCheckoutInfo_Context } from "routes/Checkout";
import styled from "styled-components/macro";

interface FormDataProps {
  targetData: any[];
}

function SearchForm({ targetData }: FormDataProps) {
  const [inputFocused, setInputfocused] = useState(false);
  const [iconShow, setIconShow] = useState(false);
  const [filteredNameList, setFilteredNamelist] = useState([] as any[]);
  const [serachValue, setSearchValue] = useState("");
  console.log(window.location);

  useEffect(() => {}, []);

  const { docs } = useSelector(selectProduct)?.products;

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    //?default search value = ""
    let targetValue = serachValue;
    targetValue = e.target.value;
    setSearchValue(targetValue);

    //? Make list's name as capital
    //? targetData = product string name list given from parent
    let targetNameList = targetData.map((eachName): string => eachName.toUpperCase());

    let toPushThisData2 =
      targetValue === "" ? [] : targetNameList.map((eachstring) => (eachstring.indexOf(targetValue.toUpperCase()) !== -1 ? eachstring : undefined));

    //? before = capital name list [] => to filtered original name list []
    let finalData = targetData.filter((each, defaultDataIndex) => toPushThisData2[defaultDataIndex] !== undefined && each);

    setFilteredNamelist(finalData);

    //? if search result is null, don't show the search bar
    finalData.length > 0 ? setInputfocused(true) : setInputfocused(false);
  };

  return (
    <Styled_searchForm
      onSubmit={(e) => {
        e.preventDefault();
        console.log(e);
        setSearchValue("");
        setFilteredNamelist([]);
        setInputfocused(false);
      }}
      showIcon={iconShow}
    >
      <Styled_InputDiv inputFocused={inputFocused}>
        <input
          type="text"
          placeholder="Search what you find here"
          value={serachValue}
          onChange={onChangeValue}
          onFocus={() => {
            setIconShow(true);
            filteredNameList.length > 0 && setInputfocused(true);
          }}
          onBlur={() => {
            setIconShow(false);
            setInputfocused(false);
          }}
          style={{ width: "100%", height: "100%", padding: "0" }}
        />

        <div className="productList_withKeyword">
          {filteredNameList.map((e, i) => {
            let target = docs && (docs.find((each: any) => each.name === e) as any); /* ProductBaseDocumentType */

            return (
              <Link to={target ? `/${target.slug}/${target._id}` : ""} /*  target="_blank" */ key={i}>
                {e}
              </Link>
            );
          })}
        </div>
      </Styled_InputDiv>

      <BsSearch />
    </Styled_searchForm>
  );
}

interface SearchFormProps {
  showIcon: boolean;
}

const Styled_searchForm = styled.form<SearchFormProps>`
  height: 35px;
  background-color: white;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  width: 80%;

  & input {
    height: 100%;
    border: none;
    outline: none;
    font-size: 15px;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
  }

  & > svg {
    color: #2874f0;
    font-size: 20px;
    display: ${(props) => (props.showIcon ? null : "none")};
  }
`;

interface Styled_InputType {
  inputFocused?: boolean;
}
const Styled_InputDiv = styled.div<Styled_InputType>`
  position: relative;
  width: 90%;

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

export default SearchForm;
