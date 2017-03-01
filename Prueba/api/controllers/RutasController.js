/**
 * RutasController
 *
 * @description :: Server-side logic for managing Rutas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    
	home: function (req, res) {
        return res.view('home');
    },
    
    crearHeroe: function (req, res) {
        return res.view('Heroe/crearHeroe');
    },
    
    error: function (req, res) {
        return res.view('error', {
            error: {
                desripcion: "Usted esta por error en esta Ruta. Vaya a Inicio",
                rawError: "Ruta equivocada",
                url: "/Inicio"
            }
        });
    },
    
    listarHeroes: function (req, res) {

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
    },

    editarHeroe: function (req, res) {

        var parametros = req.allParams();

        if (parametros.id) {

            Heroe.findOne({
                id: parametros.id
            }).exec(function (errorInesperado, heroeEncontrado) {
                if (errorInesperado) {
                    return res.view('error', {
                        error: {
                            desripcion: "Error Inesperado",
                            rawError: errorInesperado,
                            url: "/ListarHeroes"
                        }
                    });
                }
                if(heroeEncontrado){
                     return res.view("Heroe/editarHeroe",{
                         heroeAEditar:heroeEncontrado
                     });
                }else{
                    return res.view('error', {
                        error: {
                            desripcion: "El heroe con id: "+parametros.id+" no existe.",
                            rawError: "No existe el heroe",
                            url: "/ListarHeroes"
                        }
                    });
                }
            })
        } else {

            return res.view('error', {
                error: {
                    desripcion: "No ha enviado el parametro ID",
                    rawError: "Faltan Parametros",
                    url: "/ListarHeroes"
                }
            });

        }
    },
    
//    Poder
    
    crearPoder: function (req, res) {
		Heroe.find().exec(function (error, heroesEncontrados) {
			if (error) return res.serverError();
			return res.view('Poder/crearPoder', {
				heroes: heroesEncontrados
			});
		});

	},

	listarPoderes: function (req, res) {
		Poder.find()
			.exec(function (error, poderesEncontrados) {

				if (error) {
					return res.view('error', {
						error: {
							descripcion: "Hubo un problema listando los poderes",
							rawError: error,
							url: "/ListarPoderes"
						}
					});
				}

				res.view('Poder/listarPoderes', {
					poderes: poderesEncontrados
				})

			})
	},

    editarPoder: function (req, res) {

		var parametros = req.allParams();

		if (parametros.id) {
			Poder.findOne({
				id: parametros.id
			}).exec(function (error, poderEncontrado) {
				if (error) {
					return res.view('error', {
						error: {
							descripcion: 'Fallo al buscar el poder',
							rawError: error,
							url: '/CrearPoder'
						}
					});
				}
                
				Heroe.find().exec(function (error, heroesEncontrados) {
					if (error) {
						return res.view('error', {
							title: 'Error',
							error: {
								descripcion: 'Fallo al buscar el heroe',
								rawError: error,
								url: '/CrearHeroe'
							}
						});
					}

					return res.view('Poder/editarPoder', {
						poderAEditar: poderEncontrado,
						heroes: heroesEncontrados
					})
				});

			});

		} else {
			return res.view('error', {
				error: {
					desripcion: "No ha enviado el parametro ID",
					rawError: "Faltan Parametros",
					url: "/ListarPoderes"
				}
			});
		}

	}
};

