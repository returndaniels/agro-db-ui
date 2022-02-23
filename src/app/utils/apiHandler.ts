const baseHeaders = {
  'Content-type': 'application/json; charset=UTF-8',
  Accept: 'application/json',
};

async function read(url : string) : Promise<any> {
  const response = await fetch(url, {
    headers: baseHeaders,
    method: 'GET',
  });
  const data = await response.json();
  
  if (!response.ok) {
    throw data;
  }

  return data;
}

async function create(url : string, body : any) {
  const response = await fetch(url, {
    headers: baseHeaders,
    method: 'POST',
    body: JSON.stringify(body),
  });

  let data;
  try {
    data = await response.json();
  } catch (e) {
    data = null;
  }

  if (!response.ok) {
    throw data;
  } else {
    return data;
  }
}

async function update(url : string, body : any) {
  const response = await fetch(url, {
    headers: baseHeaders,
    method: 'PATCH',
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) {
    throw data;
  }

  return data;
}

async function remove(url : string, body : any) {
  const response = await fetch(url, {
    headers: baseHeaders,
    method: 'DELETE',
    body: JSON.stringify(body),
  });

  const data = response.status !== 204 ? await response.json() : null;

  if (!response.ok) {
    throw data;
  }

  return data;
}

export { read, create, update, remove };
