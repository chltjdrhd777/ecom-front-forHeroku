import React, { AnchorHTMLAttributes, DetailedHTMLProps, MouseEventHandler, ReactNode } from "react";
import styled from "styled-components/macro";

interface DropDownProps {
  buttonTitle: string | undefined;
  Icon?: any;
  linkInfo: { href: string; title: string; linkOncliked?: () => void }[];

  optional?: () => ReactNode;
}

function DropDown({ buttonTitle, linkInfo, Icon, optional }: DropDownProps) {
  return (
    <>
      <DropDownSection>
        <div className="dropDown_more">
          <div>{buttonTitle}</div>
          <Icon />
        </div>
        <div className="dropdown_list">
          {linkInfo.map((eachLink, index) => (
            <a
              href={eachLink.href}
              key={index}
              onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                event.preventDefault();
                eachLink.linkOncliked && eachLink.linkOncliked();
              }}
            >
              {eachLink.title}
            </a>
          ))}

          <div className="optional_container">{optional && optional()}</div>
        </div>
      </DropDownSection>
    </>
  );
}

const DropDownSection = styled.section`
  width: 50%;
  height: 100%;
  margin-left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;

  & .dropDown_more {
    color: white;
    font-size: 1.3rem;
    background: transparent;
    border: none;
    outline: none;
    margin-right: 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    & svg {
      color: white;
      font-size: 1.3rem;
      margin-left: 5px;
    }
  }

  & .dropdown_list {
    position: absolute;
    background-color: white;
    border: 1px solid #dad0d0;
    z-index: 5;
    width: 200%;
    top: 100%;
    right: -60%;
    display: none;
    border-radius: 5px;

    & a,
    .optional_container > div {
      display: block;
      box-sizing: border-box;
      padding: 20px;
      text-decoration: none;
      color: black;
      border-bottom: 1px solid lightgray;
      &:hover {
        color: #2656f5;
        background-color: #b8c3e7;
      }
    }
  }

  &:hover {
    & .dropdown_list {
      display: block;
    }
  }
`;

export default DropDown;
