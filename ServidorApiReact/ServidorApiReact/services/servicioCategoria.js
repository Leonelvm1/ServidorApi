export async function buscarCategorias() {
    const URL = "http://localhost:8000/categoria";
    try {
        const respuesta = await fetch(URL, { method: "GET" });
        if (!respuesta.ok) {
            throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
        }
        return await respuesta.json();
    } catch (error) {
        console.error("Error buscando categorías:", error);
        throw error;
    }
}

export async function registrarCategoria(datosCategoria) {
    const URL = "http://localhost:8000/categoria";
    try {
        const respuesta = await fetch(URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datosCategoria),
        });
        if (!respuesta.ok) {
            throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
        }
        return await respuesta.json();
    } catch (error) {
        console.error("Error registrando categoría:", error);
        throw error;
    }
}
