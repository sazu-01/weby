
export interface User {
    _id: string,
    FullName: string,
    Email: string,
    PhoneNumber: string,
    IsAdmin: boolean,
    IsBanned: boolean
}

//define auth state interface
export interface authState {
    user: User | null,
    isLoading: boolean,
    error: null | string,
    isLoggedIn : boolean,
}


//define login credentials interface
export interface loginCredentilas {
    Email: string,
    Password: string
}
