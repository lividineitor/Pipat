// Presentación

// Negocio

// Entidades de negocio

class Jugador {

    constructor () {
        this.id = 0 ;
        this.nombre = '' ;
        this.puntos = 0 ;
        this.eleccion = '' ;
    }

    // Setters y getters para todas las variables

    setId ( id ) {
        if ( Validador.isNumber ( id ) ) {
            if ( id > 0 )
                this.id = id ;

            else
                console.log ( 'ERROR: El valor para id debe ser mayor o igual a cero.' ) ;

        }

        else
           this.showError ( 'id' , 'NUMBER' ) ;
    }

    getId () {
        return this.id ;
    }

    setNombre ( nombre ) {
        if ( Validador.isString ( nombre ) )
            this.nombre = nombre ;

        else
            this.showError ( 'nombre' , 'STRING' ) ;

    }
    getNombre () {
        return this.nombre ;
    }

    setPuntos ( puntos ) {
        if ( Validador.isNumber ( puntos ) )
            if ( puntos >= 0 )
                this.puntos = puntos ;

            else
                console.log ( 'ERROR: El valor para puntos debe ser mayor o igual a cero.' ) ;

        else
            this.showError ( 'puntos' , 'NUMBER' ) ;
    }

    getPuntos () {
        return this.puntos ;
    }


    // Métodos de la clase

    setEleccion ( eleccion ) {
        if ( Validador.isString ( eleccion ) )
            if ( eleccion == 'piedra' || eleccion == 'papel' || eleccion == 'tijeras' || eleccion == '' )
                this.eleccion = eleccion ;

            else
                console.log ( 'ERROR: El valor para eleccion no es correcto.' ) ;

        else
            this.showError ( 'eleccion' , 'STRING' ) ;
    }

    getEleccion () {
        return this.eleccion ;
    }

    // Métodos private

    showError ( campo , tipo ) {

        console.log ( 'ERROR: El tipo asignado en ' + campo + ', para Jugador, no es ' + tipo + '.' ) ;
    }
}

// Utilidades capa de negocio

class Validador {

    constructor () {}

    static isBoolean ( booleano ) {
        return typeof booleano == 'boolean' ;
    }

    static isNumber ( numero ) {
        return typeof numero == 'number' ;
    }

    static isObject ( objeto , tipo ) {
        return objeto instanceof tipo ;
    }

    static isString ( cadena ) {
        return typeof cadena == 'string' ;
    }

}

// Datos

class RepositorioJugador {

    constructor () {
        this.nombreId = 'jugador' ;
        this.idFinal = 0 ;
    }

    // CRUD elements

    createJugador ( jugador ) {

        if ( Validador.isObject ( jugador , Jugador ) == true ) {

            // Incrementamos el identificador para el siguiente elemento creado
            this.idFinal ++ ;

            jugador.setId ( this.idFinal ) ;

            let jugadorJSON = JSON.stringify ( jugador ) ;

            sessionStorage.setItem ( this.nombreId + this.idFinal , jugadorJSON ) ;

            let jugadorRecuperado = this.retrieveJugador ( this.idFinal ) ;

            return jugadorRecuperado ;
        }

        else {
            console.log ( 'ERROR: El argumento no es de tipo jugador' ) ;
            return null ;
        }

    }

    retrieveJugador ( id ) {

        if ( id < 1 ) {
            console.log ( 'RepositorioJugador: Valor no permitido para id: ' + id ) ;
            return ;
        }

        let jugadorRecuperado = JSON.parse ( sessionStorage.getItem ( this.nombreId + id ) ) ;

        if ( jugadorRecuperado == undefined ) {
            console.log ( 'Jugador no existe' ) ;
            return null ;
        }

        let jugadorObjeto = new Jugador () ;

        jugadorObjeto.setId ( jugadorRecuperado.id ) ;
        jugadorObjeto.setNombre ( jugadorRecuperado.nombre ) ;
        jugadorObjeto.setPuntos ( jugadorRecuperado.puntos ) ;
        jugadorObjeto.setEleccion ( jugadorRecuperado.eleccion ) ;

        return jugadorObjeto ;
    }

    updateJugador ( jugador ) {

        let jugadorRecuperado = this.retrieveJugador ( jugador.id ) ;

        if ( jugadorRecuperado == null ) {
            console.log ( 'El jugador no existe' ) ;
            return null ;
        }

        let jugadorJSON = JSON.stringify ( jugador ) ;

        sessionStorage.setItem ( this.nombreId + jugador.id , jugadorJSON ) ;

        return this.retrieveJugador ( jugador.id ) ;
    }

    deleteJugador ( id ) {

        let jugadorRecuperado = this.retrieveJugador ( id ) ;

        if ( jugadorRecuperado == null ) {
            console.log ( 'El juagdor no existe' ) ;
            return null ;
        }

        sessionStorage.removeItem ( this.nombreId + id ) ;

        return this.retrieveJugador ( id ) ;

    }

}

// Inicio del sistema

