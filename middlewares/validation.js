const method = ['body','params','query','headers'] ;
export const validation = (validateApi) => {

    return (req, res, next) => {
        let  dataError = [] ;
        method.forEach((item)=>{

               if(validateApi[item]){
                const data = validateApi[item].validate(req[item], { abortEarly: false });
                if(data.error){
                    dataError.push(data.error.details);
                }
               }
        }) ;
        if(dataError.length){
            res.json({err : dataError}) ;
        }else{
            next() ;
        }
        
        
    };
};
