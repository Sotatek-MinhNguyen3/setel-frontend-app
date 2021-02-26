import axios, {AxiosPromise, AxiosRequestConfig} from 'axios';
import {ApiRequestUrl} from './constant';
import { MOCK_JWT_TOKEN } from './constant';

export const client = (props: AxiosRequestConfig): AxiosPromise => axios({
    method: props.method,
    baseURL: ApiRequestUrl.BASE,
    url: props.url,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MOCK_JWT_TOKEN}`
    },
    data: props.data
})