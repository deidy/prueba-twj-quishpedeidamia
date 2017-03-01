/**
 * Heroe.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
        nombre: {
            type: 'string',
            required: true
        },
        castillo: {
            type: 'string',
            required: true
        },
        nivel:{
          type:'integer',
          required:true
        },
        imagen:{
          type:'string',
          required:true
        },
        poderes: {
            collection: 'Poder',
            via: 'idHeroe'
        }
  }
};

