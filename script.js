// --- Evento que se dispara cuando el contenido del HTML está listo ---
document.addEventListener('DOMContentLoaded', () => {

    // --- Definición de la Estructura de Datos de la Carrera ---
    // Cada ramo tiene un 'id' único, su 'nombre', el 'semestre' al que pertenece,
    // y un array de 'requisitos' (los 'id' de los ramos que debe aprobar antes).
    // Nota: Para "Zoología", los requisitos son un array dentro de otro,
    // lo que nuestra lógica interpretará como un "O" (necesita uno de los dos).
    const mallaData = [
        // Semestre 1
        { id: 'matematica-general', nombre: 'Matemática General', semestre: 1, requisitos: [] },
        { id: 'taller-comunicacion', nombre: 'Taller de Comunicación Oral y Escrita', semestre: 1, requisitos: [] },
        { id: 'intro-medicina', nombre: 'Introducción a la Medicina Veterinaria', semestre: 1, requisitos: [] },
        { id: 'biologia-celular', nombre: 'Biología Celular', semestre: 1, requisitos: [] },
        { id: 'quimica', nombre: 'Química', semestre: 1, requisitos: [] },
        // Semestre 2
        { id: 'bioestadistica', nombre: 'Bioestadística', semestre: 2, requisitos: ['matematica-general'] },
        { id: 'ingles-1', nombre: 'Inglés I', semestre: 2, requisitos: [] },
        { id: 'anatomia-canino', nombre: 'Anatomía del Canino', semestre: 2, requisitos: [] },
        { id: 'histoembriologia', nombre: 'Histoembriología', semestre: 2, requisitos: [] },
        { id: 'bioquimica', nombre: 'Bioquímica', semestre: 2, requisitos: ['quimica'] },
        // Semestre 3
        { id: 'ingles-2', nombre: 'Inglés II', semestre: 3, requisitos: ['ingles-1'] },
        { id: 'anatomia-comparada', nombre: 'Anatomía Comparada', semestre: 3, requisitos: ['anatomia-canino'] },
        { id: 'zoologia', nombre: 'Zoología', semestre: 3, requisitos: [['histoembriologia', 'biologia-celular']] }, // Requisito tipo "O"
        { id: 'medio-ambiente', nombre: 'Medio Ambiente y Gestión Ambiental', semestre: 3, requisitos: ['biologia-celular'] },
        { id: 'practica-basica', nombre: 'Práctica Básica', semestre: 3, requisitos: ['intro-medicina', 'anatomia-canino'] },
        // Semestre 4
        { id: 'administracion-vet', nombre: 'Administración y Emprendimiento Veterinario', semestre: 4, requisitos: [] },
        { id: 'fisiologia-animal', nombre: 'Fisiología Animal', semestre: 4, requisitos: ['bioquimica', 'practica-basica'] },
        { id: 'enfermedades-parasitarias', nombre: 'Enfermedades Parasitarias', semestre: 4, requisitos: ['zoologia'] },
        { id: 'microbiologia', nombre: 'Microbiología General y Veterinaria', semestre: 4, requisitos: ['biologia-celular'] },
        { id: 'genetica', nombre: 'Genética', semestre: 4, requisitos: ['bioestadistica'] },
        // Semestre 5
        { id: 'reproduccion-ia', nombre: 'Reproducción e Inseminación Artificial', semestre: 5, requisitos: ['fisiologia-animal'] },
        { id: 'fisiopatologia', nombre: 'Fisiopatología', semestre: 5, requisitos: ['histoembriologia', 'fisiologia-animal'] },
        { id: 'inmunologia', nombre: 'Inmunología', semestre: 5, requisitos: ['microbiologia'] },
        { id: 'nutricion-animal', nombre: 'Nutrición y Alimentación Animal', semestre: 5, requisitos: ['bioquimica'] },
        { id: 'tecnologia-alimentos', nombre: 'Tecnología de los Alimentos', semestre: 5, requisitos: ['microbiologia'] },
        { id: 'etologia', nombre: 'Etología y Bienestar Animal', semestre: 5, requisitos: ['zoologia'] },
        // Semestre 6
        { id: 'ginecologia-obstetricia', nombre: 'Ginecología y Obstetricia', semestre: 6, requisitos: ['reproduccion-ia'] },
        { id: 'control-calidad-alimentos', nombre: 'Control de Calidad de los Alimentos', semestre: 6, requisitos: ['enfermedades-parasitarias', 'tecnologia-alimentos'] },
        { id: 'produccion-avicola', nombre: 'Producción Avícola', semestre: 6, requisitos: ['nutricion-animal', 'etologia'] },
        { id: 'farmacologia-toxicologia', nombre: 'Farmacología y Toxicología', semestre: 6, requisitos: ['fisiologia-animal'] },
        { id: 'enfermedades-infecciosas', nombre: 'Enfermedades Infecciosas', semestre: 6, requisitos: ['inmunologia'] },
        { id: 'patologia-sistemas', nombre: 'Patología de Sistemas', semestre: 6, requisitos: ['fisiopatologia'] },
        // Semestre 7
        { id: 'laboratorio-clinico', nombre: 'Laboratorio Clínico', semestre: 7, requisitos: ['patologia-sistemas'] },
        { id: 'prod-ovinos-caprinos', nombre: 'Prod. Ovinos y Caprinos', semestre: 7, requisitos: ['genetica'] },
        { id: 'prod-porcina', nombre: 'Prod. Porcina', semestre: 7, requisitos: ['reproduccion-ia', 'medio-ambiente'] },
        { id: 'epidemiologia', nombre: 'Epidemiología Veterinaria', semestre: 7, requisitos: ['enfermedades-infecciosas'] },
        { id: 'semiologia', nombre: 'Semiología', semestre: 7, requisitos: ['farmacologia-toxicologia', 'fisiopatologia', 'anatomia-comparada'] },
        { id: 'practica-interna', nombre: 'Práctica Interna', semestre: 7, requisitos: ['farmacologia-toxicologia', 'enfermedades-infecciosas'] }, // Se asumió 'Practica intermedia' como 'Practica interna'
        // Semestre 8
        { id: 'medicina-animales-mayores', nombre: 'Medicina Animales Mayores', semestre: 8, requisitos: ['laboratorio-clinico', 'semiologia'] },
        { id: 'medicina-caninos', nombre: 'Medicina de Caninos', semestre: 8, requisitos: ['laboratorio-clinico', 'semiologia'] },
        { id: 'medicina-felinos', nombre: 'Medicina de Felinos', semestre: 8, requisitos: ['laboratorio-clinico', 'semiologia'] },
        { id: 'cirugia-general', nombre: 'Cirugía General', semestre: 8, requisitos: ['semiologia'] },
        { id: 'medicina-exoticos', nombre: 'Medicina de Animales Exóticos', semestre: 8, requisitos: ['laboratorio-clinico', 'semiologia'] },
        // Semestre 9
        { id: 'formulacion-proyectos', nombre: 'Formulación y Evaluación de Proyectos Agropecuarios', semestre: 9, requisitos: ['administracion-vet'] },
        { id: 'patologia-quirurgica', nombre: 'Patología Quirúrgica', semestre: 9, requisitos: ['cirugia-general'] },
        { id: 'diagnostico-imagenes', nombre: 'Diagnóstico por Imágenes', semestre: 9, requisitos: ['patologia-sistemas'] },
        { id: 'prod-acuicola', nombre: 'Prod. Acuícola', semestre: 9, requisitos: ['nutricion-animal'] },
        { id: 'prod-bovinos', nombre: 'Prod. Bovinos Carne y Leche', semestre: 9, requisitos: ['ginecologia-obstetricia'] },
        { id: 'metodologia-investigacion', nombre: 'Metodología de la Investigación', semestre: 9, requisitos: ['epidemiologia'] },
        { id: 'practica-final', nombre: 'Práctica Final', semestre: 9, requisitos: ['practica-interna'] },
        // Semestre 10
        { id: 'farmacologia-aplicada', nombre: 'Farmacología Aplicada', semestre: 10, requisitos: ['medicina-caninos', 'medicina-animales-mayores'] },
        { id: 'salud-publica', nombre: 'Salud Pública', semestre: 10, requisitos: ['control-calidad-alimentos', 'epidemiologia'] },
        { id: 'trabajo-titulacion', nombre: 'Trabajo de Titulación', semestre: 10, requisitos: ['metodologia-investigacion'] },
        { id: 'clinica-mayores', nombre: 'Clínica de Animales Mayores', semestre: 10, requisitos: ['medicina-animales-mayores', 'diagnostico-imagenes'] },
        { id: 'clinica-menores', nombre: 'Clínica de Animales Menores', semestre: 10, requisitos: ['medicina-caninos', 'diagnostico-imagenes'] },
    ];

    // --- Estado de la Aplicación ---
    // Un set para guardar los IDs de los ramos aprobados. Usar un Set es eficiente
    // para añadir, eliminar y comprobar si un elemento existe.
    let ramosAprobados = new Set();

    // --- Referencias a Elementos del DOM ---
    const container = document.getElementById('malla-curricular-container');
    const modal = document.getElementById('requisito-modal');
    const cerrarModalBtn = document.querySelector('.cerrar-modal');
    const listaRequisitosFaltantes = document.getElementById('lista-requisitos-faltantes');

    // --- Funciones Principales ---

    /**
     * Carga el estado de los ramos aprobados desde el localStorage del navegador.
     */
    function cargarEstado() {
        const guardados = localStorage.getItem('ramosAprobadosMV');
        if (guardados) {
            ramosAprobados = new Set(JSON.parse(guardados));
        }
    }

    /**
     * Guarda el conjunto de ramos aprobados en el localStorage.
     */
    function guardarEstado() {
        // Convertimos el Set a un Array para poder guardarlo como JSON
        localStorage.setItem('ramosAprobadosMV', JSON.stringify(Array.from(ramosAprobados)));
    }

    /**
     * Busca un ramo en la `mallaData` por su ID.
     * @param {string} id El ID del ramo a buscar.
     * @returns {object|undefined} El objeto del ramo o undefined si no se encuentra.
     */
    function getRamoById(id) {
        return mallaData.find(ramo => ramo.id === id);
    }

    /**
     * Comprueba si los requisitos de un ramo están cumplidos.
     * @param {object} ramo El objeto del ramo a comprobar.
     * @returns {{cumple: boolean, faltantes: string[]}} Un objeto indicando si se cumplen y la lista de nombres de los requisitos faltantes.
     */
    function comprobarRequisitos(ramo) {
        const faltantes = [];
        let cumple = true;

        for (const requisito of ramo.requisitos) {
            // Si el requisito es un array, es un caso "O" (ej: ['req1', 'req2'])
            if (Array.isArray(requisito)) {
                const cumpleRequisitoO = requisito.some(reqId => ramosAprobados.has(reqId));
                if (!cumpleRequisitoO) {
                    cumple = false;
                    // Añadimos los nombres de los ramos de la opción "O" que faltan.
                    const nombresFaltantes = requisito.map(reqId => getRamoById(reqId)?.nombre || reqId).join(' o ');
                    faltantes.push(nombresFaltantes);
                }
            } else { // Si no, es un caso "Y" normal
                if (!ramosAprobados.has(requisito)) {
                    cumple = false;
                    faltantes.push(getRamoById(requisito)?.nombre || requisito);
                }
            }
        }
        return { cumple, faltantes };
    }

    /**
     * Muestra el modal con la lista de requisitos que faltan.
     * @param {string[]} faltantes Array con los nombres de los ramos faltantes.
     */
    function mostrarModalRequisitos(faltantes) {
        // Limpiamos la lista anterior
        listaRequisitosFaltantes.innerHTML = '';
        // Llenamos la lista con los nuevos requisitos faltantes
        faltantes.forEach(nombreRamo => {
            const li = document.createElement('li');
            li.textContent = nombreRamo;
            listaRequisitosFaltantes.appendChild(li);
        });
        // Mostramos el modal
        modal.classList.remove('modal-oculto');
        modal.classList.add('modal');
    }

    /**
     * Oculta el modal de requisitos.
     */
    function ocultarModal() {
        modal.classList.add('modal-oculto');
        modal.classList.remove('modal');
    }

    /**
     * Actualiza la apariencia de todos los ramos en la malla (aprobado, bloqueado, disponible).
     */
    function actualizarVisualizacion() {
        const todosLosRamosDivs = document.querySelectorAll('.ramo');
        todosLosRamosDivs.forEach(ramoDiv => {
            const ramoId = ramoDiv.dataset.id;
            const ramoData = getRamoById(ramoId);

            ramoDiv.classList.remove('aprobado', 'bloqueado');

            if (ramosAprobados.has(ramoId)) {
                ramoDiv.classList.add('aprobado');
            } else {
                const { cumple } = comprobarRequisitos(ramoData);
                if (!cumple) {
                    ramoDiv.classList.add('bloqueado');
                }
            }
        });
    }

    /**
     * Gestiona el clic sobre un ramo.
     * @param {Event} e El evento de clic.
     */
    function manejarClicRamo(e) {
        const ramoDiv = e.target.closest('.ramo');
        if (!ramoDiv) return;

        const ramoId = ramoDiv.dataset.id;
        const ramoData = getRamoById(ramoId);

        // Si ya está aprobado, permite "des-aprobarlo"
        if (ramosAprobados.has(ramoId)) {
            ramosAprobados.delete(ramoId);
        } else {
            // Si no está aprobado, verifica los requisitos
            const { cumple, faltantes } = comprobarRequisitos(ramoData);
            if (cumple) {
                ramosAprobados.add(ramoId);
            } else {
                // Si no cumple, muestra el modal con los ramos que faltan
                mostrarModalRequisitos(faltantes);
                return; // Detiene la ejecución para no cambiar de estado
            }
        }

        // Guarda el nuevo estado y actualiza la visualización de toda la malla
        guardarEstado();
        actualizarVisualizacion();
    }

    /**
     * Dibuja la malla curricular completa en el DOM por primera vez.
     */
    function renderizarMalla() {
        const maxSemestre = Math.max(...mallaData.map(r => r.semestre));
        
        for (let i = 1; i <= maxSemestre; i++) {
            const ramosDelSemestre = mallaData.filter(r => r.semestre === i);
            
            if (ramosDelSemestre.length > 0) {
                // Crea la columna para el semestre
                const columnaDiv = document.createElement('div');
                columnaDiv.className = 'semestre-columna';

                // Crea el título del semestre
                const tituloH2 = document.createElement('h2');
                tituloH2.className = 'semestre-titulo';
                tituloH2.textContent = `Semestre ${i}`;
                columnaDiv.appendChild(tituloH2);

                // Crea y añade cada ramo a la columna
                ramosDelSemestre.forEach(ramo => {
                    const ramoDiv = document.createElement('div');
                    ramoDiv.className = 'ramo';
                    ramoDiv.textContent = ramo.nombre;
                    ramoDiv.dataset.id = ramo.id; // Guardamos el id en un atributo data-*
                    columnaDiv.appendChild(ramoDiv);
                });

                container.appendChild(columnaDiv);
            }
        }
    }
    
    // --- Inicialización de la Aplicación ---
    
    // 1. Cargar el estado guardado
    cargarEstado();
    // 2. Dibujar la malla en la página
    renderizarMalla();
    // 3. Aplicar los estilos iniciales (aprobado/bloqueado)
    actualizarVisualizacion();

    // --- Asignación de Event Listeners ---
    
    // Un solo listener en el contenedor para manejar todos los clics en ramos (delegación de eventos)
    container.addEventListener('click', manejarClicRamo);

    // Listeners para cerrar el modal
    cerrarModalBtn.addEventListener('click', ocultarModal);
    modal.addEventListener('click', (e) => {
        // Cierra el modal si se hace clic fuera del contenido
        if (e.target === modal) {
            ocultarModal();
        }
    });

});
