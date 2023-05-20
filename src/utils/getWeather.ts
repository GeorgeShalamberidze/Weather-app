import axios, { AxiosError, AxiosResponse } from "axios";
import Weather from "../interface/Weather";

const getWeather = async (
  setWeatherData: React.Dispatch<React.SetStateAction<Weather | null>>,
  setIcon: React.Dispatch<React.SetStateAction<string | undefined>>,
  setLocationNotFound: React.Dispatch<React.SetStateAction<boolean>>,
  url: string
) => {
  await axios
    .get<Weather>(url)
    .then((res: AxiosResponse<Weather>) => {
      const iconID: string = res.data?.weather[0].icon;
      setWeatherData(res.data);
      setIcon(`https://openweathermap.org/img/wn/${iconID}@2x.png`);
    })
    .catch((error: AxiosError) => {
      if (error.response && error.response.status === 404) {
        setLocationNotFound(true);
      }
    });
};

export default getWeather;
