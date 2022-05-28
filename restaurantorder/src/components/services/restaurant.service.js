import axiosInstance from '../../axiosApi';

const addFoods = (data) =>{
    return axiosInstance.post('/restaurant/createFood/', data);
}

const getFood = (id) => {
    return axiosInstance.get('/restaurant/food/'+id);
}

const getDrink = (id) =>{
    return axiosInstance.get('/restaurant/drink/'+id);
}

const getExtra = (id) =>{
    return axiosInstance.get('/restaurant/extra/'+id);
}

const editFood = (id, data) => {
    return axiosInstance.put('/restaurant/food/'+id , data);
}

const editDrink = (id, data) =>{
    return axiosInstance.put('/restaurant/drink/'+id, data);
}

const editExtra = (id, data) =>{
    return axiosInstance.put('/restaurant/extra/'+id, data);
}

const addDrinks = (data) =>{
    return axiosInstance.post('/restaurant/createDrink/', data);

}

const addExtras = (data) =>{
    return axiosInstance.post('/restaurant/createExtra/', data);
}

const retriveAllFoods = () =>{
    return axiosInstance.get('/restaurant/get_allfood/');
}

const retriveAllDrinks = () =>{
    return axiosInstance.get('/restaurant/get_alldrink/');
}

const retriveAllExtra = () =>{
    return axiosInstance.get('/restaurant/get_allextra/');
}

export default {
    addFoods,
    addDrinks,
    addExtras,
    retriveAllDrinks,
    retriveAllFoods,
    retriveAllExtra,
    getFood,
    getDrink,
    getExtra,
    editFood,
    editDrink,
    editExtra
}