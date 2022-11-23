const fs = require("fs");
const path = require("path");

const PATH_ROOT = path.resolve(__dirname, "..");

(function main() {
	createEntry();
	createDefinition();
})();

function getModuleNames() {
	return fs.readdirSync(path.resolve(PATH_ROOT, "src")).map(file => file.replace(/\.[^\.]+$/, ""));
}

function createEntry() {
	console.log("Making root index.js...");
	let data = "module.exports = {\n";
	getModuleNames().forEach(name => data += `\t${name}: require("./${name}"),\n`);
	data += "};\n";
	fs.writeFileSync(path.resolve(PATH_ROOT, "index.js"), data);
	console.log("index.js was successfully created");
}

function createDefinition() {
	console.log("Making root index.d.ts...");
	let data = "";
	getModuleNames().forEach(name => data += `export * as ${name} from "./${name}";\n`);
	fs.writeFileSync(path.resolve(PATH_ROOT, "index.d.ts"), data);
	console.log("index.d.ts was successfully created");
}
