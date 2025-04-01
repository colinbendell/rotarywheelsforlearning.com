/** @type {import('tailwindcss').Config} */
export default {
	theme: {
		fontFamily: {
			sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
		},
		fontSize: {
			sm: "0.8rem",
			base: "calc(1rem + .15vw)",
			xl: "calc(1.25rem + .15vw)",
			"2xl": "calc(1.563rem + .15vw)",
			"3xl": "calc(1.953rem + .15vw)",
			"4xl": "calc(2.441rem + .15vw)",
			"5xl": "calc(3.052rem + .15vw)",
		},
		extend: {
			colors: {
				"ws-blue": {
					100: "#E6F0FF",
					200: "#BFDAFF",
					300: "#99C3FF",
					400: "#4D97FE",
					500: "#006AFE",
					600: "#005FE5",
					700: "#004098",
					800: "#003072",
					900: "#00204C",
				},
			},
		},
	},
	plugins: [],
	content: ["./src/**/*.{njk,md}", "./src/**/*.svg"],
};
