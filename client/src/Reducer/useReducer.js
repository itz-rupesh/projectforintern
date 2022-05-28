export const initialState = {
    userState: "UNAUTHORIZED",
    image:"",
    name:""
};


export const reducer = (state, action) => {
    switch (action.type) {
        case "USER":
            return { userState: "USER", image: action.payload.image, name: action.payload.name };
        case "ORGANIZATION":
            return { userState: "ORGANIZATION", image: action.payload.image, name: action.payload.name  };
        case "UNAUTHORIZED":
            return { userState: "UNAUTHORIZED", image: "", name: ""  };
        default:
            return { userState: "UNAUTHORIZED", image: "", name: ""  };
    }
}