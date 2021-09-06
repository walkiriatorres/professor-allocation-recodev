const route = "/allocations/"
let departments = [];
let days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
let hours = ['00:00+0000', '01:00+0000', '02:00+0000', '03:00+0000', '04:00+0000', '05:00+0000'
	, '06:00+0000', '07:00+0000', '08:00+0000', '09:00+0000', '10:00+0000', '11:00+0000'
	, '12:00+0000', '13:00+0000', '14:00+0000', '15:00+0000', '16:00+0000', '17:00+0000'
	, '18:00+0000', '19:00+0000', '20:00+0000', '21:00+0000', '22:00+0000', '23:00+0000', '23:59+0000'];

let actualId = undefined;

const table = document.getElementById("tableBody");

async function createLine(allocation) {
	let linha = document.createElement("tr");

	let colunaProfessor = document.createElement("td");
	colunaProfessor.textContent = allocation.professor.name;
	linha.appendChild(colunaProfessor);

	let colunaDepartment = document.createElement("td");
	colunaDepartment.textContent = allocation.professor.department.name;
	linha.appendChild(colunaDepartment);

	let colunaCourse = document.createElement("td");
	colunaCourse.textContent = allocation.course.name;
	linha.appendChild(colunaCourse);

	let colunaDayOfWeek = document.createElement("td");
	colunaDayOfWeek.textContent = allocation.dayofweek;
	linha.appendChild(colunaDayOfWeek);

	const infoHorario = `${allocation.start.substr(0, 5)} - ${allocation.end.substr(0, 5)}`;
	let colunaHour = document.createElement("td");
	colunaHour.textContent = infoHorario;
	linha.appendChild(colunaHour);

	let colunaEdit = document.createElement("td");
	let iconEdit = document.createElement("i");
	iconEdit.classList.add("far");
	iconEdit.classList.add("fa-edit");

	iconEdit.addEventListener("click", () => iconUpdate_click(allocation));

	colunaEdit.appendChild(iconEdit);
	linha.appendChild(colunaEdit);

	let colunaDelete = document.createElement("td");
	let iconDelete = document.createElement("i");
	iconDelete.classList.add("far");
	iconDelete.classList.add("fa-trash-alt");

	iconDelete.addEventListener("click", () => iconDelete_click(allocation));

	colunaDelete.appendChild(iconDelete);
	linha.appendChild(colunaDelete);

	table.insertBefore(linha, table.firstChild);
	sortTable(table, 'asc', 0);
}

async function refreshTable() {
	table.innerHTML = "";

	loadTable();
}

async function loadTable() {
	let data = await getData(route);

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

function checkInputs(inputs) {

	var filled = true;

	inputs.forEach(function (input) {

		if (input.value === "selected") {
			filled = false;
		}

	});

	return filled;

}

function btnAdd_click() {

	document.getElementById("selectProfessorId").value = "selected";
	document.getElementById("selectCourseId").value = "selected";
	document.getElementById("selectDayOfWeekId").value = "selected";
	document.getElementById("selectStartHourId").value = "selected";
	document.getElementById("selectEndHourId").value = "selected";
	const title = document.getElementById("modalCreateTitle");
	title.textContent = "Adicionar Aula";
	actualId = undefined;

	document.getElementById("btnModalCreate").disabled = true;

	var professor_input = document.getElementById("selectProfessorId");
	var course_input = document.getElementById("selectCourseId");
	var day_input = document.getElementById("selectDayOfWeekId");
	var start_input = document.getElementById("selectStartHourId");
	var end_input = document.getElementById("selectEndHourId");
	var myInputs = [professor_input, course_input, day_input, start_input, end_input];
	var statusCheckCollision = document.getElementById("msgCheckCollision");

	myInputs.forEach(function (input) {

		input.addEventListener("blur", function () {

			if (start_input.value < end_input.value && end_input.value != "selected") {
				document.getElementById("selectStartHourId").style.borderColor = "#e5e9ec";
				document.getElementById("selectEndHourId").style.borderColor = "#e5e9ec";
				statusCheckCollision.innerText = "";
			} else {
				document.getElementById("selectStartHourId").style.borderColor = "#ff0000";
				document.getElementById("selectEndHourId").style.borderColor = "#ff0000";
				statusCheckCollision.innerText = "Horário inválido";
				statusCheckCollision.style.color = "#ff0000";
			}



			if (checkInputs(myInputs) && start_input.value < end_input.value) {
				btnModalCreate.disabled = false;
			} else {
				btnModalCreate.disabled = true;
			}

		});

	});

}

function iconUpdate_click(allocation) {
	const title = document.getElementById("modalCreateTitle");
	title.textContent = "Atualizar Aula";

	document.getElementById("selectProfessorId").value = allocation.professor.id;
	document.getElementById("selectCourseId").value = allocation.course.id;
	document.getElementById("selectDayOfWeekId").value = allocation.dayofweek;
	document.getElementById("selectStartHourId").value = allocation.start;
	document.getElementById("selectEndHourId").value = allocation.end;

	actualId = allocation.id;

	document.getElementById("btnModalCreate").disabled = true;

	var professor_input = document.getElementById("selectProfessorId");
	var course_input = document.getElementById("selectCourseId");
	var day_input = document.getElementById("selectDayOfWeekId");
	var start_input = document.getElementById("selectStartHourId");
	var end_input = document.getElementById("selectEndHourId");
	var myInputs = [professor_input, course_input, day_input, start_input, end_input];
	var statusCheckCollision = document.getElementById("msgCheckCollision");

	myInputs.forEach(function (input) {

		input.addEventListener("blur", function () {

			if (start_input.value < end_input.value && end_input.value != "selected") {
				document.getElementById("selectStartHourId").style.borderColor = "#e5e9ec";
				document.getElementById("selectEndHourId").style.borderColor = "#e5e9ec";
				statusCheckCollision.innerText = "";
			} else {
				document.getElementById("selectStartHourId").style.borderColor = "#ff0000";
				document.getElementById("selectEndHourId").style.borderColor = "#ff0000";
				statusCheckCollision.innerText = "Horário inválido";
				statusCheckCollision.style.color = "#ff0000";
			}



			if (checkInputs(myInputs) && start_input.value < end_input.value) {
				btnModalCreate.disabled = false;
			} else {
				btnModalCreate.disabled = true;
			}

		});

	});


	var myModal = new bootstrap.Modal(document.getElementById('modalCreate'));
	myModal.show();
}

function iconDelete_click(allocation) {
	actualId = allocation.id;

	const txtAllocation = document.getElementById("txtDeleteAllocation");
	txtAllocation.textContent = `${allocation.professor.name} - ${allocation.course.name}: ${allocation.start.substr(0, 5)} - ${allocation.end.substr(0, 5)} `;
	document.getElementById('msgConfirmDelete').hidden = false;
	document.getElementById('msgConfirmDeleteAll').hidden = true;

	var myModalDelete = new bootstrap.Modal(document.getElementById('modalDelete'))
	myModalDelete.show();
}

async function applyAddAllocation() {
	const professorId = document.getElementById("selectProfessorId").value;
	const courseId = document.getElementById("selectCourseId").value;
	const dayOfWeek = document.getElementById("selectDayOfWeekId").value;
	const startHour = document.getElementById("selectStartHourId").value;
	const endHour = document.getElementById("selectEndHourId").value;

	let result;

	const data = {
		course: {
			id: courseId
		},
		dayofweek: dayOfWeek,
		end: endHour,
		professor: {
			id: professorId
		},
		start: startHour
	}

	if (!actualId) {
		result = await create(route, data);
	} else {
		result = await update(route + actualId, data);
	}
	if (result) {
		refreshTable();
	} else {
		alert("Professor já está alocado neste horário");
	}
}

async function applyDeleteAllocation() {
	let result;

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
confirmSave.addEventListener("click", applyAddAllocation);

const confirmDelete = document.getElementById("btnModalDelete");
confirmDelete.addEventListener("click", applyDeleteAllocation);

const btnDeleteAll = document.getElementById("btnDeleteAllAllocations");
btnDeleteAll.addEventListener("click", () => btnDeleteAll_click());

function btnDeleteAll_click() {
	actualId = undefined;
	let txtDepartment = document.getElementById('txtDeleteAllocation');
	txtDepartment.textContent = "";

	const title = document.getElementById("modalDeleteTitle");
	title.textContent = "Deletar Todos Departamentos";
	document.getElementById('msgConfirmDelete').hidden = true;
	document.getElementById('msgConfirmDeleteAll').hidden = false;

	var myModal = new bootstrap.Modal(document.getElementById('modalDelete'))
	myModal.show();
}

async function loadSelectProfessorId() {
	const routeProfessor = "/professors/";
	professors = await getData(routeProfessor);

	const selectProfessors = document.getElementById("selectProfessorId");

	for (let item of professors) {
		const opcao = document.createElement("option");
		opcao.value = item.id;
		opcao.textContent = item.name;

		selectProfessors.appendChild(opcao);
	}
}

loadSelectProfessorId();

async function loadSelectCourseId() {
	const routeCourse = "/courses/";
	courses = await getData(routeCourse);

	const selectCourses = document.getElementById("selectCourseId");

	for (let item of courses) {
		const opcao = document.createElement("option");
		opcao.value = item.id;
		opcao.textContent = item.name;

		selectCourses.appendChild(opcao);
	}
}

loadSelectCourseId();

async function loadSelectDayHour() {

	const selectDayOfWeek = document.getElementById("selectDayOfWeekId");
	const selectStartHour = document.getElementById("selectStartHourId");
	const selectEndHour = document.getElementById("selectEndHourId");

	for (let item of days) {
		const opcao = document.createElement("option");
		opcao.value = item;
		opcao.textContent = item;

		selectDayOfWeek.appendChild(opcao);
	}

	for (let item of hours) {
		let optionStart = document.createElement("option");
		optionStart.value = item;
		optionStart.textContent = item.substr(0, 5);
		selectStartHour.appendChild(optionStart);

		let optionEnd = document.createElement("option");
		optionEnd.value = item;
		optionEnd.textContent = item.substr(0, 5);
		selectEndHour.appendChild(optionEnd);
	}
}


loadSelectDayHour();

loadTable();

function sortTable(table, dir, n) {
	var rows, switching, i, x, y, shouldSwitch, switchcount = 0;
	switching = true;}

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
	function sair() {
		var saida = confirm("Tem certeza que deseja sair?");
		if (saida == true) {
			window.location.replace("https://elegant-knuth-94245c.netlify.app/");
		} else {
		}
	}
