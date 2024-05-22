exports.validateRequestBodyPote = function validateRequestBodyPote(body, gustosArray) {
    // swagger verifica que cumpla estructuralmente todo, si llega aca ya tiene peso correcto x enum y gustos.
    
    // 1. array de gustos es maximo de largo 3 si es 250 o 500, y maximo 4 si es de 1000
    let numberOfGustosIsValid = body.gustos.length > 0;
    if (body.peso === '500' || body.peso === '250') {
        numberOfGustosIsValid = numberOfGustosIsValid && body.gustos.length < 4;
    }else{ // peso 1000, como es enum si o si es ese
        numberOfGustosIsValid = numberOfGustosIsValid && body.gustos.length <=4;
    }

    // 2. no hay gustos repetidos
    let allGustosAreUnique = true;
    const uniqueGustos = new Set();
    body.gustos.forEach(gusto => {
        if (uniqueGustos.has(gusto)) {
            allGustosAreUnique = false;
            return; 
        }
        uniqueGustos.add(gusto);
    });
    
    // 3. todos los gustos deben estar disponibles en la heladería
    let allGustosAreAvailable = true;
    body.gustos.forEach(gusto => {
        const gustoDisponible = gustosArray.find(gustoEnHeladeria => gustoEnHeladeria.id === gusto);
        if (!gustoDisponible) {
            allGustosAreAvailable = false;
            return; // Salir del bucle si se encuentra un gusto no disponible
        }
    });


    return numberOfGustosIsValid && allGustosAreUnique && allGustosAreAvailable;
}