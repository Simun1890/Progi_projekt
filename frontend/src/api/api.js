import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  //baseURL: "http://localhost:3001",
  baseURL: "https://jsonserver-qbfm.onrender.com/",
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;

/*
const [waitingSickLeaves, setWaitingSickLeaves] = useState([]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const data = await fetchData("/getWaitingSickLeaves");
        setWaitingSickLeaves(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
*/
