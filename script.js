// CONFIGURACIÓN DE SUPABASE
const SUPABASE_URL = 'https://krllfdbmxmtllngjrtpk.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_5MB6GokqPar8kALmNz-jWQ_B7eaNLT4';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function validarCertificado() {
    const codigoInput = document.getElementById('certId').value.trim();
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
            .select('nombre, apellido, dni, date')
            .eq('codigo', codigoInput)
            .single(); // Traer solo un resultado

        if (error || !data) {
            resultadoDiv.className = 'error';
            resultadoDiv.innerHTML = '❌ Código de certificado no válido o no encontrado.';
        } else {
            resultadoDiv.className = 'success';
            resultadoDiv.innerHTML = `
                <strong>✅ Certificado Verificado</strong><br><br>
                <strong>Nombre:</strong> ${data.nombre}<br>
                <strong>Apellido:</strong> ${data.apellido}<br>
                <strong>Cédula:</strong> ${data.dni}<br>
                <strong>Emitido el:</strong> ${data.date}
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