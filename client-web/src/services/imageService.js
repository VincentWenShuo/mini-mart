import http from "../http-common";

class ImageDataService {
    upload(data, config) {
        return http.post(`/image`, data, config);
    }

}

export default new ImageDataService();