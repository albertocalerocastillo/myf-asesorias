// Prepara las fotos para la web: cada original de fotos/ se convierte a AVIF y WebP en varios
// anchos, más una miniatura borrosa que se ve mientras carga la buena. Deja la lista de fotos
// en src/data/fotos.generated.json, que es lo que lee PhotoComponent.
//
// Uso: poner las fotos originales en fotos/ (p. ej. fotos/marta.jpg) y ejecutar `npm run build`
// (o `npm run fotos`). Solo se procesan las fotos nuevas o cambiadas.
import { mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, extname, join, parse, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE_DIR = join(ROOT_DIR, 'fotos');
const OUTPUT_DIR = join(ROOT_DIR, 'public', 'fotos');
const MANIFEST_FILE = join(ROOT_DIR, 'src', 'data', 'fotos.generated.json');
const PUBLIC_PATH = '/fotos';

const SOURCE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tif', '.tiff'];
const WIDTHS = [480, 800, 1200, 1600];
const FORMATS = [
  { extension: 'avif', options: { quality: 55, effort: 5 } },
  { extension: 'webp', options: { quality: 78 } }
];
const PLACEHOLDER_WIDTH = 24;

// Retoque común para que todas las fotos tengan el mismo aire cálido, aunque vengan de móviles distintos.
const applyHouseStyle = (image) => image.rotate().modulate({ brightness: 1.02, saturation: 1.06 });

const isNewer = async (source, target) => !existsSync(target) || (await stat(source)).mtimeMs > (await stat(target)).mtimeMs;

const processPhoto = async (file) => {
  const source = join(SOURCE_DIR, file);
  const name = parse(file).name.toLowerCase().replace(/[^a-z0-9-]+/g, '-');
  const metadata = await sharp(source).metadata();
  // Las fotos de móvil en vertical guardan el giro aparte (EXIF 5-8): ancho y alto van cruzados.
  const isRotated = (metadata.orientation ?? 1) >= 5;
  const width = isRotated ? metadata.height : metadata.width;
  const height = isRotated ? metadata.width : metadata.height;
  // Los anchos estándar menores que el original, más el original (como mucho el mayor estándar).
  const usedWidths = [...new Set([...WIDTHS.filter((size) => size < width), Math.min(width, WIDTHS.at(-1))])];

  for (const size of usedWidths) {
    for (const format of FORMATS) {
      const target = join(OUTPUT_DIR, `${name}-${size}.${format.extension}`);
      if (await isNewer(source, target)) {
        await applyHouseStyle(sharp(source)).resize({ width: size }).toFormat(format.extension, format.options).toFile(target);
      }
    }
  }

  const placeholder = await applyHouseStyle(sharp(source)).resize({ width: PLACEHOLDER_WIDTH }).blur(1).webp({ quality: 40 }).toBuffer();

  return [
    name,
    {
      width,
      height,
      widths: usedWidths,
      path: `${PUBLIC_PATH}/${name}`,
      placeholder: `data:image/webp;base64,${placeholder.toString('base64')}`
    }
  ];
};

await mkdir(OUTPUT_DIR, { recursive: true });
const files = existsSync(SOURCE_DIR)
  ? (await readdir(SOURCE_DIR)).filter((file) => SOURCE_EXTENSIONS.includes(extname(file).toLowerCase()))
  : [];

const manifest = Object.fromEntries(await Promise.all(files.map(processPhoto)));
await writeFile(MANIFEST_FILE, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`Fotos preparadas: ${files.length}.`);
