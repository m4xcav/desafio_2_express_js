import React from 'react'

const AgregarCancion = () => {
  return (
    <div id="AgregarCancion">
    <h2 className="pt-3">&#119070; Mi repertorio &#119070;</h2>

    <div className="container pt-5 w-50">
      <div>
        <div className="form-group row">
          <label htmlFor="name" className="col-sm-2 col-form-label">Canción:</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="cancion" defaultValue="A dios le pido" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="email" className="col-sm-2 col-form-label">Artista: </label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="artista" defaultValue="Juanes" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="rut" className="col-sm-2 col-form-label">Tono:</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="tono" defaultValue="Em" />
          </div>
        </div>
        <button onClick="nuevaCancion()" id="agregar" className="m-auto btn btn-success">
          Agregar
        </button>
        <button onClick="editarCancion()" id="editar" className="m-auto btn btn-info">
          Editar
        </button>
      </div>
    </div>
  </div>
  )
}

export default AgregarCancion;