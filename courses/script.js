const route = "/courses/"

let actualId = undefined;

const table = document.getElementById("tableBody");

async function createLine(cour) {
	let linha = document.createElement("tr");

	let colunaNome = document.createElement("td");
	colunaNome.textContent = cour.name;
	linha.appendChild(colunaNome);

	let colunaEdit = document.createElement("td");
	let iconEdit = document.createElement("i");
	iconEdit.classList.add("far");
	iconEdit.classList.add("fa-edit");

	iconEdit.addEventListener("click", () => iconUpdate_click(cour));

	colunaEdit.appendChild(iconEdit);
	linha.appendChild(colunaEdit);

	let colunaDelete = document.createElement("td");
	let iconDelete = document.createElement("i");
	iconDelete.classList.add("far");
	iconDelete.classList.add("fa-trash-alt");

	iconDelete.addEventListener("click", () => iconDelete_click(cour));

	colunaDelete.appendChild(iconDelete);
	linha.appendChild(colunaDelete);

	const table = document.getElementById("tableBody");
	table.insertBefore(linha, table.firstChild);
}

async function refreshTable() {
	table.innerHTML = '';

	loadTable();
}

async function loadTable() {
	let txtSearch = document.getElementById("txtSearch").value;
	let filter = route;

	if (txtSearch) {
		filter = route + "?partName=" + txtSearch;
	}

	let data = await getData(filter);

	if (!data.length) {
		document.getElementById("showNotData").hidden = false;
		document.getElementById("table").hidden = true;
	} else {
		document.getElementById("showNotData").hidden = true;
		document.getElementById("table").hidden = false;
	}

	for (let item of data) {
		createLine(item);
	}
}

function clearSearch() {
	document.getElementById("txtSearch").value = "";
	refreshTable();
}

function btnAdd_click() {
	document.getElementById("txtName").value = "";
	const title = document.getElementById("modalCreateTitle");
	title.textContent = "Adicionar Curso";
	actualId = undefined;

	document.getElementById("btnModalCreate").disabled = true;
	document.getElementById("txtName").addEventListener("input", function (event) {
		var conteudo = document.getElementById("txtName").value;
		if (conteudo !== null && conteudo !== '') {
			document.getElementById("btnModalCreate").disabled = false;
		} else {
			document.getElementById("btnModalCreate").disabled = true;
		}
	});
}
function iconUpdate_click(cour) {
	const title = document.getElementById("modalCreateTitle");
	title.textContent = "Editar Curso";

	document.getElementById("txtName").value = cour.name;
	actualId = cour.id;

	document.getElementById("btnModalCreate").disabled = true;
	document.getElementById("txtName").addEventListener("input", function (event) {
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

function iconDelete_click(cour) {
	actualId = cour.id;

	const txtCourse = document.getElementById('txtDeleteCourse');
	txtCourse.textContent = cour.name;
	document.getElementById('msgConfirmDelete').hidden = false;
	document.getElementById('msgConfirmDeleteAll').hidden = true;

	var myModal = new bootstrap.Modal(document.getElementById('modalDelete'))
	myModal.show();

}

async function applyAddProfessor() {
	const name = document.getElementById("txtName").value;

	let result;

	if (!actualId) {
		result = await create(route, { name });
	} else {
		result = await update(route + actualId, { name });
	}
	if (result) {
		refreshTable();
	}
}
async function applyDeleteProfessor() {
	let result

	if (!actualId) {
		result = await deleteData(route);
	} else {
		result = await deleteData(route + actualId);
	}

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

const btnDeleteAll = document.getElementById("btnDeleteAllCourses");
btnDeleteAll.addEventListener("click", () => btnDeleteAll_click());

function btnDeleteAll_click() {
	actualId = undefined;
	let txtDepartment = document.getElementById('txtDeleteCourse');
	txtDepartment.textContent = "";

	const title = document.getElementById("modalDeleteTitle");
	title.textContent = "Deletar Todos Cursos";
	document.getElementById('msgConfirmDelete').hidden = true;
	document.getElementById('msgConfirmDeleteAll').hidden = false;

	var myModal = new bootstrap.Modal(document.getElementById('modalDelete'))
	myModal.show();
}

loadTable();

function sortTable(table, dir, n) {
	var rows, switching, i, x, y, shouldSwitch, switchcount = 0;
	switching = true;

	while (switching) {

		switching = false;
		rows = table.rows;
		for (i = 1; i < (rows.length - 1); i++) {
			shouldSwitch = false;
			x = rows[i].getElementsByTagName("TD")[n];
			y = rows[i + 1].getElementsByTagName("TD")[n];
			if (dir == "asc") {
				if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
					shouldSwitch = true;
					break;
				}
			} else if (dir == "desc") {
				if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
					shouldSwitch = true;
					break;
				}
			}
		}
		if (shouldSwitch) {
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
			switchcount++;
		} else {
			if (switchcount == 0 && dir == "asc") {
				dir = "desc";
				switching = true;
			}
		}
	}
}

function sair() {
	var saida = confirm("Tem certeza que deseja sair?");
	if (saida == true) {
		window.location.replace("https://elegant-knuth-94245c.netlify.app/");
	} else {
	}
}
