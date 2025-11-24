const API = 'http://localhost:3000/users';

document.addEventListener('DOMContentLoaded', cargar);

async function cargar() {
    const res = await fetch(API);
    const data = await res.json();
    const tabla = document.getElementById('userTable');
    tabla.innerHTML = ''; // Limpiar tabla

    data.forEach(user => {
        const fila = document.createElement('tr');
        
        // 1. Columna Nombre (SEGURA)
        const cNombre = document.createElement('td');
        cNombre.textContent = user.name; // textContent bloquea virus
        fila.appendChild(cNombre);
        
        // 2. Columna Email (SEGURA)
        const cEmail = document.createElement('td');
        cEmail.textContent = user.email;
        fila.appendChild(cEmail);

        // 3. Columna Acciones
        const cAcciones = document.createElement('td');
        cAcciones.textContent = "Pendiente...";
        fila.appendChild(cAcciones);

        tabla.appendChild(fila);
    });
}

