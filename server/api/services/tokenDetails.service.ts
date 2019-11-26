import { AxiosResponse } from 'axios';
import { http } from '../../common/http';

export async function getTokenDetails<T = string>(url: string, token: string): Promise<T> {
    const options = {
        headers: { Authorization: `${token}` },
    };
    const response: AxiosResponse<T> = await http.get(`${url}/details`, options);
    return response.data;
}
