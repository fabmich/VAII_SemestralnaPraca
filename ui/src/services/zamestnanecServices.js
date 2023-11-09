import axios from 'axios';

const BASE_ZAMESTNANEC_URL = 'http://localhost:8080/zamestnanec'; ///zamestnanec/getId

class ZamestnanecServices {

    saveZamestnanec(postData) {

        // const postData = {
        //     meno:"Feri",
        //     priezvisko:"Mrkva 222",
        //     vek:"1",
        //     kontraktDo:"1980-04-09T10:15:30+07:00",
        //     typZamestnanca:"TPP",
        //     pozicia:"PROGRAMATOR"
        //
        // };

        axios.post(BASE_ZAMESTNANEC_URL + '/save', postData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                console.log('Response:', response.data);
                // Handle the response data here
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle the error here
            });
    }
}
export default ZamestnanecServices;