export const initialUser = "";


export const userReducer = (userState, userAction) => {

    switch (userAction.type) {
        case "USER": {
            console.log("called user")
            console.log(userState);
            console.log(userAction.payload)
            return userAction.payload;
        }
        case "ORGANIZATION": {
            console.log("called org")
            return userAction.payload;
        }
        case "NULL": {
            console.log("called null")
            return userState;
        }
        default: {
            console.log("called defaoult")
            return userState;
        }
    }
}