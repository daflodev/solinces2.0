import { Button } from "antd";
import { DropdownHeaderFilter } from "./DropdownHeaderFilter";
import { CascaderHeaderFilter } from "./CascaderHeaderFilter";
import { MainMenu } from "./menu/menu";
import { SideOptions } from "./side-options/SideOptions";

import { HeaderHook } from "./hooks/headerHook";

import { mainDrawerStore } from "../../../store/mainDrawerStore";

import default_cede_image from "../../../utils/assets/nav/images/rectangle-25-XRi.png";

import icon_one from "../../../utils/assets/nav/images/rectangle-26-HCC.png";
import icon_two from "../../../utils/assets/nav/images/rectangle-27-r3z.png";
import icon_three from "../../../utils/assets/nav/images/bell.png";
import icon_four from "../../../utils/assets/nav/images/rectangle-25.png";

import { Link } from "react-router-dom";
import { apiGetThunksAsync } from "../../../utils/services/api/thunks";
import { logout } from "../../../utils/services/helper/auth-helper";

import { useEffect } from "react";

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

const HeaderComponent = () => {

  const {
    institutionsAndCampusOptions,
    setInstitutionsAndCampusOptions,
    currentRol,
    currentInstitution,
    currentCampus,
    onChangeCascaderHeaderFilter,
    institutionAndCampusCaracterizationResponse,
    updateValue,
    addToArray,
    clearArray,
  } = HeaderHook()

  const { open } = mainDrawerStore();

  const generatorUnderFilterOptions = () => {

    const tokenInformation = localStorage.getItem('user_token_information');
    const parserTokenInformation: any | null = tokenInformation ? JSON.parse(tokenInformation) : null;

    const apiGetInstitutionsAndCampus = async () => {
      const prevData = {
        sede: ["PK_TSEDE", "NOMBRE AS NOMBRE_SEDE"],
        schema: parserTokenInformation?.dataSchema[0],
        where: {"usuario.CUENTA": `'${parserTokenInformation?.preferred_username}'`},
        join: [{ "table": "sede_usuario",
              "columns": "",
              "on": ["FK_TSEDE", "sede.PK_TSEDE"]},
                {  "table": "usuario",
              "columns": "",
              "on": ["PK_TUSUARIO", "sede_usuario.FK_TUSUARIO"]},
                {  "table": "establecimiento",
              "columns": ["PK_TESTABLECIMIENTO", "NOMBRE"],
              "on": ["PK_TESTABLECIMIENTO", "sede.FK_TESTABLECIMIENTO"]}
        ]
      };

      const getDataTable = await apiGetThunksAsync(prevData).then((response) => {
        const { getdata }: any = response;

        const res = institutionAndCampusCaracterizationResponse(getdata);

        const firstInstitution = {
          label: res[0]?.label,
          value: res[0]?.value.toString()
        }

        const firstCampus = res[0]?.children ? {
          value: res[0]?.children[0].value.toString(),
          label: res[0]?.children[0].label
        } : null

        updateValue([
          {
            element: "currentInstitution",
            value: firstInstitution
          },
          {
            element: "currentCampus",
            value: firstCampus
          }
        ])

        setInstitutionsAndCampusOptions(res)

        return res
      });
      return getDataTable
    };

    const apiGetAcademicPeriod = async (currentPKSede) => {
      const prevData = {
        sede: ["PK_TSEDE", "NOMBRE AS NOMBRE_SEDE"],
        schema:parserTokenInformation?.dataSchema[0],
        where: {"usuario.CUENTA": `'${parserTokenInformation?.preferred_username}'`, "sede.PK_TSEDE": currentPKSede},
                "join": [{ "table": "sede_usuario",
                       "columns": "",
                       "on": ["FK_TSEDE", "sede.PK_TSEDE"]},
                        {  "table": "usuario",
                       "columns": "",
                       "on": ["PK_TUSUARIO", "sede_usuario.FK_TUSUARIO"]},
                        {  "table": "establecimiento",
                       "columns": ["PK_TESTABLECIMIENTO", "NOMBRE"],
                       "on": ["PK_TESTABLECIMIENTO", "sede.FK_TESTABLECIMIENTO"]}
                ],
                "left_join": [{ "table": "periodo_academico",
                       "columns": ["NOMBRE", "PK_TPERIODO_ACADEMICO"],
                       "on": ["FK_TSEDE", "sede.PK_TSEDE"]}]
    
    };

      const getDataTable = await apiGetThunksAsync(prevData).then((response) => {
        const { getdata }: any = response;

        console.log("apiGetAcademicPeriod response: ", getdata)

        return getdata
      });
      return getDataTable
    };

    const apiGetRols = async (campusId: any) => {
      const user = parserTokenInformation.email;
      const prevData = {
        sede_usuario: "",
        schema:parserTokenInformation?.dataSchema[0],
        where: { "usuario.CUENTA": `'${user}'`, "sede_usuario.FK_TSEDE":campusId },
        join: [
          { "table": "usuario",  "on": ["PK_TUSUARIO", "sede_usuario.FK_TUSUARIO"] },
          { "table": "rol","columns": ["CODIGO"], "on": ["PK_TROL", "sede_usuario.FK_TROL"] }
      ]
    
    };

      const getDataTable = await apiGetThunksAsync(prevData).then((response) => {
        const { getdata }: any = response;
        clearArray()
        getdata.map((item) => {
          addToArray(item.CODIGO.toString())
        })

        updateValue({
          element: "currentRol",
          value: getdata[0].CODIGO
        })

        return getdata
      });
      return getDataTable

    };

    useEffect(() => {

      if(parserTokenInformation.preferred_username){
        apiGetInstitutionsAndCampus()
      }
    }, [])

    useEffect(() => {

      apiGetAcademicPeriod(currentCampus?.value)
      apiGetRols(currentCampus?.value)


    }, [currentCampus])

    //TODO: regresar condicion != "SUPER_ADMINISTRADOR" cuando se considere listo el filtrado de opciones relaiconadas con cede
    if(parserTokenInformation?.rol[0]){

      return(
        <div className="frame-67-s3v">
          <div className="auto-group-u1rg-P2G">
            {CascaderHeaderFilter(institutionsAndCampusOptions, onChangeCascaderHeaderFilter)}
            {DropdownHeaderFilter(itemsToTestHeaderFilterB)}
            {DropdownHeaderFilter(itemsToTestHeaderFilterC)}
          </div>
        </div>
      )
    }
  }

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
              <img
                className= "rectangle-25-dWx"
                src= {default_cede_image}
              />
              <div className="frame-56-wGk">
                <div className="frame-68-69e">
                  <div className="frame-53-pbS">{currentInstitution?.label}</div>
                  <img
                    className="frame-58-XVr"
                    src="./assets/nav/images/frame-58.png"
                  />
                </div>
                  {generatorUnderFilterOptions()}
                </div>
            </div>
          </div>

          <div className="frame-61-Lnk">
            <div className="frame-59-WKA">
              <div className="auto-group-ukst-F1r">
                <img
                  className="rectangle-26-BAQ"
                  src={icon_one}
                />
                <img
                  className="rectangle-27-WCg"
                  src={icon_two}
                />
                <Link key="/base/caracter" to="/base/caracter">
                  <img
                    className="bell-qEx"
                    src={icon_three}
                  />
                </Link>
              </div>

              {/* TODO: remplazar el asset que viene a continuacion por uno default */}
              <img
                className="rectangle-25-yrx"
                src={icon_four}
                onClick={()=> open()}
              />

            </div>
          </div>
          <Button
            onClick={() => {
              logout();
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