// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	devtools: { enabled: true },
	css: ["@/assets/styles/index.scss"],
	plugins: ["@/plugins/fontawesome.ts"],
	server: {
		port: process.env.PORT || 3000,
		host: "0.0.0.0",
	},
})
