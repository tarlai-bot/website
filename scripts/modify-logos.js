import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function modifyLogos() {
  const logos = [
    {
      name: "La Casa Pasta",
      path: path.join(__dirname, "../public/images/dining/laCasaPasta/lacasapasta_Logo.svg"),
      type: "svg",
    },
    {
      name: "Poshak",
      path: path.join(__dirname, "../public/images/dining/poshak/Poshak_Logo.png"),
      type: "png",
    },
  ];

  for (const logo of logos) {
    try {
      console.log(`\nProcessing ${logo.name}...`);

      if (logo.type === "svg") {
        // For SVG, modify the file content directly
        let svgContent = fs.readFileSync(logo.path, "utf-8");

        // Replace white colors (#fff, white) with black (#000, black)
        svgContent = svgContent
          .replace(/fill:\s*#fff/g, "fill: #000")
          .replace(/fill:\s*white/gi, "fill: black")
          .replace(/fill="#fff"/g, 'fill="#000"')
          .replace(/fill="white"/gi, 'fill="black"')
          .replace(/stroke:\s*#fff/g, "stroke: #000")
          .replace(/stroke:\s*white/gi, "stroke: black")
          .replace(/stroke="#fff"/g, 'stroke="#000"')
          .replace(/stroke="white"/gi, 'stroke="black"');

        // Backup original
        const backupPath = logo.path.replace(".svg", "_original.svg");
        if (!fs.existsSync(backupPath)) {
          fs.copyFileSync(logo.path, backupPath);
          console.log(`✓ Backed up original to: ${path.basename(backupPath)}`);
        }

        // Save modified SVG
        fs.writeFileSync(logo.path, svgContent);
        console.log(`✓ Modified ${logo.name} - Changed white to black`);
      } else if (logo.type === "png") {
        // For PNG, use sharp to convert to black
        const backupPath = logo.path.replace(".png", "_original.png");

        // Backup original
        if (!fs.existsSync(backupPath)) {
          fs.copyFileSync(logo.path, backupPath);
          console.log(`✓ Backed up original to: ${path.basename(backupPath)}`);
        }

        // Read the image
        const image = sharp(logo.path);
        const metadata = await image.metadata();

        // Convert to black by inverting if the logo is mostly white/light
        // This creates a black version while maintaining transparency
        await image
          .negate() // Invert colors (white becomes black)
          .toFile(logo.path.replace(".png", "_temp.png"));

        // Replace original with modified
        fs.renameSync(logo.path.replace(".png", "_temp.png"), logo.path);
        console.log(`✓ Modified ${logo.name} - Inverted colors (white to black)`);
      }
    } catch (error) {
      console.error(`✗ Error processing ${logo.name}:`, error.message);
    }
  }

  console.log("\n✅ Logo modification complete!");
  console.log("Original files backed up with '_original' suffix if they didn't exist before.");
}

modifyLogos();
