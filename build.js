// build.js
const fs = require("fs-extra");
const path = require("path");

const postsDir = path.join(__dirname, "posts");
const templatePath = path.join(__dirname, "plantilla", "template.html");
const outputDir = path.join(__dirname, "posts-html");

// Crear carpeta de salida si no existe
fs.ensureDirSync(outputDir);

// Leer plantilla base
const template = fs.readFileSync(templatePath, "utf8");

// Leer todos los archivos .md en /posts
const posts = fs.readdirSync(postsDir).filter(file => file.endsWith(".md"));

posts.forEach(file => {
  const filePath = path.join(postsDir, file);
  const content = fs.readFileSync(filePath, "utf8");

  // Generar título (a partir del nombre del archivo)
  const title = path.basename(file, ".md").replace(/-/g, " ");

  // Reemplazar los marcadores {{title}} y {{content}} en la plantilla
  const html = template
    .replace("{{title}}", title)
    .replace("{{content}}", content);

  // Crear nombre de salida: ejemplo posts/autoestima/index.html
  const postDir = path.join(outputDir, path.basename(file, ".md"));
  fs.ensureDirSync(postDir);

  fs.writeFileSync(path.join(postDir, "index.html"), html);
  console.log(`✅ Generado: ${title}`);
});

console.log("✨ Todos los artículos fueron generados correctamente.");
