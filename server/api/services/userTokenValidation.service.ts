import axios, { AxiosResponse, AxiosInstance } from 'axios'

export const http: AxiosInstance = axios.create({})

export async function validateUserToken(url: string, s2sToken: any) {
    const options = {
        headers: { Authorization: `${s2sToken}` },
        //remove proxy after local testing is finished
        proxy: {
            host: 'proxyout.reform.hmcts.net',
            port: 8080,
        },
    }
    const response = await http.get(`${url}/details`, options)
    return response.data
}
