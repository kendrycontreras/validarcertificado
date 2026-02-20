// CONFIGURACIÓN DE SUPABASE
const SUPABASE_URL = 'https://krllfdbmxmtllngjrtpk.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_5MB6GokqPar8kALmNz-jWQ_B7eaNLT4';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function validarCertificado() {
    // Obtenemos el valor, quitamos espacios y LUEGO quitamos los guiones
    const codigoInput = document.getElementById('certId').value.trim().replace(/-/g, '');
    
    const resultadoDiv = document.getElementById('resultado');
    const btn = document.getElementById('btnConsultar');

    if (!codigoInput) {
        alert("Por favor ingresa un código.");
        return;
    }

    // Mostrar estado de carga
    btn.disabled = true;
    btn.innerHTML = '<span class="loader"></span> Buscando...';
    resultadoDiv.className = '';
    resultadoDiv.innerHTML = '';

    try {
        // Consulta a la tabla 'certificados' filtrando por la columna 'codigo'
        const { data, error } = await _supabase
            .from('certificados')
            .select('nombre, apellido, curso, dni, date')
            .eq('codigo', codigoInput)
            .single(); // Traer solo un resultado

        if (error || !data) {
            resultadoDiv.className = 'error';
            resultadoDiv.innerHTML = '❌ Código de certificado no válido o no encontrado.';
        } else {
            resultadoDiv.className = 'success';
            resultadoDiv.innerHTML = `

                <div>
                    <h3><i class="fa-solid fa-circle-check"></i> Certificado Válido</h3><br>
                    
                    <span><i class="fa-solid fa-user-graduate"></i> <b>Alumno: </b>${data.nombre} ${data.apellido}</span></br>
                    <span><i class="fa-solid fa-certificate"></i> <b>Curso: </b>${data.curso}</span></br>
                    <span><i class="fa-solid fa-calendar-check"></i> <b>Fecha emisión: </b>${data.date}</span></br>
                    <span><i class="fa-solid fa-clock"></i> <b>Formación: </b> 5 Horas</span>
                </div>
            `;
        }
    } catch (err) {
        resultadoDiv.className = 'error';
        resultadoDiv.innerHTML = 'Hubo un error al conectar con la base de datos.';
    } finally {
        btn.disabled = false;
        btn.innerText = 'Consultar';
    }
}