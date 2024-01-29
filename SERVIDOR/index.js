import express from "express";
import { writeFile, readFile } from "node:fs/promises";
import bodyParser from "body-parser";
import { nanoid } from "nanoid";
import cors from "cors";
import path from "path"; 
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  const indexPath = path.join(__dirname, "../proyecto/index.html");
  res.sendFile(indexPath);
});

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

//obtiene cancion por el ID y devuelve html con los datos y el boton de editar 
//codigo HTML
const getsongforedit = (song) => {
  return `
    <form>
      <input type="text" id="fcancion"  placeholder="${song.cancion || ''}" value="${song.cancion || ''}" />
      <input type="text" id="fartista" placeholder="${song.artista || ''}" value="${song.artista || ''}" />
      <input type="text" id="ftono"  placeholder="${song.tono || ''}"  value="${song.tono || ''}"/>
      <button type="button" class="btn btn-primary" id="editar" onclick="editarCancion(${song.id});">Editar</button>
    </form>
  `;
};

app.get("/formulario/:id", async (req, res) => {
  const id  = req.params.id; 
  const canciones = await getcanciones(); 
  const song = canciones.find((song) => song.id.toString() === id.toString());
  const htmlcondata = getsongforedit(song);
  res.send(htmlcondata);
});
//POST agregar nueva cancion 
app.post("/canciones", async (req, res) => {
  const formSong  = req.body; 
  const {id, cancion, artista, tono } = formSong;
  const newSong = {
    id: id,
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
  const song = canciones.find((song) => song.id.toString() === id.toString());

  if (!song) {
    res.status(404).json({ message: "song not found" });
  }
  const formSong  = req.body;  
  canciones = canciones.map((song) => {
    if (song.id == id) {
      return { ...song, ...formSong }; 
    }
    return song;
  });
  await writeFile("repertorio.json", JSON.stringify(canciones));

  res.json(canciones);
});

//DELETE cancion y devuelve el Array actualizado
app.delete("/canciones/:id", async (req, res) => {
  const id = req.params.id;
  console.log("el ID recivido es: " + id);
  let canciones = await getcanciones();
  const indexToRemove = canciones.findIndex((song) => song.id.toString() === id.toString());

  if (indexToRemove === -1) {
    res.status(404).json({ message: "song not found" });
    return;
  }
  canciones.splice(indexToRemove, 1);
  try {
    await writeFile("repertorio.json", JSON.stringify(canciones));
    res.json(canciones);
  } catch (error) {
    console.error("Error al escribir en el archivo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(5000, () => {
  console.log("Example app listening on port 5000");
});