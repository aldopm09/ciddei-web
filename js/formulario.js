const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
const selects = document.querySelectorAll('#formulario select');

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	edad: /^[0-9]{2}$/, // 2 Numeros
	nombre: /^[a-zA-ZÀ-ÿ\s]{4,50}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{10}$/, // 7 a 14 numeros.
    curp: /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/
}

const campos = {
	nombre: null,
	app: null,
	apm: null,
	curp: null,
	nacimiento: null,
	edad: null,
	sexo: null,
	telefono: null,
	correo: null,
	disciplina: null,
	motivo: null,
    imagen: null
}

const validacion = {
	nombre: false,
	app: false,
	apm: false,
	curp: false,
	nacimiento: false,
	edad: false,
	sexo: false,
	telefono: false,
	correo: false,
	disciplina: false,
	motivo: false,
    imagen: false
}

const selectChange = (e) => {
    document.getElementById(`grupo__${e.target.name}`).classList.remove('formulario__grupo-incorrecto');
	document.getElementById(`grupo__${e.target.name}`).classList.add('formulario__grupo-correcto');
	document.querySelector(`#grupo__${e.target.name} i`).classList.add('fa-check-circle');
	document.querySelector(`#grupo__${e.target.name} i`).classList.remove('fa-times-circle');
    campos[e.target.name] = e.target.value;
    validacion[e.target.name] = true;
    console.log(campos);
}

const validarChange = (e) => {
	if(e.target.name !== "terminos"){
		document.getElementById(`grupo__${e.target.name}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${e.target.name}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${e.target.name} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${e.target.name} i`).classList.remove('fa-times-circle');
	}
    
    switch (e.target.name) {
        case "nacimiento":
            campos[e.target.name] = e.target.value;
		    
        break;
        case "imagen":
		    campos[e.target.name] = e.target.files[0];
        break;
    }
    validacion[e.target.name] = true;
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "app":
			validarCampo(expresiones.nombre, e.target, 'app');
		break;
		case "apm":
			validarCampo(expresiones.nombre, e.target, 'apm');
		break;
		case "edad":
			validarCampo(expresiones.edad, e.target, 'edad');
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;
        case "curp":
			validarCampo(expresiones.curp, e.target, 'curp');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = input.value;
		validacion[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		validacion[campo] = false;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
	input.addEventListener('change', validarChange);
});

selects.forEach((select) => {
	select.addEventListener('change', selectChange);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if(validacion.nombre && validacion.app && validacion.apm && campos.curp && 
		validacion.nacimiento && validacion.edad && validacion.sexo && validacion.telefono && 
		validacion.correo && validacion.disciplina && validacion.motivo && validacion.imagen &&
		terminos.checked){

		formulario.reset();

		var request = new XMLHttpRequest();
        request.open('POST','private/add-afiliado.php');

        let data = new FormData();
        data.append("nombre",campos.nombre);
        data.append("app",campos.app);
        data.append("apm",campos.apm);
        data.append("curp",campos.curp);
        data.append("nacimiento",campos.nacimiento);
        data.append("edad",campos.edad);
        data.append("sexo",campos.sexo);
        data.append("telefono",campos.telefono);
        data.append("correo",campos.correo);
        data.append("disciplina",campos.disciplina);
        data.append("motivo",campos.motivo);
        data.append("imagen",campos.imagen);

		request.onload = function(){
			var result = JSON.parse(request.responseText);
			if(result.success){
				/* Swal.fire({
					icon: 'success',
					title: 'Afiliación Exitosa',
					html: 'Mas tarde nos comunicaremos contigo para brindarte mas detalles.',
					timer: 4000,
					timerProgressBar: true,
					willOpen: () => {
						Swal.showLoading();
					}
				});

				setTimeout(() => {
					window.location.reload();
				}, 4000); */
				window.location.href = `/perfiles/?curp=${campos.curp}`;
			} else{
				Swal.fire({
					icon: 'error',
					title: 'Eror al guardar',
					text: result.error
				});
			}
		}

		request.send(data);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});