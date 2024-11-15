export const Email_VALIDATION ={
        required:'email is required',
        pattern:{
          value:/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message:'Email is not valid'
        }   
}

const PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
export const PASSWORD_VALIDATION ={
    required:'Password is required',
    pattern:{
      value:PasswordRegex,
      message:'At least 6 characters: UPPER/lower, numbers and special characters'
    }  
}