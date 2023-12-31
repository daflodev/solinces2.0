import { useEffect, useState } from "react";
import { apiGetThunksMainMenuAsync } from "@/services/api/thunks.ts";
import { login } from "@/services/helper/auth-helper.ts";

export const GetMenu = () => {
  const getItem : any =  localStorage.getItem("user_token_information") ?? null;
  const dataKCToken : any =  JSON.parse(getItem) ?? null;
    

  const [dataSource, setDataSource] = useState<any>([]);

  const apiGet = async () => {

    const tokenInformation = localStorage.getItem('user_token_information');
    const parserTokenInformation: any | null = tokenInformation ? JSON.parse(tokenInformation) : null;

    if (dataKCToken) {
      const getdata = {
        menu: ["NOMBRE", "ICONO", "URL", "VISIBLE", "ESTADO", "CODIGO"],
        schema: parserTokenInformation?.dataSchema[0],
        where: { "rol.CODIGO": `'${dataKCToken.rol[0]}'` },
        join: [
          {
            table: "rol_menu",
            columns: ["PK_TROL_MENU AS id_trol"],
            on: ["FK_TMENU", "menu.PK_TMENU"],
          },
          { table: "rol", on: ["PK_TROL", "rol_menu.FK_TROL"] },
        ],
        page: 0,
      };

      const getDataSource = await apiGetThunksMainMenuAsync(getdata);

      setDataSource(getDataSource);
    } else {
      login();
      setDataSource([]);
    }
  };

  useEffect(() => {
    apiGet();
  }, []);

  return {
    dataSource,
  };
};
