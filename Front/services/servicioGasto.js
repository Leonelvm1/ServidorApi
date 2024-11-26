export async function buscarGastos() {
    const URL = "http://localhost:8000/gasto";
    try {
        const respuesta = await fetch(URL, { method: "GET" });
        if (!respuesta.ok) {
            throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
        }
        return await respuesta.json();
    } catch (error) {
        console.error("Error buscando gastos:", error);
        throw error;
    }
}

export async function registrarGasto(datosGasto) {
    const URL = "http://localhost:8000/gasto";
    try {
        const respuesta = await fetch(URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datosGasto),
        });
        if (!respuesta.ok) {
            throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
        }
        return await respuesta.json();
    } catch (error) {
        console.error("Error registrando gasto:", error);
        throw error;
    }
}
