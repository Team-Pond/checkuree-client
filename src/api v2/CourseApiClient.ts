import ApiClient from "./ApiClient";

export const getSubjects = async () => {
  const response = await ApiClient.request({
    method: "GET",
    url: "/subject",
  });

  console.log(response.data);
};
