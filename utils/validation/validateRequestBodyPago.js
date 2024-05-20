exports.validateRequestBodyPago = function validateRequestBodyPago(body) {

    const regexCreditCardNumber = /^\d{16}$/;

    if (body.tipoDePago === 'DatosDePagoTarjeta') {
        // modificar para usar date actual y no hardcodear
        const validCreditCardNumbers = regexCreditCardNumber.test(body.numerosTarjeta);
        const validMonth = body.vencimientoTarjetaMes >= 1 && body.vencimientoTarjetaMes <= 12;
        const validYear = body.vencimientoTarjetaAnio >= 2024;

        return validCreditCardNumbers && validMonth && validYear;
    }else{
        return true; // no hay una regla estandar para verificar que un alias sea valido
    }

}