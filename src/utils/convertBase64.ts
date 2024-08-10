export const convertBase64 = async (file: File) => {
  const base64string = await new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  }).then((res) => {
    return res as string;
  });

  return base64string;
};
