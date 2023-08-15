/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				base: "#883aeb",
        		"base-light": "#e0ccfa",
        		"base-dark": "#310a65",
			}
		},
	},
	plugins: [],
}
