import axios from 'axios';

const BASE_PROJEKT_URL = 'http://localhost:8080/projekt';

class ProjektServices {

    saveProjekt(postData, accessToken) {
        axios.post(BASE_PROJEKT_URL + '/save', postData, {
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

    findAllProjekty() {
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

    getProjekt(id) {
        return axios.get(BASE_PROJEKT_URL + '/' + id)
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error('Error:', error);
                throw error;
            });

    }

    updateProjekt(id, request, accessToken) {
        axios.put(BASE_PROJEKT_URL + '/' + id, request, {
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

    deleteProjekt(id, accessToken) {
        axios.delete(BASE_PROJEKT_URL + '/' + id, {
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

export default ProjektServices;