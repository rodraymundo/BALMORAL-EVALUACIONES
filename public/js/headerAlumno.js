export function renderHeader(user) {
    const header = document.createElement('nav');
    header.className = 'navbar navbar-expand-lg';
    header.innerHTML = `
        <div class="container-fluid d-flex justify-content-between align-items-center">
            <a class="navbar-brand" href="/DashboardAlumno.html">
                <img src="/assets/img/logo_balmoral.png" alt="Logo Balmoral">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Alternar navegación">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="dropdown ms-auto">
                <a class="dropdown-toggle d-flex align-items-center text-decoration-none text-dark" href="#" role="button" id="dropdownUser" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fas fa-user-circle me-2" id="userIcon"></i>
                </a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownUser">
                    <li><a class="dropdown-item" href="/Mi-Perfil.html">Ver mi perfil</a></li>
                    <li><a class="dropdown-item" id="logout-btn" href="#">Cerrar Sesión</a></li>
                </ul>
            </div>
        </div>

        <!-- Modal de info usuario -->
        <div class="modal fade" id="userInfoModal" tabindex="-1" aria-labelledby="userInfoModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content rounded-4 shadow-sm border-0">
            <div class="modal-header bg-danger text-white rounded-top-4">
                <h5 class="modal-title w-100 text-center" id="userInfoModalLabel">
                Información de Usuario
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body bg-light text-center px-4">

                <div class="mb-4">
                <i class="fas fa-user-circle fa-6x text-secondary mb-3"></i>
                </div>

                <div class="mb-3 border-bottom pb-2">
                <h6 class="text-muted mb-1">Nombre</h6>
                <p id="modalUserName" class="fw-semibold text-dark">N/A</p>
                </div>
                <div class="mb-3 border-bottom pb-2">
                <h6 class="text-muted mb-1">Email</h6>
                <p id="modalUserEmail" class="fw-semibold text-dark">N/A</p>
                </div>
            </div>
            <div class="modal-footer bg-light rounded-bottom-4 justify-content-center">
                <button type="button" class="btn btn-outline-dark px-4" data-bs-dismiss="modal">Cerrar</button>
            </div>
            </div>
        </div>
        </div>
    `;

    // Logout con CSRF
    header.querySelector('#logout-btn').addEventListener('click', async (e) => {
        e.preventDefault();
        try {
        const csrfResponse = await fetch('/csrf-token', { method: 'GET', credentials: 'include' });
        const csrfData = await csrfResponse.json();
        const response = await fetch('/logout', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'CSRF-Token': csrfData.csrfToken
            },
            credentials: 'include',
            body: JSON.stringify({})
        });
        const data = await response.json();
        if (data.success) {
            await Swal.fire({
            icon: 'success',
            title: 'Sesión cerrada',
            text: 'Has cerrado sesión exitosamente.',
            timer: 2000,
            showConfirmButton: false
            });
            window.location.href = data.redirect;
        } else {
            Swal.fire({ icon: 'error', title: 'Error', text: data.message || 'Error al cerrar sesión.' });
        }
        } catch (error) {
        console.error('Error al cerrar sesión:', error);
        Swal.fire({ icon: 'error', title: 'Error', text: 'Error al conectar con el servidor.' });
        }
    });

    // Rellenar info modal
    header.querySelector('#modalUserName').textContent = user.nombre_completo || 'N/A';
    header.querySelector('#modalUserEmail').textContent = user.email || 'N/A';


    // Mostrar modal al dar clic en "Ver mi perfil"
    const verPerfilLink = header.querySelector('a.dropdown-item[href="/Mi-Perfil.html"]');

    if (verPerfilLink) {
        verPerfilLink.addEventListener('click', (e) => {
        e.preventDefault();
        new bootstrap.Modal(header.querySelector('#userInfoModal')).show();
        });
    }

    return header;
}
