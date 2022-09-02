import path from "path";
/**
 * 
 * @param {Object} request Express request 
 * @param {*} ipaipURL Url de API para consultar location by IP
 * @returns 
 */
export const getIPfromClientOrMock = (request, ipaipURL) => {
    let urlWithDomain = ipaipURL;

    // Si se está realizando la prueba desde localhost, usamos una ip random para devolver coordenadas
    if((/localhost:/).test(request.headers.host)){
        urlWithDomain += "200.51.255.3";
    } else {
        // Leemos la ip desde la petición del usuario
        urlWithDomain += request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    }

    return urlWithDomain;
}

/**
 * 
 * @param {string} modulePath Ruta del módulo a importar (sin aclarar la carpeta src)
 * 
 * @returns modulo importado para usar 
 */
export const dynamicImport = async (modulePath) => {
    try {
        const module = await import("../"+modulePath);
        return module;
    } catch(error) {
        console.error("Error al importar el módulo de la ruta: " + modulePath);
        console.error(error);
    }
}