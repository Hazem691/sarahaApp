import joi from 'joi' ;


export const signUpValidation = {
    body : joi.object({
        name : joi.string().alphanum().min(3).max(20).required(),
        email : joi.string().email().required(),
        password : joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
})
}

export const signInValidation = {
    body : joi.object({
        email : joi.string().email().required(),
        password : joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    })
}