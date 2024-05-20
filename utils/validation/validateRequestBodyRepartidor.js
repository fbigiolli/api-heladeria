exports.validateRequestBodyRepartidor = function validateRequestBodyRepartidor(body) {
    // swagger verifica que cumpla estructuralmente todo, si llega aca ya tiene los 4 cuerpos del body

    const regexOnlyLettersAndMaxLenght30 = /^[a-zA-Z]{1,30}$/;
    const regexValidCUIL = /^\d{11}$/;

    const testNombre = regexOnlyLettersAndMaxLenght30.test(body.nombre);
    const testApellido = regexOnlyLettersAndMaxLenght30.test(body.apellido);
    const testCUIL = regexValidCUIL.test(body.cuil);
    const testEdad = body.edad > 18 && body.edad < 100;

    return testNombre && testApellido && testCUIL && testEdad;
}
