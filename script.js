async function cargarContenidoExterno() {
    const url = 'contenido.json';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.warn('No se pudo cargar contenido externo:', response.status);
            return;
        }

        const data = await response.json();

        Object.keys(data).forEach(key => {
            const target = document.querySelector(`[data-content-key="${key}"]`);
            if (target) {
                target.textContent = data[key];
            }

            const hrefTarget = document.querySelector(`[data-href-key="${key}"]`);
            if (hrefTarget && typeof data[key] === 'string') {
                hrefTarget.href = data[key];
            }
        });
    } catch (error) {
        console.warn('Error al cargar contenido externo:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    cargarContenidoExterno();

    const ventanaModal = document.getElementById('modal-ventana');
    const cerrarBtn = document.getElementById('modal-cerrar-btn');
    const nombreModal = document.getElementById('modal-nombre');
    const detalleModal = document.getElementById('modal-detalle');
    const galeriaInterna = document.getElementById('modal-galeria-interna');

    const tarjetasProductos = document.querySelectorAll('.tarjeta-producto');

    tarjetasProductos.forEach(tarjeta => {
        tarjeta.addEventListener('click', () => {
            galeriaInterna.innerHTML = '';

            nombreModal.textContent = tarjeta.getAttribute('data-titulo') || '';
            detalleModal.textContent = tarjeta.getAttribute('data-descripcion') || '';

            const contenedorVariantes = tarjeta.querySelector('.variante-oculta');

            if (contenedorVariantes) {
                const items = contenedorVariantes.querySelectorAll('.item-variante');
                items.forEach(item => {
                    const clon = item.cloneNode(true);
                    galeriaInterna.appendChild(clon);
                });
            } else {
                const imgPortada = tarjeta.querySelector('img');
                if (imgPortada) {
                    const estructuraSimple = document.createElement('div');
                    estructuraSimple.className = 'item-variante';
                    estructuraSimple.style.gridColumn = '1 / -1';

                    const nuevaImg = document.createElement('img');
                    nuevaImg.src = imgPortada.src;
                    nuevaImg.style.height = '260px';

                    estructuraSimple.appendChild(nuevaImg);
                    galeriaInterna.appendChild(estructuraSimple);
                }
            }

            ventanaModal.className = 'modal-visible';
        });
    });

    cerrarBtn.addEventListener('click', () => {
        ventanaModal.className = 'modal-oculto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === ventanaModal) {
            ventanaModal.className = 'modal-oculto';
        }
    });
});
