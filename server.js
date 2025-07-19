import express from 'express';
import path, {dirname} from "path";
import { fileURLToPath } from "url";
import routes from "./routes.js";

// Constante de ambiente
const PORT = 3030;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configura os views no servidor
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Configura rotas
app.use(routes);

app.listen(PORT, () => {
  console.log(`Acessar http://localhost:${PORT}`)
})