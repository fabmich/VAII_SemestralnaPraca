import axios from 'axios';

const GET_ID_REST_API = 'http://localhost:8080/zamestnanec/getId';

class GetId {
    getId() {
        return axios.get(GET_ID_REST_API);
    }
}

export default new GetId();