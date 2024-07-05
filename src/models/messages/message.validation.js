import joi from "joi";

export const createMessageValidation = {
    body : joi.object({
        content : joi.string().alphanum().min(1).max(150).required(),
        
})
}
