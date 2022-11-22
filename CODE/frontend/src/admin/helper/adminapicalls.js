import { API } from "../../backend";
import { isAuthenticated } from "../../auth/helper/user";

export const getAllBookings = () => {
  const {
    user: { _id, token },
  } = isAuthenticated();
  return fetch(`${API}/admin/bookings/${_id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err, "in err"));
};

export const getAllCancellations = () => {
  const {
    user: { _id, token },
  } = isAuthenticated();
  return fetch(`${API}/admin/cancellations/${_id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err, "in err"));
};

export const createfcType = (userId, token, fcname) => {
  const dum = { name: fcname.name };
  console.log(userId, token, fcname);
  return fetch(`${API}/fctype/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dum),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllfctypes = () => {
  return fetch(`${API}/fctype/all`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deletefcType = (fctypeId, userId, token) => {
  console.log(fctypeId, userId, token);
  return fetch(`${API}/fctype/delete/${fctypeId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err, "UNABLE TO DELETE FcType");
    });
};

export const createFacility = (userId, token, fac) => {
  const dum = {
    name: fac.name,
    description: fac.description,
    location: fac.location,
  };
  console.log(userId, token, dum);
  return fetch(`${API}/facility/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dum),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllfacilities = () => {
  return fetch(`${API}/facility/all`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteFacility = (facilityId, userId, token) => {
  console.log(facilityId, userId, token);
  return fetch(`${API}/facility/delete/${userId}/${facilityId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err, "UNABLE TO DELETE FcType");
    });
};

export const appendFacility = (facilityId, userId, token, flist) => {
  const dum = {
    list: [{ name: flist.fcname, count: Number(flist.count) }],
  };
  console.log(facilityId, userId, token, flist);
  console.log(JSON.stringify(dum));
  return fetch(`${API}/facility/appendfc/${userId}/${facilityId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dum),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
