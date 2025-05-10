/*
    1. Crear tantos familiares como indique el usuario
    2. Por cada familiar pedir nombre, email y salario
    3. Calcular el: Mínimo, Máximo y Promedio.
    4. Validar el nombre (regex), validar email (regex), validar salario > 0
*/

const $formEdades = document.querySelector ('#form-datos-familiares');
$formEdades.addEventListener('submit', function(e){               
    e.preventDefault()
    return false
});

function crearInput(type, className, placeholder) {
  const input = document.createElement('input');
  input.type = type;
  input.className = className;
  input.placeholder = placeholder;
  return input;
}

function crearLabel(texto) {
  const label = document.createElement('label');
  label.textContent = texto;
  return label;
}

function calcularPromedio (numeros){
    let acumulador = 0
    for (i=0;i<numeros.length;i++)
        acumulador += numeros[i]
    return acumulador/numeros.length
}

const $cantidadDeInputs = document.querySelector ('#boton-cantidad-familiares')
$cantidadDeInputs.addEventListener ('click', function(){
    const $contenedorInputs = document.querySelector('#inputs-familiares');
    $contenedorInputs.innerHTML = '';
    const $numeroFamiliares = Number (document.querySelector ('#cantidad-familiares').value);
    if ($numeroFamiliares > 0){
      for (i=0;i<$numeroFamiliares;i++){
        const nuevoLabel = crearLabel(`Integrante ${i + 1}`);
        const nuevoInputNombre = crearInput('text', 'nombre-integrantes', 'Nombre');
        const nuevoInputEmail = crearInput('text', 'emails-integrantes', 'Email');
        const nuevoInputSalario = crearInput('number', 'salarios-integrantes', 'Salario');
        $contenedorInputs.appendChild (nuevoLabel);   
        $contenedorInputs.appendChild (nuevoInputNombre);   
        $contenedorInputs.appendChild (nuevoInputEmail);  
        $contenedorInputs.appendChild (nuevoInputSalario);
        }
      document.querySelector('#boton-calcular').classList.remove('oculto');
    } else {
      document.querySelector('#errores').innerHTML = 'Por favor ingrese al menos 1'
    }
})



const $calcularPromedioSalarios = document.querySelector ('#boton-calcular');
$calcularPromedioSalarios.addEventListener ('click', function(){

  document.querySelector('#errores').innerHTML = ''

  const nombres = document.querySelectorAll('.nombre-integrantes');
  const regexNombres = /^[a-z\s]+$/i
  let nombresValidos = true;

  nombres.forEach(input => {
  if (!regexNombres.test(input.value.trim())) {
    nombresValidos = false;
  }
  })
  if (!nombresValidos) {
  document.querySelector('#errores').innerHTML = 'Por favor ingrese un nombre válido';
  return;
  }

  const emails = document.querySelectorAll('.emails-integrantes');
  const regexEmails = /^[^\s@]+@[^\s@]+\.(com|org|net|edu|gov|ar|info)$/i
  let emailsValidos = true;

  emails.forEach(input => {
  if (!regexEmails.test(input.value.trim())) {
    emailsValidos = false;
  }
  });
  if (!emailsValidos) {
  document.querySelector('#errores').innerHTML = 'Por favor ingrese un email válido';
  return;
  }

  const $datosSalario = document.querySelector('#datos-salario');
  const $salarios = document.querySelectorAll ('.salarios-integrantes');
  const salarios = [];

  let salariosValidos = true

  for (i=0;i<$salarios.length;i++){
    salarios.push(Number($salarios[i].value));
  };

  for (let i = 0; i < salarios.length; i++){
  if (salarios[i] <= 0) {
    salariosValidos = false;
    break;
    }
  }

  if (salariosValidos){
    const promedio = Math.round (calcularPromedio(salarios));
    const salarioMenor = Number (Math.min (...salarios));
    const salarioMayor = Number (Math.max (...salarios));
    $datosSalario.innerHTML = `Menor salario: $${salarioMenor} <br> Mayor salario: $${salarioMayor} <br> Promedio salarios: $${promedio}` 
  } else {
    document.querySelector('#errores').innerHTML = 'Ingrese un salario mayor a 0'
  }
});

const $recargarPagina = document.querySelector ('#reload');
$recargarPagina.addEventListener ('click', function(){
  window.location.reload();
});


//funciona
//probablemente falte refactorizar un poco 
