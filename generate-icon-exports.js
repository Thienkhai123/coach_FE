const fs = require("fs");
const path = require("path");

const iconsDir = path.join(__dirname, "src/components/icons");
const indexPath = path.join(iconsDir, "index.ts");

console.log("Icons directory:", iconsDir);
console.log("Index file path:", indexPath);

fs.readdir(iconsDir, (err, dirs) => {
	if (err) {
		console.error("Error reading icons directory:", err);
		return;
	}

	const files = dirs
		.filter((dir) => {
			const dirPath = path.join(iconsDir, dir);
			return (
				fs.statSync(dirPath).isDirectory() &&
				fs.existsSync(path.join(dirPath, "index.tsx"))
			);
		})
		.map((dir) => `${dir}/index.tsx`);

	console.log("Found icon files:", files);

	if (files.length === 0) {
		console.log(
			"No icon files found. Please check the directory structure and ensure there are index.tsx files in subdirectories.",
		);
		return;
	}

	const exports = files
		.map((file) => {
			const iconName = file.split("/")[0];
			const exportName =
				iconName.charAt(0).toUpperCase() +
				iconName.slice(1).replace(/-/g, "") +
				"Icon";
			return `export { default as ${exportName} } from './${iconName}';`;
		})
		.join("\n");

	console.log("Exports content:", exports);

	try {
		fs.writeFileSync(indexPath, exports, "utf-8");
		console.log(`Generated ${indexPath} with ${files.length} icons.`);
	} catch (writeErr) {
		console.error("Error writing to index.ts:", writeErr);
	}
});
