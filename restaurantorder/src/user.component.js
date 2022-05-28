import { useEffect, useRef, useReducer }  from "react";
import axiosInstance from "./axiosApi";

const useLoggedIn = (url) => {
    const cache = useRef({});

    const initialState = {
        status: 'idle',
        error: null,
        data: [],
    };

    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'FETCHING':
                return { ...initialState, status: 'fetching' };
            case 'FETCHED':
                return { ...initialState, status: 'fetched', data: action.payload };
            case 'FETCH_ERROR':
                return { ...initialState, status: 'error', error: action.payload };
            default:
                return state;
        }
    }, initialState);


    useEffect(() => {
        let cancelRequest = false;
        if (!url) return;

        const fetchUser = async () => {
            dispatch({ type: 'FETCHING' });
            if (cache.current[url]) {
                const data = cache.current[url];
                dispatch({ type: 'FETCHED', payload: data });
            } else {
                try {
                    const response = await axiosInstance.get(url);
                    const data = response.data.username;
                    cache.current[url] = data;
                    if (cancelRequest) return;
                    dispatch({ type: 'FETCHED', payload: data });
                } catch (error) {
                    if (cancelRequest) return;
                    dispatch({ type: 'FETCH_ERROR', payload: error.message })
                }
            }
        };

        fetchUser();

        return function cleanup() {
            cancelRequest = true;
        };

    }, [url])

    let status = state.status;
    let data = state.data;

    return { status, data };

}

export default useLoggedIn;