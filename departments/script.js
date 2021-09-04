const route = "/departments/"

let actualId = undefined;

const table = document.getElementById("tableBody");

async function createLine(dep) {
	let linha = document.createElement("tr");

	let colunaNome = document.createElement("td");
	colunaNome.textContent = dep.name;
	linha.appendChild(colunaNome);

	let colunaEdit = document.createElement("td");
	let iconEdit = document.createElement("i");
	iconEdit.classList.add("far");
	iconEdit.classList.add("fa-edit");

	iconEdit.addEventListener("click", () => iconUpdate_click(dep));

	colunaEdit.appendChild(iconEdit);
	linha.appendChild(colunaEdit);

	let colunaDelete = document.createElement("td");
	let iconDelete = document.createElement("i");
	iconDelete.classList.add("far");
	iconDelete.classList.add("fa-trash-alt");

	iconDelete.addEventListener("click", () => iconDelete_click(dep));

	colunaDelete.appendChild(iconDelete);
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
	title.textContent = "Adicionar Departamento";
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

function iconUpdate_click(dep) {
	const title = document.getElementById("modalCreateTitle");
	title.textContent = "Editar Departamento";

	document.getElementById("txtName").value = dep.name;
	actualId = dep.id;
	
	document.getElementById("btnModalCreate").disabled = true;
	document.getElementById("txtName").addEventListener("input", function(event){
	var conteudo = document.getElementById("txtName").value;
	if (conteudo !== null && conteudo !== '') {      
		document.getElementById("btnModalCreate").disabled = false;
		} else {
		document.getElementById("btnModalCreate").disabled = true;
		}
	});

	var myModal = new bootstrap.Modal(document.getElementById('modalCreate'))
	myModal.show();
}

function iconDelete_click(dep) {
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

const btnDeleteAll = document.getElementById("btnDeleteAllDepartments");
btnDeleteAll.addEventListener("click", () => btnDeleteAll_click());

function btnDeleteAll_click() {
	const title = document.getElementById("modalDeleteTitle");
	title.textContent = "Deletar Todos Departamentos";

	var myModal = new bootstrap.Modal(document.getElementById('modalDelete'))
	myModal.show();
}

loadTable();




















