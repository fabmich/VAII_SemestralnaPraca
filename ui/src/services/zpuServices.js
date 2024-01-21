import axios from 'axios';

const BASE_ZPU_URL = 'http://localhost:8080/zpu';

class ZpuServices {



    findAllUlohy(accessToken, request) {

        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        };
        return axios.post(BASE_ZPU_URL + '/find-all-ulohy', request, {headers})
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error('Error:', error);
                throw error;
            });
    }



}
export default ZpuServices;
