const baseURL = "https://professor-allocation-recodev.herokuapp.com/";

async function getData(route) {	
	const response = await fetch(baseURL + route);
	return await response.json();
}

async function create(route, data) {
  const response = await fetch(baseURL + route, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    alert("Não foi possível realizar o cadastro.");
    return false;
  }

  return await response.json();
}

async function update(route, data) {
  const response = await fetch(baseURL + route, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    alert("Não foi possível atualizar o cadastro.");
    return false;
  }

  return true;
}

async function deleteData(route) {
  const response = await fetch(baseURL + route, {
    method: "DELETE",
  });

  if (!response.ok) {
    alert("Não foi possível deletar o cadastro.");
    return false;
  }

  return true;
}
