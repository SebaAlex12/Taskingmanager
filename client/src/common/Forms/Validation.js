export const isValid = (string, params) => {
    const { notEmpty } = params;
    let validation = {
      status: true,
      message: ''
    }
  
    if(notEmpty){
        if(string.trim().length === 0){
              validation = {
                  status: false,
                  message: 'Pole nie może być puste'
              }
        } 
    }
    return validation;
}