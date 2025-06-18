const handleClarifai = async (req, res) => {
  const { imageUrl } = req.body;

  const PAT = "8ee14f50b4304003bc385101f0e9eb46";
  const USER_ID = "clarifai";
  const APP_ID = "main";

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: imageUrl,
          },
        },
      },
    ],
  });

  try {
    const response = await fetch(
      "https://api.clarifai.com/v2/models/face-detection/outputs",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Key ${PAT}`,
        },
        body: raw,
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Clarifai API Error:", error);
    res.status(500).json({ error: "Unable to fetch from Clarifai API" });
  }
};

module.exports = {
  handleClarifai,
};
