import React, { useState } from "react";
import { useEffect } from "react";
import { IoIosSave, IoIosSchool, IoIosAddCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getAddressFunc } from "redux/addressSlice";
import { loading } from "redux/cartSlice";
import { selectUser } from "redux/mainReducer";
import { loginFunc } from "redux/userSlice";

function Content_body1() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userData } = useSelector(selectUser);

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [userData]);

  return (
    <div className="checkout_detailCont1">
      <div className="list_login_part">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email === "" || password === "") {
              alert("you should fill the form ");
              return;
            }
            dispatch(loading("pending"));

            new Promise((resolve) => {
              resolve(dispatch(loginFunc({ email, password })));
            }).then((result: any) => {
              if (result.payload.status === 400) {
                alert("wrong Id or password");
              } else if (result.payload.status === 200) {
                /*   setEmail("");
                setPassword(""); */
                dispatch(loading("finished"));
                dispatch(getAddressFunc());
              }
            });
          }}
        >
          <input type="email" placeholder="Enter your email" maxLength={20} value={email} onChange={(e) => setEmail(e.target.value)} />

          <input
            type="password"
            placeholder="Enter your password"
            minLength={1}
            maxLength={10}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button>continue</button>
        </form>
      </div>

      <div className="list_login_detail">
        <p>Advantage of our secure login</p>
        <p>
          <IoIosSave /> <span>Easily track orders,hassle free returns</span>
        </p>
        <p>
          <IoIosSchool /> <span>Get relavant alerts and recommendation</span>
        </p>
        <p>
          <IoIosAddCircle /> <span>Wishlist, revies, rating and more</span>
        </p>
      </div>
    </div>
  );
}

export default Content_body1;
