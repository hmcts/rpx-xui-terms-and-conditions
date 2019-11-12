import axios, { AxiosResponse, AxiosInstance } from 'axios'

const http: AxiosInstance = axios.create({})

export async function validateS2sToken(url: string, s2sToken: string) {
    const options = {
        headers: { Authorization: `Bearer ${s2sToken}` },
    }
    const response = await http.get(`${url}/details`, options)
    return response.data
}
