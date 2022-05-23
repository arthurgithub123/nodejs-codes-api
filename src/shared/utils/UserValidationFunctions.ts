import { GlobalErrorModel } from "../../models/GlobalErrorModel";

function validateName(name: string) {
  if(!name) {
    throw new GlobalErrorModel('Name can not be null or empty');
  }
  
  if(name.length < 6) {
    throw new GlobalErrorModel('Name must be at least 6 characters long');
  }
}

function validateEmail(email: string) {
  if(!email) {
    throw new GlobalErrorModel('Email can not be null or empty');
  }
  
  if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
    throw new GlobalErrorModel('Invalid email format');
  }
}

function validatePassword(password: string) {
  if(!password) {
    throw new GlobalErrorModel('Password can not be null or empty');
  }
  
  if(password.length < 10) {
    throw new GlobalErrorModel('Password must be at least 10 characters long');
  }
  
  if(!password.includes('-') &&
    !password.includes('+') &&
    !password.includes('=') &&
    !password.includes('_')
  ) {
    throw new GlobalErrorModel(
      'Password must have at least one character for - or + or = or _'
    );
  }

  let containsSomeCapitalLetter = false;

  Array.from(password).some(char => {
    if(char.toUpperCase() === char && char !== char.toLowerCase())
      containsSomeCapitalLetter = true;
  });

  if(!containsSomeCapitalLetter) {
    throw new GlobalErrorModel('Password must have a capital letter');
  }
}

export { validateName, validateEmail, validatePassword };
