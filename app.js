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
        const btnEditar = document.createElement('button'); 
        btnEditar.textContent = "Editar"; 
        btnEditar.onclick = () => llenarFormulario(user); 
        cAcciones.appendChild(btnEditar);
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
    const id = document.getElementById('userId').value; // ¿Hay ID? 
    const name = document.getElementById('name').value; 
    const email = document.getElementById('email').value; 
    const password = document.getElementById('password').value;

    if(id) { 
        // EDITAR (PUT) 
        await fetch(`${API}/${id}`, { 
            method: 'PUT', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({name, email})
        }); 
    } else { 
        // CREAR (POST) 
        await fetch(API, { 
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({name, email, password}) 
        }); 
    } 
    
    // Las siguientes tres líneas manejan la limpieza y recarga después de la operación.
    limpiar(); 
    cargar(); 
} 
// El código problemático fue eliminado de aquí.

async function borrar(id) { 
    if(confirm('¿Seguro?')) { 
        await fetch(`${API}/${id}`, { method: 'DELETE' }); 
        cargar(); 
    } 
}

function llenarFormulario(user) { 
    document.getElementById('userId').value = user.id; 
    document.getElementById('name').value = user.name; 
    document.getElementById('email').value = user.email; 
    document.getElementById('password').disabled = true; 
    document.getElementById('password').placeholder = "No se edita"; 
    document.getElementById('btnSubmit').textContent = "Actualizar"; 
    document.getElementById('formTitle').textContent = "Editando usuario";
}

function limpiar() { 
    document.getElementById('userId').value = ''; 
    document.getElementById('name').value = ''; 
    document.getElementById('email').value = ''; 
    document.getElementById('password').value = ''; 
    document.getElementById('password').disabled = false; 
    document.getElementById('password').placeholder = "Contraseña"; 
    document.getElementById('btnSubmit').textContent = "Guardar Usuario"; 
    document.getElementById('formTitle').textContent = "Nuevo Usuario"; 
}