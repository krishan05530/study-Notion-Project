import axios from 'axios';

export const axioInstance=axios.create({});

export const apiConnector = (method, url,bodyData, header,params)=>{
    return axioInstance({
        method:`${method}`,
        url:`${url}`,
        data:bodyData ? bodyData : null,
        headers:header ? header : null,
        params:params ? params : null
    });
}



