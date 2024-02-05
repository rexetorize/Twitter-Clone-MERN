// this hook basically checks the auth of the user on every refresh

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {setAuth, setUser} from '../AuthRedux/AuthAction'

import {URL } from '../http/index'

export function useLoadingWithRefresh() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    
    useEffect(() => {

        (async () => {
            try {
                const { data } = await axios.get(
                    URL+`/auth/verify`,
                    {
                        withCredentials: true,
                    }
                );


              
                if(data.isAuth){
                    dispatch(setAuth(data.isAuth));
                    dispatch(setUser(data.user));

                }
                setLoading(false);
            } catch (err) {
                dispatch(setAuth(false))
                console.log(err);
                setLoading(false);
            }
        })();
    }, []);

    return { loading };
}

