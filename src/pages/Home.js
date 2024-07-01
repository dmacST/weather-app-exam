import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from "react-icons/io";
import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";
import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";

const APIkey = "0c5593bd06ce5e0ad1e79fd1e3997e9e";

const Home = ({ tempScale, darkMode, language }) => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Tbilisi");
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    if (inputValue !== "") {
      setLocation(inputValue);
    }

    const input = document.querySelector("input");

    if (inputValue === "") {
      setAnimate(true);

      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }

    input.value = "";

    e.preventDefault();
  };

  useEffect(() => {
    setLoading(true);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;

    axios
      .get(url)
      .then((res) => {
        setTimeout(() => {
          setData(res.data);
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        setLoading(false);
        setErrorMsg(err);
      });
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg("");
    }, 1000);
    return () => clearTimeout(timer);
  }, [errorMsg]);

  if (!data) {
    return (
      <div
        className={`w-full h-screen ${
          darkMode
            ? "bg-gray-900"
            : "bg-gradient-to-br from-gradientBg-light to-gradientBg-dark"
        } flex flex-col justify-center items-center`}
      >
        <ImSpinner8 className="text-5xl animate-spin text-white" />
      </div>
    );
  }

  let icon;

  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;
    case "Rain":
      icon = <IoMdRainy className="text-[#31cafb]" />;
      break;
    case "Clear":
      icon = <IoMdSunny className="text-[#ffde33]" />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill className="text-[#31cafb]" />;
      break;
    case "Snow":
      icon = <IoMdSnow className="text-[#31cafb]" />;
      break;
    case "Thunder":
      icon = <IoMdThunderstorm />;
      break;
    default:
      icon = null;
  }

  const date = new Date();

  const displayTemperature = (temperature) => {
    if (tempScale === "Celsius") {
      return (
        <>
          {parseInt(temperature)}
          <div className="text-4xl">
            <TbTemperatureCelsius />
          </div>
        </>
      );
    } else if (tempScale === "Fahrenheit") {
      return (
        <>
          {parseInt((temperature * 9) / 5 + 32)}
          <div className="text-4xl"> °F </div>
        </>
      );
    }
    return `${parseInt(temperature)} `;
  };

  const getTextForLanguage = () => {
    switch (language) {
      case "en":
        return {
          searchPlaceholder: "Search",
          errorMessage: "An error occurred: ",
          feelsLike: "Feels Like",
          visibility: "Visibility",
          humidity: "Humidity",
          wind: "Wind",
        };
      case "ge":
        return {
          searchPlaceholder: "ძებნა",
          errorMessage: "შეცდომა",
          feelsLike: "ტემპერატურის მგრძნობელობა",
          visibility: "ხილვადობა",
          humidity: "ტენიანობა",
          wind: "ქარი",
        };
      default:
        return {
          searchPlaceholder: "Search",
          errorMessage: "An error occurred: ",
          feelsLike: "Feels Like",
          visibility: "Visibility",
          humidity: "Humidity",
          wind: "Wind",
        };
    }
  };

  const text = getTextForLanguage();

  return (
    <div
      className={`w-full h-screen ${
        darkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-gradientBg-light to-gradientBg-dark"
      } bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0`}
    >
      {errorMsg && (
        <div className="w-full max-w-[90vw] lg:max-w-[450px] bg-[#ff208c] text-white absolute top-2 lg:top-10 p-4 capitalize rounded-md">{`${text.errorMessage}${errorMsg.response.data.message}`}</div>
      )}

      <form
        className={`${
          animate ? "animate-shake" : "animate-none"
        } h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8`}
      >
        <div className="h-full relative flex items-center justify-between p-2">
          <input
            onChange={(e) => handleInput(e)}
            className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full"
            type="text"
            placeholder={text.searchPlaceholder}
          />
          <button
            onClick={(e) => handleSubmit(e)}
            className="bg-[#1ab8ed] hover:bg-[#15abdd] w-20 h-12 rounded-full flex justify-center items-center transition"
          >
            <IoMdSearch className="text-2xl text-white " />
          </button>
        </div>
      </form>
      <div className="w-full max-w-[450px] bg-black/20 min-h-[500px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <ImSpinner8 className="text-[#19B8ED] text-5xl animate-spin" />
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-x-5">
              <div className="text-[87px]">{icon}</div>
              <div>
                <div className="text-2xl font-semibold">
                  {data.name}, {data.sys.country}
                </div>
                <div>
                  {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                  {date.getUTCFullYear()}
                </div>
              </div>
            </div>

            <div className="my-10 ">
              <div className="flex justify-center items-center">
                <div className="text-[144px] leading-none font-light">
                  {displayTemperature(data.main.temp)}
                </div>
              </div>
              <div className="capitalize text-center">
                {data.weather[0].description}
              </div>
            </div>

            <div className="max-w-[378px] mx-auto flex flex-col gap-y-6">
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  <div className="text-[20px]">
                    <BsEye />
                  </div>
                  <div>
                    {text.visibility}{" "}
                    <span className="ml-2">{data.visibility / 1000} km</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <div className="text-[20px]">
                    <BsThermometer />
                  </div>
                  <div className="flex">
                    {text.feelsLike}
                    <span className="flex ml-2">
                      {displayTemperature(data.main.temp)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  <div className="text-[20px]">
                    <BsWater />
                  </div>
                  <div>
                    {text.humidity}{" "}
                    <span className="ml-2">{data.main.humidity} %</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <div className="text-[20px]">
                    <BsWind />
                  </div>
                  <div>
                    {text.wind}{" "}
                    <span className="ml-2">
                      {Math.round(data.wind.speed * (18 * 0.2))} km/h
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
