
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