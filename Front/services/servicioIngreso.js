export async function buscarIngresos() {
    const URL = "http://localhost:8000/ingreso";
    const peticion = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        const respuestaInicial = await fetch(URL, peticion);
        if (!respuestaInicial.ok) {
            throw new Error(`Error ${respuestaInicial.status}: ${respuestaInicial.statusText}`);
        }
        const respuestaFinal = await respuestaInicial.json();
        return respuestaFinal;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export async function registrarIngreso(datosIngreso) {
    const URL = "http://localhost:8000/ingreso";
    const peticion ={
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datosIngreso),
    };
    
    try {
        console.log("Datos enviados al backend:", JSON.stringify(datosIngreso));

        const respuestaInicial = await fetch(URL, peticion);
        if(!respuestaInicial.ok){
            throw new Error(`Error ${respuestaInicial.status}: ${respuestaInicial.statusText}`);
        }
        const respuestaFinal = await respuestaInicial.json();
        return respuestaFinal;
    } catch (error){
        console.error("Error fetching data:", error);
        throw error;
    }
}
