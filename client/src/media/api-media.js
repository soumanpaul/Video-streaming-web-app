exports.create = (params, credentials, media) => {
  return fetch("/api/v1/media/new/" + params.userId, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + credentials.t
    },
    body: media
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

exports.listPopular = params => {
  return fetch("/api/v1/media/popular", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

exports.listByUser = params => {
  return fetch("/api/v1/media/by/" + params.userId, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

exports.read = params => {
  return fetch("/api/v1/media/" + params.mediaId, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

exports.update = (params, credentials, media) => {
  return fetch("/api/v1/media/" + params.mediaId, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentials.t
    },
    body: JSON.stringify(media)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

exports.remove = (params, credentials) => {
  return fetch("/api/v1/media/" + params.mediaId, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentials.t
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

exports.listRelated = (params) => {
  return fetch('/api/v1/media/related/'+ params.mediaId, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(response => {
    return response.json()
  }).catch((err) => console.log(err))
}
