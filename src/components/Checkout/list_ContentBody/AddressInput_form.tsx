import React, { ChangeEvent, Component, Reducer } from "react";
import styled from "styled-components/macro";
import { formatGroupLabel, stateOptions } from "util/react-select";
import Select from "react-select";
import { Contentbody2context } from "./Content_body2";

interface AddressInputFormTypes {
  label: string;
  maxLength: number;
  customSelector?: boolean;
  name: string;
  giveMeYourValue?: (name: string, value: string) => void;
  isEmpty?: true;
  isPhoneNumberErr?: "NaN" | "!enough" | "NaN-alternate" | "!enough-alternate";
  isReset?: boolean;
}

//# 1. class component
class AddressInput_form extends Component<AddressInputFormTypes> {
  constructor(props: AddressInputFormTypes) {
    super(props);
    AddressInput_form.contextType = Contentbody2context;
  }

  targetContainerDiv: HTMLDivElement | null = null;
  targetInput: HTMLInputElement | null = null;

  defaultState = {
    isfocused: false,
    value: "",
    customSelector: { value: "", label: "" },
  };

  state = this.defaultState;

  whenFocused = () => {
    this.setState({ ...this.state, isfocused: true });
  };
  whenBlurred = () => {
    this.setState({ ...this.state, isfocused: false });
  };

  getSnapshotBeforeUpdate(preProps: any, preState: any) {
    return { preProps, preState };
  }

  componentDidUpdate(preProps: any, preState: any, snapshot: any) {
    if (this.context.resetValue && this.context.resetValue !== preProps.isReset) {
      this.setState(this.defaultState);
    }
    this.props.customSelector && this.state.value !== snapshot.preState.value && console.log("yes", this.state, snapshot);
  }

  render() {
    return (
      <AddAddressContainer_styled
        ref={(div) => (this.targetContainerDiv = div)}
        onClick={() => {
          this.targetInput && this.targetInput.focus();
        }}
        isfocused={this.state.isfocused}
        isEmpty={this.props.isEmpty}
        isPhoneNumberErr={this.props.isPhoneNumberErr}
        className="addressInputs_container"
      >
        <h3
          style={{
            fontSize: "0.8rem",
            color:
              this.props.isEmpty === true ||
              this.props.isPhoneNumberErr === "NaN" ||
              this.props.isPhoneNumberErr === "!enough" ||
              this.props.isPhoneNumberErr === "!enough-alternate" ||
              this.props.isPhoneNumberErr === "NaN-alternate"
                ? "red"
                : "gray",
          }}
        >
          {this.props.label}
        </h3>
        {this.props.customSelector ? (
          <Select
            value={this.state.customSelector}
            options={stateOptions}
            formatGroupLabel={formatGroupLabel}
            onChange={(e) => {
              this.setState({ ...this.state, value: e!.label, customSelector: e });
              this.props.giveMeYourValue!(this.props.name, e!.label);
            }}
          />
        ) : (
          <input
            type="text"
            style={{ border: "none", width: "100%" }}
            placeholder={
              this.props.isEmpty === true
                ? `please enter your ${this.props.name}`
                : this.props.isPhoneNumberErr === "NaN"
                ? "please enter number"
                : this.props.isPhoneNumberErr === "!enough"
                ? "please enter 10 digit"
                : undefined
            }
            maxLength={this.props.maxLength}
            ref={(input) => {
              this.targetInput = input;
            }}
            onFocus={this.whenFocused}
            onBlur={this.whenBlurred}
            name={this.props.name}
            value={this.state.value}
            onChange={(e) => {
              this.setState({ ...this.state, ["value"]: e.target.value });
              this.props.giveMeYourValue!(e.target.name, e.target.value);
            }}
          />
        )}
      </AddAddressContainer_styled>
    );
  }
}

interface AddAddressContainerProps {
  isfocused: boolean;
  isEmpty?: boolean;
  isPhoneNumberErr?: "NaN" | "!enough" | "!enough-alternate" | "NaN-alternate";
}

const AddAddressContainer_styled = styled.div<AddAddressContainerProps>`
  transition: all 0.25s ease;
  border: ${(props) =>
    props.isfocused
      ? "1px solid var(--main)"
      : props.isEmpty === true ||
        props.isPhoneNumberErr === "!enough" ||
        props.isPhoneNumberErr === "NaN" ||
        props.isPhoneNumberErr === "!enough-alternate" ||
        props.isPhoneNumberErr === "NaN-alternate"
      ? "1px solid red"
      : "1px solid lightgray"};
  background: white;
  padding: 10px;
`;

export default AddressInput_form;
