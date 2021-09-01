const route = "/departments/"

let actualId = undefined;

const table = document.getElementById("tableBody");

async function createLine(dep) {
	let linha = document.createElement("tr");

	let colunaNome = document.createElement("td");
	colunaNome.textContent = dep.name;
	linha.appendChild(colunaNome);

	let colunaEdit = document.createElement("td");
	let btnEdit = document.createElement("button");
	btnEdit.textContent = "Editar";
	btnEdit.classList.add("btn");
	btnEdit.classList.add("btn-info");

	btnEdit.addEventListener("click", () => btnUpdate_click(dep));

	colunaEdit.appendChild(btnEdit);
	linha.appendChild(colunaEdit);

	let colunaDelete = document.createElement("td");
	let btnDelete = document.createElement("button");
	btnDelete.textContent = "Deletar";
	btnDelete.classList.add("btn");
	btnDelete.classList.add("btn-danger");

	btnDelete.addEventListener("click", () => btnDelete_click(dep));

	colunaDelete.appendChild(btnDelete);
	linha.appendChild(colunaDelete);
	
	const table = document.getElementById("tableBody");
	
	table.appendChild(linha);
}

async function refreshTable() {
	table.innerHTML = '';

	loadTable();
}

async function loadTable(){
	let data = await getData(route);
	
	for (let item of data){
		createLine(item);
	}
}

function btnAdd_click() {
	document.getElementById("txtName").value = "";	
	const title = document.getElementById("modalCreateTitle");
	title.textContent = "Criar Departamento";
	actualId = undefined;
	
	document.getElementById("btnModalCreate").disabled = true;
	document.getElementById("txtName").addEventListener("input", function(event){
	var conteudo = document.getElementById("txtName").value;
	if (conteudo !== null && conteudo !== '') {      
		document.getElementById("btnModalCreate").disabled = false;
		} else {
		document.getElementById("btnModalCreate").disabled = true;
		}
	});
}

function btnUpdate_click(dep) {
	const title = document.getElementById("modalCreateTitle");
	title.textContent = "Atualizar Departamento";

	document.getElementById("txtName").value = dep.name;
	actualId = dep.id;

	var myModal = new bootstrap.Modal(document.getElementById('modalCreate'))
	myModal.show();
}

function btnDelete_click(dep) {
	actualId = dep.id;	

	const txtDepartment = document.getElementById('txtDeleteDepartment');
	txtDepartment.textContent = dep.name;

	var myModal = new bootstrap.Modal(document.getElementById('modalDelete'))
	myModal.show();
}
async function applyAddProfessor() {	
	const name = document.getElementById("txtName").value;

	let result;

	if (!name){
		alert("The department name is required!");
		return;	
	}

	if (!actualId) {
		result = await create(route, { name });
	} else {
		result = await update(route + actualId, { name });
	}
	if(result) {
		refreshTable();
	}
}

async function applyDeleteProfessor(){
	const result = await deleteData(route + actualId);

	if (result) {
		refreshTable();
	}
}

const btnAdd = document.getElementById("btnAdd");
btnAdd.addEventListener("click", btnAdd_click);

const confirmSave = document.getElementById("btnModalCreate");
confirmSave.addEventListener("click", applyAddProfessor);

const confirmDelete = document.getElementById("btnModalDelete");
confirmDelete.addEventListener("click", applyDeleteProfessor);

loadTable();




















