const noSePudoValidarRequestBodyErrorDescription = 'Hubo un error de validacion con alguno de los datos.';

exports.validateRequestBodyVehiculo = function validateRequestBodyVehiculo(body) {
    // swagger verifica que cumpla estructuralmente todo, si llega aca ya tiene los 2 cuerpos del body

    const regexPatenteVieja = /^[a-zA-Z]{3}\d{3}$/;
    const regexPatenteNueva = /^[a-zA-Z]{2}\d{3}[a-zA-Z]{2}$/;

    if (body.tipoDeVehiculo != 'Bicicleta') {
        if(!(regexPatenteNueva.test(body.patente) || regexPatenteVieja.test(body.patente))){
            throw new Error(noSePudoValidarRequestBodyErrorDescription);
        };
    } else {
        const rodadoInRange = body.rodado >= 26 && body.rodado <= 29;
        const hasPatente = 'patente' in body;
        
        if(!(rodadoInRange && !hasPatente)){
            throw new Error(noSePudoValidarRequestBodyErrorDescription);
        };
    }
}
