exports.validateRequestBodyVehiculo = function validateRequestBodyVehiculo(body) {
    // swagger verifica que cumpla estructuralmente todo, si llega aca ya tiene los 2 cuerpos del body

    const regexPatenteVieja = /^[a-zA-Z]{3}\d{3}$/;
    const regexPatenteNueva = /^[a-zA-Z]{2}\d{3}[a-zA-Z]{2}$/;

    if (body.tipoDeVehiculo != 'Bicicleta') {
        return regexPatenteNueva.test(body.patente) || regexPatenteVieja.test(body.patente)
    } else {
        // podria validar que el rodado tenga sentido
        return true;
    }
}
