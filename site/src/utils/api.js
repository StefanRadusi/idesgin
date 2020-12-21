/**
 * Utils: Back-end
 */

import config from "../config";

/**
 * Register a new user
 */
export const userRegister = async (email, password) => {
  return await requestApi("/users/register", "POST", { email, password });
};

/**
 * Login a new user
 */
export const userLogin = async (email, password) => {
  return await requestApi("/users/login", "POST", { email, password });
};

/**
 * userGet
 */
export const userGet = async (token) => {
  return await requestApi("/user", "POST", null, {
    Authorization: `Bearer ${token}`,
  });
};

export const uploadImg = (img) => {
  return requestApi("/upload", "POST", img, {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });
};

export const updateProject = (payload) => {
  return requestApi("/project/update", "POST", payload, {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });
};

export const updateStaff = (payload) => {
  return requestApi("/staff/update", "POST", payload, {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });
};

export const getProjectsById = (id) => {
  return requestApi(`/project/${id}`);
};

export const getProjectsByType = (type) => {
  return requestApi(`/projects/${type}`);
};

export const addImageToProject = (payload) => {
  return requestApi(`/project/add-img`, "POST", payload, {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });
};

export const removeImageFromProject = (payload) => {
  return requestApi(`/project/remove-img`, "POST", payload, {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });
};

export const getStaffMembers = () => {
  return requestApi(`/staff`);
};

export const deleteProject = (id) => {
  return requestApi(`/project/${id}`, "DELETE", null, {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });
};

export const getLatestProjects = () => {
  return requestApi(`/projects/latest`);
};

export const deleteStaffMember = (id) => {
  return requestApi(`/staff/${id}`, "DELETE", null, {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });
};

/**
 * API request to call the backend
 */
export const requestApi = async (
  path = "",
  method = "GET",
  data = null,
  headers = {}
) => {
  // Check if API URL has been set
  if (!config?.domains?.api) {
    throw new Error(
      `Error: Missing API Domain – Please add the API domain from your serverless Express.js back-end to this front-end application.  You can do this in the "site" folder, in the "./config.js" file.  Instructions are listed there and in the documentation.`
    );
  }

  // Prepare URL
  if (!path.startsWith("/")) {
    path = `/${path}`;
  }
  const url = `${config.domains.api}${path}`;

  // Set headers
  headers = Object.assign({ "Content-Type": "application/json" }, headers);

  // console.log("upload");
  // Default options are marked with *
  const response = await fetch(url, {
    method: method.toUpperCase(),
    mode: "cors",
    cache: "no-cache",
    headers,
    body: data ? JSON.stringify(data) : null,
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location = "/admin";
  }

  if (response.status < 200 || response.status >= 300) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return await response.json();
};
