
export function IsEditableManager(userRol, campusName){

    let answer = {
        isEditable: true,
        isFKValue: false
    };

    if(userRol != 'SUPER_ADMINISTRADOR'){
        if(campusName == 'FK_TUSUARIO' || campusName == 'FK_TESTABLECIMIENTO'){
            answer.isFKValue = true;
        }

        if(campusName != 'FK_TUSUARIO' && campusName != 'FK_TESTABLECIMIENTO'){
            answer.isEditable = true;
        }
    }else{

        if(campusName == 'FK_TUSUARIO'){
            answer = {
                isEditable: false,
                isFKValue: true
            };
        }
    }

    return answer;
};