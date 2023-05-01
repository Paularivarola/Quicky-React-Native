const productReducer = (state = {
    products: [],
    filtered: [],
}, action) => {
    switch (action.type) {
        case 'GET_PRODUCTS':
            return {
                products: action.payload,
                filtered: action.payload
            }
        case "GET_FILTERED":
            let filteredList = state.products.filter((product) =>
                product.name.toLowerCase().includes(action.payload.trim().toLowerCase())
            );
            return {
                ...state,
                filtered: filteredList,
            };
        default:
            return state
    }
}

export default productReducer