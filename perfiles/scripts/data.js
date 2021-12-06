document.addEventListener('DOMContentLoaded',(event) => {

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    let curp = getParameterByName("curp");

    var request = new XMLHttpRequest();
    request.open('POST','../private/get-afiliado.php');

    let data = new FormData();
    data.append("curp",curp);

	request.onload = function(){
	    var result = JSON.parse(request.responseText);
		if(result.success){
            document.getElementById("image").setAttribute('src','https://ciddei.org/images/afiliados/' + result.afiliado.curp + '.jpg');
            document.getElementById("id").innerText = "CTA-00" + result.afiliado.id;
            document.getElementById("nombre").innerText = result.afiliado.nombre;
            document.getElementById("correo").innerText = result.afiliado.correo;
            document.getElementById("telefono").innerText = result.afiliado.telefono;
            document.getElementById("curp").innerText = result.afiliado.curp;
            document.getElementById("nacimiento").innerText = result.afiliado.nacimiento;
            document.getElementById("edad").innerText = result.afiliado.edad;
            document.getElementById("sexo").innerText = result.afiliado.sexo;
            document.getElementById("disciplina").innerText = result.afiliado.disciplina;
            document.getElementById("date").innerText = result.afiliado.date;
		}
	}

	request.send(data);
});