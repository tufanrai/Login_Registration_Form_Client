import { axiosInstance } from "./axiosInstance.api";
import { ILogin, IRegister } from '@/components/interface/formInterface'

// log api 
export const LogUser = async (data : ILogin ) => {
    try{
        const response = await axiosInstance.post('/auth/login', data);
        return response.data;
    } catch (err:any) {
        return err.message;
    }
}

// register api
export const RegisterNewUser = async (data: IRegister) => {
    try{
        const response = await axiosInstance.post('/auth/register', data);
        return response.data;
    } catch ( err: any ) {
        return err.message;
    }
}