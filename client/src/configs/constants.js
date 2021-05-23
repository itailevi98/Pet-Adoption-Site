const dev = {
    API_URL: `http://0.0.0.0:5050`
};
const prod = {
    API_URL: `https://rocky-crag-62498.herokuapp.com`
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
