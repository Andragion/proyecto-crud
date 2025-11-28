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
        const btnEliminar = document.createElement('button'); 
        btnEliminar.textContent = "Eliminar"; 
        btnEliminar.style.color = "red";
        btnEliminar.onclick = () => borrar(user.id); // Llamar función borrar
        cAcciones.appendChild(btnEliminar); // Agregamos el botón a la celda
        fila.appendChild(cAcciones);

        tabla.appendChild(fila);
    });
}

async function guardarUsuario() { 
    const name = document.getElementById('name').value; 
    const email = document.getElementById('email').value; 
    const password = document.getElementById('password').value;

    await fetch(API, { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({name, email, password}) 
    }); 
    cargar(); 
    
    // Limpiar campos 
    document.getElementById('name').value = ''; 
    document.getElementById('email').value = ''; 
    document.getElementById('password').value = ''; 
}

async function borrar(id) { 
    if(confirm('¿Seguro?')) { 
        await fetch(`${API}/${id}`, { method: 'DELETE' }); 
        cargar(); 
    } 
}