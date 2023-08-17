/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				base: "#2563eb",
        		"base-light": "#93c5fd",
        		"base-dark": "#009FE0",
			}
		},
	},
	plugins: [],
}
