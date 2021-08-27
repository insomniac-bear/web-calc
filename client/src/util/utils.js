import { API_URL } from './const';

export const HttpCode = {
  OK: 200,
  FAILED: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
}

export const showComponent = (isShow, component) => {
  return isShow ? component : ``;
};

export const showAlterComponent = (condition, primaryComponent, alterComponent) => {
  return condition ? primaryComponent : alterComponent;
};

export const onChangeFormValue = (evt, form, handler) => {
  handler({...form, [evt.target.name]: evt.target.value});
};

export const fetchedData = async (url, method, sendData = undefined) => {
  const body = sendData ? JSON.stringify(sendData) : null;

  const response = await fetch(`${API_URL}/${url}`, {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body
  });
  const data = await response.json();

  return {
    status: response.status,
    data
  };
};

export const parseName = (key) => {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
};
