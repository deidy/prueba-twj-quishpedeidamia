/**
 * PoderController
 *
 * @description :: Server-side logic for managing Poders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  
    crearPoder: function (req, res) {
		var parametros = req.allParams();

		if (req.method == 'POST') {
			if (parametros.nombre && parametros.danio && parametros.nivel && parametros.idHeroe) {
				Poder.create({
					nombre: parametros.nombre,
                    danio: parametros.danio,
                    nivel: parametros.nivel,
                    idHeroe: parametros.idHeroe,
				}).exec(function (error, poderCreado) {
					if (error) {
						return res.view('error', {
							error: {
								desripcion: "Falla al crear el poder",
								rawError: error,
								url: "/CrearPoder"
							}
						});
					}

					Poder.find()
						.exec(function (error, poderesEncontrados) {

							if (error) {
								res.view('error', {
									error: {
										desripcion: "Hubo un problema listando los poderes",
										rawError: error,
										url: "/ListarPoderes"
									}
								});
							}

							res.view('Poder/listarPoderes', {
								poderes: poderesEncontrados
							});
						})

				});
			} else {
				// bad Request
				return res.view('error', {
					title: 'Error',
					error: {
						descripcion: 'No envia todos los parametros',
						url: '/CrearPoder'
					}
				});
			}
		} else {
			return res.view('error', {
				title: 'Error',
				error: {
					descripcion: 'Falla en el metodo HTTP',
					url: '/CrearPoder'
				}
			});
		}

	},
	
	BorrarPoder: function (req, res) {

		var parametros = req.allParams();

		if (parametros.id) {

			Poder.destroy({
				id: parametros.id
			}).exec(function (error, PoderRemovido) {
				if (error) {
					return res.view('error', {
						error: {
							desripcion: "Tuvimos un Error Inesperado",
							rawError: error,
							url: "/ListarPoderes"
						}
					});
				}
				Poder.find()
					.exec(function (error, poderesEncontrados) {

						if (error) {
							res.view('error', {
								error: {
									desripcion: "Hubo un problema listando los poderes",
									rawError: error,
									url: "/ListarPoderes"
								}
							});
						}

						res.view('Poder/ListarPoderes', {
							poderes: poderesEncontrados
						});
					})
			})

		} else {
			return res.view('error', {
				error: {
					desripcion: "Necesitamos el ID para borrar el poder",
					rawError: "No envia ID",
					url: "/ListarPoderes"
				}
			});
		}
	},
	
	editarPoder: function (req, res) {

        var parametros = req.allParams();
		
        if (parametros.idPoder && (parametros.nombre || parametros.danio || parametros.nivel || parametros.idHeroe)) {
            
            var poderAEditar = {
                nombre: parametros.nombre,
                danio: parametros.danio,
                nivel: parametros.nivel,
                idHeroe: parametros.idHeroe
            }

            if (poderAEditar.nombre == "") {
                delete poderAEditar.nombre
            }
            if (poderAEditar.danio == "") {
                delete poderAEditar.danio
            }
            if (poderAEditar.nivel == "") {
                delete poderAEditar.nivel
            }
            if (poderAEditar.idHeroe == "") {
                delete poderAEditar.idHeroe
            }
            

            Poder.update({
                    id: parametros.idPoder
                }, poderAEditar)
                .exec(function (error, PoderRemovido) {
                    if (error) {
                        return res.view('error', {
                            error: {
                                desripcion: "Tuvimos un Error Inesperado",
                                rawError: error,
                                url: "/ListarPoderes"
                            }
                        });
                    }
                
                    Poder.find()
                        .exec(function (error, poderesEncontrados) {

                            if (error) {
                                res.view('error', {
                                    error: {
                                        desripcion: "Hubo un problema listando los poderes",
                                        rawError: error,
                                        url: "/ListarPoderes"
                                    }
                                });
                            }

                            res.view('Poder/ListarPoderes', {
                                poderes: poderesEncontrados
                            });
                        })

                })
        } else {
            return res.view('error', {
                error: {
                    desripcion: "Necesitamos que envies el ID y el nombre, daño o nivel del héroe",
                    rawError: "No envia Parametros",
                    url: "/ListarHeroes"
                }
            });
        }

    }
};