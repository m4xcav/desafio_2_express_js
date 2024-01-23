import express from "express";
import { writeFile, readFile } from "node:fs/promises";
import bodyParser from "body-parser";
import { nanoid } from "nanoid";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

// GET Función para obtener las canciones
//extrae la lista completa de canciones
const getcanciones = async () => {
  const fsResponse = await readFile("repertorio.json", "utf-8");
  const canciones = JSON.parse(fsResponse);
  return canciones;
};
//devuelve la lista completa las canciones 
app.get("/canciones", async (req, res) => {
  const canciones = await getcanciones(); 
  res.json(canciones);
});

//Obtiene la cancion por el ID
app.get("/canciones/:id", async (req, res) => {
  const id = req.params.id;
  const canciones = await getcanciones(); 
  const song = canciones.find((song) => song.id === id);

  if (!song) {
    res.status(404).json({ message: "song not found" });
  }
  res.json(song);
});

//POST agregar nueva cancion 
app.post("/canciones", async (req, res) => {
  const { formSong } = req.body; //obtiene los datos del formulario usar useState con [formSong, setFormSong]  para enlazar
  const { cancion, artista, tono } = formSong;
  const newSong = {
    id: nanoid(),
    cancion,
    artista,
    tono,
  };
  let canciones = await getcanciones();
  canciones.push(newSong);
  await writeFile("repertorio.json", JSON.stringify(canciones));
  res.status(201).json(newSong);
});

//PUT Editar cancion y devuelve el Array actualizado
app.put("/canciones/:id", async (req, res) => {
  const id = req.params.id;

  let canciones = await getcanciones();
  const song = canciones.find((song) => song.id === id);

  if (!song) {
    res.status(404).json({ message: "song not found" });
  }

  const { formSong } = req.body;  // Aquí se usa la destructuración para obtener el objeto `formSong` del 
  //cuerpo de la solicitud, poner un useState con [formSong, setFormSong]  para enlazar

  // Actualizar la canción con el contenido de `formSong`
  canciones = canciones.map((song) => {
    if (song.id === id) {
      return { ...song, ...formSong }; //reemplaza el contenido del array por el nuevo de FormSong
    }
    return song;
  });
  await writeFile("repertorio.json", JSON.stringify(canciones));

  res.json(canciones);
});

//DELETE cancion y devuelve el Array actualizado
app.delete("/canciones/:id", async (req, res) => {
  const id = req.params.id;

  let canciones = await getcanciones();
  const song = canciones.find((song) => song.id === id);

  if (!song) {
    res.status(404).json({ message: "song not found" });
  }

  canciones = canciones.filter((song) => song.id !== id);

  await writeFile("repertorio.json", JSON.stringify(canciones));
  res.json(canciones);
});

app.listen(5000, () => {
  console.log("Example app listening on port 5000");
});