import React, { useEffect, useRef, useState } from "react";
import "./navbar.css";
import logo from "../../assets/logo.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
  selectUserEmail,
  selectUserId,
  selectUserName,
} from "../../redux/slice/authSlice";
import { BiUserCircle } from "react-icons/bi";
import { PiShoppingCartLight } from "react-icons/pi";
import { IoIosMenu } from "react-icons/io";
import { HashLink } from "react-router-hash-link";
import { AdminOnlyLink } from "../adminOnlyRoute/AdminOnlyroute";
import { OPEN_CART, SelectQuantity } from "../../redux/slice/cartSlice";
import { IoMdArrowDropdown } from "react-icons/io";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import "/node_modules/flag-icons/css/flag-icons.min.css";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const spanRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        setUserSignedIn(true);
        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userPhoto: user.photoURL,
            userName: user.displayName,
            userId: user.uid,
          })
        );
      } else {
        // User is signed out
        // ...
        setUserSignedIn(false);
      }
    });
  }, [dispatch]);
  const userName = useSelector(selectUserName);
  const userFullEmail = useSelector(selectUserEmail);
  const UserCutEmail = userFullEmail?.slice(0, userFullEmail.indexOf("@"));
  const cartQuantity = useSelector(SelectQuantity);
  const [userSignedIn, setUserSignedIn] = useState(false);
  const [swapLang, setswapLang] = useState("en");
  const userId = useSelector(selectUserId);
  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(REMOVE_ACTIVE_USER());

        toast.success("Sign-out successful", {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
          iconTheme: {
            primary: "#713200",
            secondary: "#FFFAEE",
          },
        });

        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        toast.error(error.message, {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
          iconTheme: {
            primary: "#713200",
            secondary: "#FFFAEE",
          },
        });
      });
  };

  const handleCart = () => {
    dispatch(OPEN_CART());
  };

  const handleMenu = () => {
    const menu = document.querySelector(".navbar-links");
    if (menu.style.display === "flex" && window.innerWidth <= 1115) {
      menu.style.display = "none";
    } else {
      menu.style.display = "flex";
    }
  };

  const langChange = (e, lang) => {
    setswapLang(lang);
    console.log(lang);
    window.localStorage.setItem("SerticLang", lang === "us" ? "en" : lang);
    i18next.changeLanguage(lang === "us" ? "en" : lang);
  };
  useEffect(() => {
    const lang = localStorage.getItem("SerticLang");
    if (lang) {
      if (lang === "en") {
        spanRef.current.className = "flag-icon fi fi-us mx-2";
      } else {
        spanRef.current.className = `<sp className='flag-icon fi fi-${lang} mx-2`;
      }
    } else {
      spanRef.current.className = "flag-icon fi fi-us mx-2";
    }
  }, [swapLang]);

  const location = useLocation();

  useEffect(() => {
    if (window.localStorage.getItem("SerticLang") === "false") {
      setswapLang(false);
    } else if (window.localStorage.getItem("SerticLang") === "true") {
      setswapLang(true);
    }

    if (location.pathname === "/en") {
      localStorage.clear();
      setswapLang(false);
    } else if (location.pathname === "/nl") {
      localStorage.clear();
      setswapLang(true);
    }
  }, [location]);

  return (
    <div className="navbarr d-flex justify-content-center  ">
      <div className="text-center responsive-nav d-flex align-items-center flex-wrap ">
        <AdminOnlyLink>
          <Link className="nav-admin" to="/admin/home">
            Admin
          </Link>
        </AdminOnlyLink>
        <Link to="/">
          <img className="logo-img " src={logo} alt="Microsoft Supplier" />
        </Link>

        <div className="d-flex align-items-center justify-content-between">
          <div className="navbar-links-container">
            <IoIosMenu
              onClick={handleMenu}
              className="menu-icon me-4"
              size={30}
            />
            <div onClick={handleMenu} className="navbar-links">
              <div className="chooselang">
                <span ref={spanRef}></span>
                <div className="language">
                  <span
                    onClick={(e) => langChange(e, "us")}
                    className={`text-capitalize   pe-2 lang ${
                      swapLang ? "" : "active"
                    } `}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="flag-icon fi fi-us mx-2"></span> English
                  </span>
                  <span
                    onClick={(e) => langChange(e, "de")}
                    className={`text-capitalize  pe-2 lang ${
                      swapLang ? "" : "active"
                    } `}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="flag-icon fi fi-de mx-2"></span>Deutsch
                  </span>
                  <span
                    onClick={(e) => langChange(e, "fr")}
                    className={`text-capitalize  pe-2 lang ${
                      swapLang ? "" : "active"
                    } `}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="flag-icon fi fi-fr mx-2"></span>Français
                  </span>
                  <span
                    onClick={(e) => langChange(e, "nl")}
                    className={`text-capitalize  pe-2 lang ${
                      swapLang ? "" : "active"
                    } `}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="flag-icon fi fi-nl mx-2"></span>Nederlands
                  </span>
                  <span
                    onClick={(e) => langChange(e, "es")}
                    className={`text-capitalize  pe-2 lang ${
                      swapLang ? "" : "active"
                    } `}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="flag-icon fi fi-es mx-2"></span>Español
                  </span>
                </div>
              </div>
              <NavLink to="/">{t("home")}</NavLink>
              <NavLink to="/about-us">{t("about us")}</NavLink>
              <NavLink to="shop">{t("shop")}</NavLink>
              <HashLink smooth to="/#plan">
                {t("supplier plan")}
              </HashLink>
              <HashLink smooth to="/#contact">
                {t("contact")}
              </HashLink>
            </div>
          </div>

          {userSignedIn ? (
            <div className=" user-container  p-2 d-flex  align-items-center">
              <BiUserCircle className="user-icon" size={25} />
              <div className=" username-signout ">
                <p className="mb-0 ms-1 username">
                  {userName ? userName : UserCutEmail}
                </p>
              </div>
              <IoMdArrowDropdown className="ms-1 droparrow" size={20} />
              <div className="user-dropdown  p-2 ">
                <button onClick={handleSignout} className="navbar-btn rounded">
                  {t("Sign Out")}
                </button>
                {/* <Link
                  to={`/${userId}/address-list`}
                  className="navbar-btn d-block rounded"
                >
                  {t("Address List")}
                </Link> */}
              </div>
            </div>
          ) : (
            <Link to="/Sign-in" className="navbar-btn-in">
              {t("Sign In")}
            </Link>
          )}
          <div className="cart">
            <PiShoppingCartLight
              onClick={handleCart}
              size={25}
              className="ms-4 cart-icon"
            />
            <p className="cart-count">{cartQuantity ? cartQuantity : 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
