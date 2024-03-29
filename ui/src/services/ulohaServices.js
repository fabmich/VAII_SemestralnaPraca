import axios from 'axios';

const BASE_ULOHA_URL = 'http://localhost:8080/uloha';
const BASE_PROJEKT_URL = 'http://localhost:8080/projekt';


class UlohaServices {

    fetchProjekty() {
        return axios.post(BASE_PROJEKT_URL + '/find-all', null)
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error('Error:', error);
                throw error;
            });
    }

    saveUloha(postData, accessToken) {

        axios.post(BASE_ULOHA_URL + '/save', postData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
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


    findAllUlohy(accessToken, request) {

        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        };
        return axios.post(BASE_ULOHA_URL + '/find-all', request, {headers})
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

    updateUloha(id, updateUlohaRequest, accessToken) {
        axios.put(BASE_ULOHA_URL + '/' + id, updateUlohaRequest, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
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

    deleteUloha(id, accessToken) {
        axios.delete(BASE_ULOHA_URL + '/' + id, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
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
}

export default UlohaServices;
