const imgBBApi = "https://api.imgbb.com/1/upload";

const handleImgUpload = async (file: any) => {
  if (!file) {
    return {
      error: "No file uploaded",
    };
  }
  const coverImg: any = file?.buffer.toString("base64");

  const formData = new FormData();
  formData.append("image", coverImg);
  const response = await fetch(`${imgBBApi}?key=${process.env.IMGBB_KEY}`, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();

  return data;
};

export { handleImgUpload };
