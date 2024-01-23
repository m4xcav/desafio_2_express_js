import React from 'react'

const ListCanciones = () => {
  return (
    <div id="ListaCanciones">
    <hr />
    <hr />
    <h2>Tabla de canciones &#127908;</h2>

    <div className="container pt-5 w-75">
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Canción</th>
            <th scope="col">Artista</th>
            <th scope="col">Tono</th>
            <th scope="col">-</th>
          </tr>
        </thead>
        <tbody id="cuerpo"></tbody>
      </table>
    </div>
  </div>
  )
}

export default ListCanciones;