import React, { useState } from "react";

interface CreateAccountProps {
  showCreateAccountBody: boolean;
  setShowCreateAccountBody: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreateAccountModalbody({ showCreateAccountBody, setShowCreateAccountBody }: CreateAccountProps) {
  const onHandleAccountCreation = () => {
    setShowCreateAccountBody(false);
  };

  return showCreateAccountBody ? (
    <div className="payment_modalbody centering">
      <form action="" className="flex-column">
        <label>
          card number
          <input type="text" placeholder="" value="" onChange={() => {}} />
        </label>

        <label>
          bank name
          <input type="text" placeholder="" value="" onChange={() => {}} />
        </label>

        <label>
          card password
          <input type="text" placeholder="" value="" onChange={() => {}} />
        </label>

        <button type="button" className="account_cotrolButton" onClick={onHandleAccountCreation}>
          save this account
        </button>
        <button
          type="button"
          className="account_cotrolButton"
          style={{ background: "gray" }}
          onClick={() => {
            setShowCreateAccountBody(false);
          }}
        >
          cancle
        </button>
      </form>
    </div>
  ) : (
    <div className="payment_modalbody centering">
      <article className="account_summary">
        <div className="eachAccountInfo_container">
          <p>Card number</p>
          <span>123412341324</span>
        </div>

        <div className="eachAccountInfo_container">
          <p>Bank name</p>
          <span>good Bank</span>
        </div>
      </article>
      <button
        type="button"
        className="account_cotrolButton"
        onClick={() => {
          setShowCreateAccountBody(true);
        }}
      >
        want to add new account?
      </button>

      <button type="button" className="account_cotrolButton_continue">
        I want to use this account
      </button>
    </div>
  );
}

export default CreateAccountModalbody;
