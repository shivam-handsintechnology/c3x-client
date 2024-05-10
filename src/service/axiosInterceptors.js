import axios from "axios";

const targetUrl = "https://online.c3xpress.com/C3XService.svc/";
// const APi_Url = "http://localhost:8997/api/";
const APi_Url = "https://c3expressapi.handsintechnology.in/api/";
const axiosInstance = axios.create({
  baseURL: APi_Url,
  withCredentials: true,
  // headers: {
  //   "Access-Control-Allow-Origin": "*",
  //   "cache-control": "no-cache",
  // },

});
// Add a request interceptorro
axiosInstance.interceptors.request.use(

  (config) => {
    // Get the token from your desired source (localStorage, etc.)
    const token = localStorage.getItem("token"); // Replace with your actual token
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {

    return Promise.reject(error);
  }
);

const getApi = async (url) => {
  return new Promise((resolve, reject) => {
    axiosInstance.get(url).then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error);
    });
  }
  );
};

const getApiById = (url, id) => {
  return new Promise((resolve, reject) => {
    axiosInstance.get(`${url}/${id}`).then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error);
    });
  }
  );
};

const postApi = (url, data) => {
  return new Promise((resolve, reject) => {
    axiosInstance.post(url, data).then((response) => {
      // //console.log({ response })
      resolve(response);
    }).catch((error) => {
      // //console.log({ error })
      reject(error);
    });
  }
  );
}

const putApi = (url, id, data) => {
  return new Promise((resolve, reject) => {
    axiosInstance.put(`${url}/${id}`, data).then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error);
    });
  }
  );
};

const deleteApi = (url, id) => {
  return new Promise((resolve, reject) => {
    axiosInstance.delete(`${url}/${id}`).then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error);
    });
  }
  );
};

export { getApi, getApiById, postApi, putApi, deleteApi, APi_Url };