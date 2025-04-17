export interface SignInBody {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }
  
  export interface LogInBody {
    email: string;
    password: string;
  }
  
  export interface Token {
    token: string;
    user: {
      id: number;
      email: string;
      role: string;
      firstName: string;
      lastName: string;
    };
  }