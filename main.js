const tarjeta = document.querySelector('#tarjeta'),
      botonAbrirForm = document.querySelector('#btnAbrirForm'),
      formulario = document.querySelector("#form"),
      numeroTarjeta = document.querySelector('#tarjeta #numeroTarjeta'),
      nombreTitular = document.querySelector('#tarjeta .nombre'),
      logoMarca = document.querySelector('#logoMarca'),
      firma = document.querySelector('#firma p'),
      mesVencimiento = document.querySelector('#vto .mm'),
      AnioVencimiento = document.querySelector('#vto .aa'),
      codV = document.querySelector('#codigoV p');

// Girar la tarjeta para que el usuario vea el frente
const mostrarFrente = () => {
    if(tarjeta.classList.contains( 'active' )){
        tarjeta.classList.remove( 'active' );
    }
}

// Girar tarjeta
tarjeta.addEventListener('click', () => {
    tarjeta.classList.toggle('active');
})

// Abrir el formulario y rotar el botón
botonAbrirForm.addEventListener('click', () => {
    botonAbrirForm.classList.toggle('active');
    formulario.classList.toggle('active');
})

// Select del mes generado dinámicamente
for(let i = 1; i <= 12; i++){
    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;
    formulario.vtoTarjeta.appendChild(opcion);
}

// Select del año generado dinámicamente
const anioActual = new Date().getFullYear();

for(let i = anioActual; i <= (anioActual + 8); i++){
    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;
    formulario.vtoAnio.appendChild(opcion);
}

// Input número de tarjeta
formulario.numTarj.addEventListener('keyup', (e) => {
    let valorInput = e.target.value;

    // Eliminar espacios en blanco / letras / poner espacio cada 4 números / eliminar último espaciado
    formulario.numTarj.value = valorInput.replace(/\s/g, '').replace(/\D/g, '')
    .replace(/([0-9]{4})/g, '$1 ').trim();

    numeroTarjeta.textContent = valorInput;

    if( valorInput == ''){
        numeroTarjeta.textContent = '#### #### #### ####';
        logoMarca.innerHTML = '';
    }

    if( valorInput[0] == 4 ){
        logoMarca.innerHTML = '';
        const imagen = document.createElement('img');
        imagen.src = 'img/visa.png';
        logoMarca.appendChild(imagen);
    } else if ( valorInput[0] == 5 ) {
        logoMarca.innerHTML = '';
        const imagen = document.createElement('img');
        imagen.src = 'img/mastercard.png';
        logoMarca.appendChild(imagen);
    }

    // Girar la tarjeta para que el usuario vea el frente
    mostrarFrente();
});

// Input nombre del titular de la tarjeta
formulario.nombre.addEventListener('keyup', (e) => {
    let valorInput = e.target.value;

    formulario.nombre.value = valorInput.replace(/[0-9]/g, '');
    nombreTitular.textContent = valorInput;
    firma.textContent = valorInput;

    if ( valorInput == '' ) {
        nombreTitular.textContent = 'Juan Pérez';
    }

    mostrarFrente();
});

// Select Mes de vencimiento
formulario.vtoTarjeta.addEventListener('change', (e) => {
    mesVencimiento.textContent = e.target.value;

    mostrarFrente();
});

// Select Año de vencimiento
formulario.vtoAnio.addEventListener('change', (e) => {
    AnioVencimiento.textContent = e.target.value.slice(2);

    mostrarFrente();
});

// Input CVV
formulario.cvv.addEventListener('keyup', (e) => {
    if(!tarjeta.classList.contains('active')) {
        tarjeta.classList.toggle('active');
    }
    
    let valorInput = e.target.value;

    formulario.cvv.value = valorInput
        .replace(/\s/g, '')
        .replace(/\D/g, '');
    codV.textContent = valorInput;
});