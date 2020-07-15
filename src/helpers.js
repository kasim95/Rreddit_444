const { axios } = require("axios");

export const parseJson = responseJson => {
    if (response_json) {
        console.log(responseJson);
        // const children = response_json.data.children;
        // console.log(children);
    }
}

export const fetchPosts = (url, params) => {
    return axios.get(url+params)
        .then(response => {
            if (response) {
                return response.json()
            }
            else {
                throw new Error("Check url for fetch on Reddit API");
            }
        })
        .then(responseJson => parseJson(responseJson))
};