
class Util{
    errorsFormat (errors){
        let errorFormat = {};
    
        for (let index = 0; index < errors.length; index++) {
            errorFormat[errors[index].field] = errors[index].message;
        }

        return errorFormat;
    }
}

module.exports =  Util;