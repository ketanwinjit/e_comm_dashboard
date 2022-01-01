import * as APIS from "../config/Development/API";
import axios from "axios";
import { getUserDetails } from "../AuthRoutes";

const API = APIS.DEV_API;
const VERSION = APIS.DEV_VERSION;

/**
 *
 * @param {Name of category} categoryName
 * @param {Category Image Data} categoryImage
 * @returns Response in success/failer of category added to DB.
 */
export const addCategory = async (
  categoryId,
  categoryName,
  categoryImage,
  addOrUpdate
) => {
  console.log("Check ID", categoryId, categoryName, categoryImage, addOrUpdate);
  const userDetails = await getUserDetails();
  var AddCategoryUrl = `${API}${VERSION}/category/createCategory`;
  var EditCategoryUrl = `${API}${VERSION}/category/edit/${categoryId}`;

  var formData = new FormData();
  formData.append("categoryName", categoryName);
  formData.append("userId", userDetails.userId);
  formData.append("categoryImage", categoryImage);
  try {
    return await axios
      .post(
        addOrUpdate === "ADD" ? AddCategoryUrl : EditCategoryUrl,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userDetails.token}`,
          },
        }
      )
      .then((res) => {
        console.log("CHECK RES", res);
        if (res.status === 200) {
          return res.data;
        }
      })
      .catch((error) => {
        console.log("ERRRR", error.response);
        let { status, data } = error.response;
        if (status === 400) {
          return data;
        }
        if (status === 401) {
          return data;
        }
        let response = {
          success: false,
          message: "Bad Request",
        };
        return response;
      });
  } catch (error) {
    return error;
  }
};

export const getAllCategories = async () => {
  try {
    return await axios
      .get(`${API}${VERSION}/category/getAllCategories`)
      .then((res) => {
        console.log("Categories Res", res);
        if (res.status === 200) {
          return res.data;
        }
      })
      .catch((error) => {
        console.log("BAD ERROR", error);
        let { status, data } = error.response;
        if (status === 400) {
          return data;
        }
        if (status === 401) {
          return data;
        }
        if (status === 404) {
          let response = {
            success: false,
            message: "Bad Request",
          };
          return response;
        }
      });
  } catch (error) {
    return error;
  }
};

export const deleteCategory = async (categoryInfo) => {
  const userDetails = await getUserDetails();
  let info = {
    ...categoryInfo,
    userId: userDetails.userId,
  };
  console.log("DATA", info);

  try {
    return await axios
      .post(`${API}${VERSION}/category/deleteCategory`, info, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userDetails.token}`,
        },
      })
      .then((res) => {
        console.log("Delete API Response", res);
        if (res.status === 200) {
          return res.data;
        }
      })
      .catch((error) => {
        console.log("Delete API Error", error);
        let { status, data } = error.response;
        if (status === 400) {
          return data;
        }
        if (status === 401) {
          return data;
        }
        if (status === 404) {
          let response = {
            success: false,
            message: "Bad Request",
          };
          return response;
        }
      });
  } catch (error) {
    return error;
  }
};
