import axios from 'axios';
import {useKeycloak} from "@react-keycloak/web";
import {useEffect, useState} from "react";

const BASE_ZAMESTNANEC_URL = 'http://localhost:8080/zamestnanec'; ///zamestnanec/getId

class ZamestnanecServices {
    saveZamestnanec(postData, file) {
        if (file !== null) {
            const formData = new FormData();
            formData.append('file', file);

            return axios.post("http://localhost:8080/file/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(fileUploadResponse => {
                    postData.fotkaZamestnanca = fileUploadResponse.data;

                    return axios.post(BASE_ZAMESTNANEC_URL + '/save', postData, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                })
                .then(zamestnanecSaveResponse => {
                    console.log('Zamestnanec save response:', zamestnanecSaveResponse.data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            return axios.post(BASE_ZAMESTNANEC_URL + '/save', postData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(zamestnanecSaveResponse => {
                    console.log('Zamestnanec save response:', zamestnanecSaveResponse.data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }


    findAllZamestnanci(accessToken) {
        // console.log(accessToken);
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        };
        return axios.post(BASE_ZAMESTNANEC_URL + '/find-all', null, { headers })
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error('Error:', error);
                throw error;
            });
    }

    getZamestnanec(id) {
        return axios.get(BASE_ZAMESTNANEC_URL + '/' + id)
            .then(response => {
                console.log('Response:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error('Error:', error);
                throw error;
            });
    }

    updateZamestnanec(id, updateZamestnanecRequest) {
        axios.put(BASE_ZAMESTNANEC_URL + '/' + id, updateZamestnanecRequest, {
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

    deleteZamestnanec(id) {
        axios.delete(BASE_ZAMESTNANEC_URL + '/' + id)
            .then(response => {
                console.log('Response:', response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }

    getUlohyZamestnanca(id) {
        return axios.get(BASE_ZAMESTNANEC_URL + '/' + id + "/getUlohy")
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

export default ZamestnanecServices;