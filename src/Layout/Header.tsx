import React, { ChangeEvent, FormEvent, PropsWithChildren, useState } from "react";
import styled from "styled-components/macro";
import { useSelector, useDispatch } from "react-redux";
import { selectCart, selectCategory, selectModalInfo, selectProduct, selectUser } from "redux/mainReducer";
import { BsSearch, FaShoppingCart, MdKeyboardArrowDown } from "react-icons/all";
import Logo from "imgs/logo.png";
import { onClicked, onRegisterClicked } from "redux/modalSlice";
import ModalsGlobal from "components/ModalsGlobal";
import { loading, loginFunc, userLogouts, userRegisters } from "redux/userSlice";
import Dropdown from "components/DropDown";
import "bootstrap/dist/css/bootstrap.css";
import { Spinner } from "react-bootstrap";
import { Link, RouteComponentProps } from "react-router-dom";
import IndexingInput from "util/IndexingInput";

function Header(props: PropsWithChildren<{ wantBarOnly?: boolean; routerProps?: RouteComponentProps }>) {
  const { categories } = useSelector(selectCategory);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { userData, error } = useSelector(selectUser);
  const { cartItems } = useSelector(selectCart);
  const { docs } = useSelector(selectProduct).products;

  //make indexsing
  const nameList = docs && docs.map((eachProduct: any) => eachProduct.name);
  /*  const [filteredNameList, setFilteredNamelist] = useState([] as string[]);
  const [isResearched, setIsResearched] = useState(false);
  const [serachValue, setSearchValue] = useState(""); */

  const renderCategory = (categoryList: any[]) => {
    let renderedCategory = [];
    for (let category of categoryList) {
      renderedCategory.push(
        <li key={category._id}>
          {category.parentId && category.name !== "Mobiles" ? (
            /*    <a href={`http://localhost:8070/${category.slug}?categoryId=${category._id}&type=${category.type}`}>{category.name}</a> */
            <Link
              to={
                `/${category.slug}?categoryId=${category._id}&type=${category.type}`
                /*  window.location.hostname === "localhost"
                  ? `http://localhost:8070/${category.slug}?categoryId=${category._id}&type=${category.type}`
                  : `http://localhost:8070/${category.slug}?categoryId=${category._id}&type=${category.type}` */
              }
            >
              {category.name}
            </Link>
          ) : category.parentId && category.name === "Mobiles" ? (
            <span style={{ fontWeight: "bold" }}>{category.name}</span>
          ) : (
            <span>{category.name}</span>
          )}

          {category.children.length > 0 && <ul>{renderCategory(category.children)}</ul>}
        </li>
      );
    }

    return renderedCategory;
  };

  const handleLoginButton = () => {
    dispatch(onClicked());
  };
  const handleRegisterButton = () => {
    dispatch(onRegisterClicked());
  };

  const onLogout = () => {
    dispatch(userLogouts());
  };

  const loginModalBody = () => {
    return (
      <>
        <LoginModalBody>
          <section className="right_deco">
            <div>
              <h2>Login</h2>
              <p>
                Get access to your Orders!, Whishlist and
                <br />
                Recommendations
              </p>
            </div>

            <div className="right_deco_img">
              <img src={Logo} alt="" />
            </div>
          </section>

          <form
            className="left_mainSection flex-column"
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
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
                  setEmail("");
                  setPassword("");
                  dispatch(loading("finishied"));
                  dispatch(onClicked());
                }
              });
            }}
          >
            <input
              type="email"
              placeholder="enter your email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="enter your password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />

            <div className="login_buttons flex-column">
              <button className="login_button">Login</button>
            </div>
          </form>
        </LoginModalBody>
      </>
    );
  };

  const onClickLogo = () => {
    window.location.href = "/";
  };

  //*register
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { loadingState } = useSelector(selectUser);

  const onRegisterSave = () => {
    dispatch(loading("pending"));
    if (registerEmail === "" || registerPassword === "" || firstName === "" || lastName === "") {
      alert("default alert");
      return;
    }

    const sentData = {
      email: registerEmail,
      password: registerPassword,
      firstName,
      lastName,
    };

    dispatch(userRegisters(sentData));
    dispatch(loading("finishied"));
    setRegisterEmail("");
    setRegisterPassword("");
    setFirstName("");
    setLastName("");
    dispatch(onRegisterClicked());
  };
  const onRegisterCancel = () => {
    setRegisterEmail("");
    setRegisterPassword("");
    setFirstName("");
    setLastName("");
    dispatch(onRegisterClicked());
  };

  const registerModalBody = () => {
    return (
      <RegisterModalBody>
        <div className="register_container">
          {loadingState === "pending" ? (
            <div>
              <h1>please wait</h1>
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <>
              <h1>Register</h1>
              <form action="">
                <input
                  type="email"
                  placeholder="enter your email"
                  value={registerEmail}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setRegisterEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="enter your password"
                  value={registerPassword}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setRegisterPassword(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="enter your firt name"
                  value={firstName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="enter your last name"
                  value={lastName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                />
                <div className="register_button_container">
                  <button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.preventDefault();
                      onRegisterSave();
                    }}
                  >
                    save
                  </button>
                  <button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.preventDefault();
                      onRegisterCancel();
                    }}
                  >
                    cancel
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </RegisterModalBody>
    );
  };

  const { clicked, registerClicked } = useSelector(selectModalInfo);
  const userName = userData && userData.email.split("@")[0];

  return (
    <>
      {props.wantBarOnly ? (
        <>
          <Headerheader>
            <HeaderContainerdiv>
              {/*  <div className="logo_input_cont">
                <div className="header_logo" style={{ cursor: "pointer" }} onClick={onClickLogo}>
                  <img src={Logo} alt="" />
                </div>
              </div> */}
              <div className="logo_input_cont">
                <Link to="/" className="header_logo" style={{ cursor: "pointer" }} /* onClick={onClickLogo} */>
                  <img src={Logo} alt="" />
                </Link>
              </div>
            </HeaderContainerdiv>
          </Headerheader>
          {props.children}
        </>
      ) : (
        <>
          {" "}
          <ModalsGlobal show={clicked} modalBody={loginModalBody} onclickCheck={onClicked} />
          <ModalsGlobal show={registerClicked} modalBody={registerModalBody} onclickCheck={onRegisterClicked} />
          <Headerheader>
            <HeaderContainerdiv>
              <div className="logo_input_cont">
                {/* <div className="header_logo" style={{ cursor: "pointer" }} onClick={onClickLogo}>
                  <img src={Logo} alt="" />
                </div> */}

                <Link to="/" className="header_logo" style={{ cursor: "pointer" }} /* onClick={onClickLogo} */>
                  <img src={Logo} alt="" />
                </Link>

                <form
                  className="header_input"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <IndexingInput targetData={nameList} />

                  <BsSearch />
                </form>
              </div>

              <div className="header_menues">
                {userData ? (
                  <Dropdown
                    buttonTitle={userName}
                    Icon={MdKeyboardArrowDown}
                    linkInfo={[
                      {
                        href: "/",
                        title: "default",
                        linkOncliked: () => {
                          console.log("hi");
                        },
                      },
                    ]}
                    optional={() => {
                      return (
                        <>
                          <div onClick={onLogout}>log out</div>
                        </>
                      );
                    }}
                  />
                ) : (
                  <div className="centering">
                    <button onClick={handleLoginButton} className="header_login_button">
                      Login
                    </button>
                    <button onClick={handleRegisterButton} className="header_login_button">
                      register
                    </button>
                  </div>
                )}

                <Dropdown buttonTitle="More" Icon={MdKeyboardArrowDown} linkInfo={[{ href: "/", title: "default" }]} />

                <Link to="/cart" className="header_menues_cart">
                  <FaShoppingCart />
                  cart
                  {cartItems !== undefined && Object.keys(cartItems).length > 0 ? (
                    <div className="cart_count centering">{Object.keys(cartItems).length}</div>
                  ) : null}
                </Link>
              </div>
            </HeaderContainerdiv>
          </Headerheader>
          <SubMenueNav>
            <ul>{categories.categoryList !== undefined && categories.categoryList.length > 0 && renderCategory(categories.categoryList)}</ul>
          </SubMenueNav>
          {props.children}
        </>
      )}
    </>
  );
}

export const Headerheader = styled.header`
  width: 100%;
  height: 70px;
  background-color: #2874f0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderContainerdiv = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  height: 100%;

  & .logo_input_cont {
    display: flex;
    align-items: center;
    flex: 1;

    & .header_logo {
      width: 50px;
      height: 50px;
      overflow: hidden;

      & img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    & .header_input {
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

      & svg {
        color: #2874f0;
        font-size: 20px;
      }
    }
  }

  & .header_menues {
    display: flex;
    justify-content: space-between;
    width: 30%;
    height: 100%;
    align-items: center;

    & button {
      height: 50%;
      width: 50%;
      margin-right: 5px;
      cursor: pointer;
      border-radius: 10px;
      &.header_login_button {
        border: none;
        color: #2874f0;
        font-size: 1rem;
        background: white;
        outline: none;
        position: relative;
        padding: 10px;
      }
    }

    & .dropdown {
      width: 50%;
      height: 100%;
      margin-left: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      & .header_more_button {
        color: white;
        font-size: 1.3rem;
        background: transparent;
        border: none;
        outline: none;
        margin-right: 5px;

        & svg {
          color: white;
          font-size: 1.3rem;
          /*   position: absolute;
          top: 37%; */
          margin-left: 5px;
        }
      }

      & .dropdown_list {
        position: absolute;
        background-color: white;
        box-shadow: 0px 7px 10px 0px lightgray;
        z-index: 5;
        width: 200%;
        top: 100%;
        border-radius: 5px;
        right: -60%;
        display: none;

        & a {
          display: block;
          box-sizing: border-box;
          padding: 20px;
          text-decoration: none;
          color: #555454;
          &:hover {
            color: #2656f5;
            background-color: #b8c3e7;
            border-radius: 5px;
          }
        }
      }

      &:hover {
        & .dropdown_list {
          display: block;
        }
      }
    }

    & .header_menues_cart {
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 1.3rem;
      margin-left: 20px;
      position: relative;

      & svg {
        text-decoration: none;
        margin: 0 10px;
      }

      & .cart_count {
        position: absolute;
        top: -10px;
        right: 30px;
        background-color: #eb3477;

        width: 20px;
        height: 20px;
        border-radius: 50%;
        font-size: 15px;
      }
    }
  }
`;

const LoginModalBody = styled.div`
  display: flex;
  height: 100%;

  & .right_deco {
    flex: 0.37;
    background-color: #2874f0;
    box-sizing: border-box;
    padding: 20px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & > p {
      margin-top: 10px;
    }

    & .right_deco_img {
      text-align: center;
      height: 60%;

      & img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }

  & .left_mainSection {
    flex: 0.63;
    box-sizing: border-box;
    padding: 20px;
    display: flex;
    flex-direction: column;

    & input {
      border: none;
      border-bottom: 2px solid #2874f0;
      margin-bottom: 30px;
      outline: none;
      font-size: 1rem;
      &::-webkit-input-placeholder {
        color: #6563bd;
      }
    }

    & .login_buttons {
      display: flex;
      flex-direction: column;
      text-align: center;
      box-sizing: border-box;
      padding: 10px;
      height: 30%;

      & p {
        margin: 2rem 0;
      }

      & button {
        height: 50%;
        border: none;
        border-radius: 3px;
        font-size: 1rem;
        font-weight: bold;
        color: white;
        cursor: pointer;
        transition: all 0.1s ease-in;
        outline: none;
        &.login_button {
          background-color: #7ed5f0;

          &:hover {
            background: #617db3;
          }
        }

        &.otp_button {
          background-color: white;
          box-shadow: 0px 5px 10px -5px lightgray;
          color: #87afee;

          &:hover {
            transform: translateY(-3px);
          }
          &:active {
            transform: translateY(3px);
          }
        }
      }
    }
  }
`;

const RegisterModalBody = styled.div`
  background-color: #2874f0;
  height: 100%;
  min-height: 500px;
  border-radius: 10px;
  padding: 30px;

  & .register_container {
    background-color: white;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    & h1 {
      font-size: 2rem;
    }

    & form {
      width: 100%;
      height: 70%;
      text-align: center;

      & input {
        width: 70%;
        height: 15%;

        margin-top: 20px;
        border: none;
        outline: none;
        border-radius: 5px;
        padding: 15px;
        background-color: #6a9cec;
        font-size: 1.3rem;
        ::-webkit-input-placeholder {
          color: white;
          font-size: 1.3rem;
        }
      }

      & .register_button_container {
        height: 10%;
        width: 90%;
        display: flex;
        flex-direction: row-reverse;
        margin-top: 20px;
        & button {
          border: none;
          padding: 10px;
          border-radius: 10px;
          height: 50px;
          margin-bottom: 10px;
          color: #252424;
          outline: none;
          cursor: pointer;

          &:nth-child(1) {
            background-color: #e9a374;
            font-size: 1.3rem;
            margin-left: 10px;
          }
          &:nth-child(2) {
            background-color: #ced1d6;

            font-size: 1.3rem;
          }
        }
      }
    }
  }
`;

//article = menuheader
const SubMenueNav = styled.nav`
  width: 100%;
  height: 40px;
  background-color: white;
  border-bottom: 1px solid #cecece;
  box-shadow: 0 2px 2px -2px #333;

  & > ul {
    display: flex;
    margin: 0 50px;
    position: relative;

    //* li = > each menue
    & > li {
      &:hover > ul {
        display: block;
      }
      //* span = head title
      & > span {
        display: block;
        line-height: 40px;
        padding: 0 20px;
        cursor: pointer;
        font-size: 14px;
        &:hover {
          color: #80aaee;
        }
      }

      //* ul = children container
      & > ul {
        position: absolute;
        background-color: #ffffff;
        left: 0;
        right: 0;
        display: none;
        border: 1px solid lightgrey;
        z-index: 999;

        //* li = children's list
        & > li {
          margin: 0 20px;
          float: left;
          min-width: 200px;

          //* 1. a = each childrens' title
          & a {
            display: block;
            padding: 5px 0;
            color: #37353a;
          }

          & > a {
            font-weight: bold;
            font-size: 1rem;
          }

          //* 2. ul = children's children container
          & > ul {
          }
        }
      }
    }
  }
`;

export default Header;
