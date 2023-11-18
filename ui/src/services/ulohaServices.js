import axios from 'axios';
const BASE_ULOHA_URL = 'http://localhost:8080/uloha';


class UlohaServices {


    saveUloha(postData) {
        axios.post(BASE_ULOHA_URL + '/save', postData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                console.log('Response:', response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }



    findAllUlohy(accessToken) {

    const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    };
    return axios.post(BASE_ULOHA_URL + '/find-all', null, { headers })
        .then(response => {
            console.log('Response:', response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
    }

    getUloha(id) {
        return axios.get(BASE_ULOHA_URL + '/' + id)
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error('Error:', error);
                throw error;
            });

    }

    updateUloha(id, updateUlohaRequest) {
        axios.put(BASE_ULOHA_URL + '/' + id, updateUlohaRequest, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                console.log('Response:', response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }

    deleteUloha(id) {
        axios.delete(BASE_ULOHA_URL + '/' + id)
            .then(response => {
                console.log('Response:', response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }





}
export default UlohaServices;
