// Get image from Pixabays API
const getPixabay = async (weatherbitData) => {
  console.log("forecast in pixabay", weatherbitData.cityName);
  const baseURL = "https://pixabay.com/api/";
  const api_key = "?key=20274748-d371ce4094535153c9c4b39c7";
  const city = `&q=${weatherbitData.cityName}`;
  const type = "&image_type=photo";
  const url = baseURL + api_key + city + type;

  const request = await fetch(url);

  try {
    const data = await request.json();
    const image = document.getElementById("pixabay-image");
    image.setAttribute("src", data.hits[0].previewURL);
    console.log(data);
  } catch (error) {
    console.log("getPixabay ERROR", error);
    image.src =
      "https://cdn.pixabay.com/photo/2015/07/11/23/02/plane-841441_960_720.jpg";
  }
};

export { getPixabay };
