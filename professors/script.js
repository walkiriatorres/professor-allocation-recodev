const route = "/professors/"

let departments = [];

let actualId = undefined;

const table = document.getElementById("tableBody");

async function createLine(professor) {
	let linha = document.createElement("tr");

	let colunaNome = document.createElement("td");
	colunaNome.textContent = professor.name;
	linha.appendChild(colunaNome);

	let colunaCPF = document.createElement("td");
	colunaCPF.textContent = professor.cpf;
	linha.appendChild(colunaCPF);

	let colunaDepartment = document.createElement("td");
	colunaDepartment.textContent = professor.department.name;
	linha.appendChild(colunaDepartment);

	let colunaEdit = document.createElement("td");
	let btnEdit = document.createElement("button");
	btnEdit.textContent = "Edit";
	btnEdit.classList.add("btn");
	btnEdit.classList.add("btn-info");

	btnEdit.addEventListener("click", () => btnUpdate_click(professor));

	colunaEdit.appendChild(btnEdit);
	linha.appendChild(colunaEdit);

	let colunaDelete = document.createElement("td");
	let btnDelete = document.createElement("button");
	btnDelete.textContent = "Delete";
	btnDelete.classList.add("btn");
	btnDelete.classList.add("btn-danger");

	btnDelete.addEventListener("click", () => btnDelete_click(professor));

	colunaDelete.appendChild(btnDelete);
	linha.appendChild(colunaDelete);

	table.appendChild(linha);
}

async function refreshTable() {
	table.innerHTML = '';

	loadTable();
}

async function loadTable(){
	let meusDados = await getData(route);
	
	for (let item of meusDados){
		createLine(item);
	}
}

function checkInputs(inputs) {

  var filled = true;
  
  inputs.forEach(function(input) {    
    if(input.value === "" || input.value === "selected") {
        filled = false;
    }  
    });  
  return filled;  
}

function btnAdd_click() {
	
	document.getElementById("txtName").value = "";
	document.getElementById("txtCPF").value = "";
	document.getElementById("selectDepartmentId").value = "selected";	
	const title = document.getElementById("modalCreateTitle");
	title.textContent = "Create Professor";
	actualId = undefined;
	
	document.getElementById("btnModalCreate").disabled = true;

	var cpf_input = document.getElementById("txtCPF");
	var professor_input = document.getElementById("txtName");
	var department_input = document.getElementById("selectDepartmentId");
	var minhasInputs = [professor_input, cpf_input, department_input];

	minhasInputs.forEach(function(input) {
    
	  input.addEventListener("blur", function() {

	    if(checkInputs(minhasInputs) && validarCPF(valor_do_cpf) ) {
	      btnModalCreate.disabled = false;
	    } else {
	      btnModalCreate.disabled = true;
	    }

	  });

	});
}

function btnUpdate_click(professor){
	const title = document.getElementById("modalCreateTitle");
	title.textContent = "Update Professor";

	document.getElementById("txtName").value = professor.name;
	document.getElementById("txtCPF").value = professor.cpf;
	document.getElementById("selectDepartmentId").value = professor.department.id;

	actualId = professor.id;

	var myModal = new bootstrap.Modal(document.getElementById('modalCreate'));
	myModal.show();
}

function btnDelete_click(professor) {
	actualId = professor.id;

	const txtProfessor = document.getElementById("txtDeleteProfessor");
	txtProfessor.textContent = professor.name;	

	var myModalDelete = new bootstrap.Modal(document.getElementById('modalDelete'));
	myModalDelete.show();
}

async function applyAddProfessor(){
	const name = document.getElementById("txtName").value;
	const cpf = document.getElementById("txtCPF").value;
	const idDepartment = document.getElementById("selectDepartmentId").value;

	
	let result;

	if (!name || !cpf || !idDepartment || idDepartment === "selected") {
		alert("Fill in the required fields!");
		return;
	} 

	const data = {
		name,
		cpf,
		department: {
			id: idDepartment
		}
	}

	if (!actualId) {
		result = await create(route, data);
	} else {
		result = await update(route + actualId, data);
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

async function loadSelectDepartmentId() {
	const routeDepartment = "/departments/";
	departaments = await getData(routeDepartment);

	const selectDepartments = document.getElementById("selectDepartmentId");

	for (let item of departaments) {
		const opcao = document.createElement("option");
		opcao.value = item.id;
		opcao.textContent = item.name;

		selectDepartments.appendChild(opcao);
	}
}

loadSelectDepartmentId();

loadTable();

function validarCPF(){
   var cpf = document.getElementById("txtCPF").value;

   if(cpf.length != 11) {
   	//alert("CPF inválido. Digite CPF com 11 dígitos");
      return false;
   }
      
   if(cpf == "00000000000" || cpf == "11111111111" ||
      cpf == "22222222222" || cpf == "33333333333" || 
      cpf == "44444444444" || cpf == "55555555555" ||
      cpf == "66666666666" || cpf == "77777777777" ||
      cpf == "88888888888" || cpf == "99999999999"){
      //alert("CPF inválido. Tente novamente.");
      return false;
   }
  
   soma = 0;
   for(i = 0; i < 9; i++){
     soma += parseInt(cpf.charAt(i)) * (10 - i);
   }   
 
   resto = 11 - (soma % 11);
    
   if(resto == 10 || resto == 11){
     resto = 0;
   }
    
   if(resto != parseInt(cpf.charAt(9))){
    //alert("CPF inválido. Tente novamente.");
     return false;
   }
 
   soma = 0;
   for(i = 0; i < 10; i ++){
     soma += parseInt(cpf.charAt(i)) * (11 - i);
   }   
 
   resto = 11 - (soma % 11);
   if(resto == 10 || resto == 11){
     resto = 0;
   }
 
   if(resto != parseInt(cpf.charAt(10))){
     //alert("CPF inválido. Tente novamente.");
     return false;
   }
 
   //alert("CPF válido. Muito obrigado."); 
   return true;
}

var input_do_cpf = document.getElementById("txtCPF");
var valor_do_cpf = input_do_cpf.value;
input_do_cpf.addEventListener("blur", function() {
	    if(validarCPF(valor_do_cpf)) {
	      btnModalCreate.disabled = false;
	      document.getElementById("txtCPF").style.borderColor = "#103017";
	    } else {
	      btnModalCreate.disabled = true;
	      document.getElementById("txtCPF").style.borderColor = "#ff0000";
	    }
	  });
