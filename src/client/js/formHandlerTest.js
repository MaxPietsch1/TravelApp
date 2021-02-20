function handleSubmit(event) {
  event.preventDefault();
  let formText = document.getElementById("url").value;

  // Checking the users url input
  const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url_input: formText }),
    });
    try {
      const newData = await response.json();
      // console.log(newData);
      return newData;
    } catch (error) {
      console.log("postData ERROR", error);
    }
  };

  let valid = Client.validURL(formText);
  console.log(valid);
  if (!valid) {
    document.getElementById("results").innerHTML = "Invalid webaddress";
  } else {
    postData("http://localhost:8080/getSentiment").then(function (data) {
      updateUI(data, results);
    });
  }
}

function updateUI(data) {
  console.log(typeof data);
  document.getElementById(
    "results"
  ).innerHTML = `The Confidence is equal to ${data.confidence} and the Subject is ${data.subject}`;
}

// export { handleSubmit };
// export { updateUI };
