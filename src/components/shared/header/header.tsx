import { Button } from "antd";
import { DropdownHeaderFilter } from "./DropdownHeaderFilter";
import { MainMenu } from "./menu/menu";
import { SideOptions } from "./side-options/SideOptions";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { logout } from "../../../services/helper/auth-helper";

  
const HeaderComponent = () => {

  const navigate = useNavigate();

  // const Logout = () => {
  //   navigate("/layout/configuracion");
  //   localStorage.clear();

  // }

    const itemsToTestHeaderFilter = [
        {
          key: "1",
          label: "Sede Principal",
        },
        {
          key: "2",
          label: "Sede Gestor",
        },
        {
          key: "3",
          label: "Sede Recursos",
        },
      ];
      
      const itemsToTestHeaderFilterB = [
        {
          key: "1",
          label: "2020",
        },
        {
          key: "2",
          label: "2021",
        },
        {
          key: "3",
          label: "2022",
        },
        {
          key: "4",
          label: "2023",
        },
      ];
      
      const itemsToTestHeaderFilterC = [
        {
          key: "1",
          label: "periodo 1",
        },
        {
          key: "2",
          label: "periodo 2",
        },
        {
          key: "3",
          label: "periodo 3",
        },
        {
          key: "4",
          label: "periodo 4",
        },
      ];
  
    return (
      <>
        <div className="plataforma-zYY">
          <div className="auto-group-x9vx-Rdr">
            <div className="component-3-9Jx">
              {MainMenu(
                <div className="menu-icon-6EC">
                  <div className="frame-55-pR6">MENU PRINCIPAL</div>
                  <div className="frame-57-tvk">
                    <svg
                      className="back-to-white"
                      width="24"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2 12C2 11.4477 2.44772 11 3 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H3C2.44772 13 2 12.5523 2 12Z"
                        fill="black"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z"
                        fill="black"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2 18C2 17.4477 2.44772 17 3 17H21C21.5523 17 22 17.4477 22 18C22 18.5523 21.5523 19 21 19H3C2.44772 19 2 18.5523 2 18Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                  <img className="vector-7-1kU" src="REPLACE_IMAGE:981:1944" />
                </div>
              )}
            </div>
  
            <div className="frame-61-Lnk">
              <div className="frame-54-Utx">
                {/* TODO: remplazar el asset que viene a continuacion por uno default */}
                {/* <img
                  className="rectangle-25-dWx"
                  src={managerAssetsRoots("nav/images/rectangle-25-XRi.png")}
                /> */}
                <div className="frame-56-wGk">
                  <div className="frame-68-69e">
                    <div className="frame-53-pbS">IE SOLEDAD ACOSTA</div>
                    <img
                      className="frame-58-XVr"
                      src="./assets/nav/images/frame-58.png"
                    />
                  </div>
                  <div className="frame-67-s3v">
                    <div className="auto-group-u1rg-P2G">
                      {DropdownHeaderFilter(itemsToTestHeaderFilter)}
  
                      {DropdownHeaderFilter(itemsToTestHeaderFilterB)}
  
                      {DropdownHeaderFilter(itemsToTestHeaderFilterC)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="frame-61-Lnk">
              <div className="frame-59-WKA">
                <div className="auto-group-ukst-F1r">
                  {/* <img
                    className="rectangle-26-BAQ"
                    src={managerAssetsRoots("nav/images/rectangle-26-HCC.png")}
                  />
                  <img
                    className="rectangle-27-WCg"
                    src={managerAssetsRoots("nav/images/rectangle-27-r3z.png")}
                  />
                  <Link key="/base/caracter" to="/base/caracter">
                    <img
                      className="bell-qEx"
                      src={managerAssetsRoots("nav/images/bell.png")}
                    />
                  </Link> */}
                </div>
                {/* TODO: remplazar el asset que viene a continuacion por uno default */}
                {/* <img
                  className="rectangle-25-yrx"
                  src={managerAssetsRoots("nav/images/rectangle-25.png")}
                /> */}
              </div>
            </div>
            <Button
              onClick={() => {
                logout()
              }}
            >
              Logout
            </Button>
          </div>
        </div>
  
        {SideOptions()}
      </>
    );
  }
  

  export default HeaderComponent