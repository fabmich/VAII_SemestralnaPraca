import axios from 'axios';
const BASE_FILE_URL = 'http://localhost:8080/file';


class FileServices {

    getFile(id) {

            return axios.get(BASE_FILE_URL + "/base64/" + id)
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
export default FileServices;