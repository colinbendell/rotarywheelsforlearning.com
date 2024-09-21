import postcss from "postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

import tailwindConfig from "./tailwind.config.js";

export default async (eleventyConfig) => {
	// eleventyConfig.addPassthroughCopy("src/style.css");
	eleventyConfig.addPassthroughCopy("src/script.js");
	eleventyConfig.setDataDeepMerge(true);

	eleventyConfig.addNunjucksAsyncFilter("postcss", async (cssCode, done) => {
		try {
			const processor = postcss([tailwindcss(tailwindConfig), autoprefixer()]);
			const result = await processor.process(cssCode);
			done(null, result.css);
		} catch (e) {
			done(e, null);
		}
	});

	eleventyConfig.addWatchTarget("src/**/*.css");

	return {
		dir: {
			input: "src",
			output: "build",
			data: "_data",
		},
	};
};
