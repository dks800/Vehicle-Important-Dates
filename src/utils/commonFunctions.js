export const getBase64 = (file, updateVehicleImage, e) => {
  if (!file) return "";
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    return updateVehicleImage(e, reader.result);
  };
  reader.onerror = () => {
    return "";
  };
};
