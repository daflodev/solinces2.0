// @ts-ignore
export function AvalibleSelecteManager(selectName: string, currentRol: any, currentAcademicPeriod: any, currentCampus: any, currentInstitution: any, currentAcademicYear: any){

    let answer = {
        defaultValue: null,
        isDisable: false
    }

    if(currentRol != 'SUPER_ADMINISTRADOR'){
        switch (selectName) {
            case 'FK_TESTABLECIMIENTO':

                answer = {
                    defaultValue: currentInstitution?.value,
                    isDisable: true
                }
                
                break;

            default:
                answer = {
                    defaultValue: null,
                    isDisable: false
                }
               
        }
    }

    return answer;

}