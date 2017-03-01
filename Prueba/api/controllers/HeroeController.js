/**
 * HeroeController
 *
 * @description :: Server-side logic for managing Heroes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    
	crearHeroe: function (req, res) {

        if (req.method == "POST") {
            
            var parametros = req.allParams();
            
            if (parametros.nombre) {
                
                var heroeCrear = {
                    nombre: parametros.nombre,
                    castillo: parametros.castillo,
                    nivel: parametros.nivel,
                    imagen: parametros.imagen
                }
                
                if (parametros.nombre == "") {
                    delete heroeCrear.nombre;
                }
                
                if (parametros.castillo == "") {
                    delete heroeCrear.castillo;
                }
                
                if (parametros.nivel == "") {
                    delete heroeCrear.nivel;
                }
                
                if (parametros.imagen == "") {
                    delete heroeCrear.imagen;
                }
                
                //Todos los métodos son con el modelo
                Heroe.create(heroeCrear).exec(function (err, heroeCreado) {
                    if (err) {
                        return res.view('error', {
                            error: {
                                descripcion: "Fallo al crear el héroe"
                                , rawError: err
                                , url: "/crearHeroe"
                            }
                        });
                    }
                    
                    Heroe.find().exec(function (errorIndefinido, heroesEncontrados) {
                        
                        if (errorIndefinido) {
                            res.view('error', {
                                error: {
                                    descripcion: "Hubo un problema cargando los héroes"
                                    , rawError: errorIndefinido
                                    , url: "/ListarHeroes"
                                }
                            });
                        }
                        
                        res.view('Heroe/ListarHeroes', {
                            heroes: heroesEncontrados
                        });
                    })
                })
            }
            else {
                return res.view('error', {
                    error: {
                        descripcion: "Llena todos los parámetros"
                        , rawError: "Fallo en envío de parámetros"
                        , url: "/crearHeroe"
                    }
                });
            }
        }
        else {
            return res.view('error', {
                error: {
                    descripcion: "Error en el uso del Método HTTP"
                    , rawError: "HTTP Inválido"
                    , url: "/crearHeroe"
                }
            });
        }
    },
    
    borrarHeroe: function (req, res) {
        
        var parametros = req.allParams();
        
        if (parametros.id) {
            
            Heroe.destroy({
                id: parametros.id
            }).exec(function (errorInesperado, heroeRemovido) {
                
                if (errorInesperado) {
                    return res.view('error', {
                        error: {
                            descripcion: "Tuvimos un Error Inesperado"
                            , rawError: errorInesperado
                            , url: "/ListarHeroes"
                        }
                    });
                }
                
                Heroe.find().exec(function (err, heroesEncontrados) {
                    
                    if (err) {
                        res.view('error', {
                            error: {
                                descripcion: "Hubo un problema cargando los héroes"
                                , rawError: error
                                , url: "/ListarHeroes"
                            }
                        });
                    }
                    res.view('Heroe/ListarHeroes', {
                        heroes: heroesEncontrados
                    });
                })
            })
        }
        else {
            return res.view('error', {
                error: {
                    descripcion: "Necesitamos el id para borrar el héroe"
                    , rawError: "No envía ID"
                    , url: "/ListarHeroes"
                }
            });
        }
    },
    
    editarHeroe: function (req, res) {

        var parametros = req.allParams();

        if (parametros.idHeroe && (parametros.nombre || parametros.castillo || parametros.nivel || parametros.imagen)) {
            
            var heroeAEditar = {
                nombre: parametros.nombre,
                castillo: parametros.castillo,
                nivel: parametros.nivel,
                imagen: parametros.imagen
            }

            if (heroeAEditar.nombre == "") {
                delete heroeAEditar.nombre
            }
            if (heroeAEditar.castillo == "") {
                delete heroeAEditar.castillo
            }
            if (heroeAEditar.nivel == "") {
                delete heroeAEditar.nivel
            }
            if (heroeAEditar.imagen == "") {
                delete heroeAEditar.imagen
            }

            Heroe.update({
                    id: parametros.idHeroe
                }, heroeAEditar)
                .exec(function (errorInesperado, heroeRemovido) {
                    if (errorInesperado) {
                        return res.view('error', {
                            error: {
                                desripcion: "Tuvimos un Error Inesperado",
                                rawError: errorInesperado,
                                url: "/ListarHeroes"
                            }
                        });
                    }
                
                    Heroe.find()
                        .exec(function (errorIndefinido, heroesEncontrados) {

                            if (errorIndefinido) {
                                res.view('error', {
                                    error: {
                                        desripcion: "Hubo un problema cargando los héroes",
                                        rawError: errorIndefinido,
                                        url: "/ListarHeroes"
                                    }
                                });
                            }

                            res.view('Heroe/ListarHeroes', {
                                heroes: heroesEncontrados
                            });
                        })
                })

        } else {
            return res.view('error', {
                error: {
                    desripcion: "Necesitamos que envies el ID y el nombre",
                    rawError: "No envia Parametros",
                    url: "/ListarHeroes"
                }
            });
        }

    }
};

