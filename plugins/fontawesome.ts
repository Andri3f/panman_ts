import { defineNuxtPlugin } from "#app"
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { far } from "@fortawesome/free-regular-svg-icons"

// Додаємо іконки до бібліотеки
library.add(fas, fab, far)

export default defineNuxtPlugin((nuxtApp) => {
	// Зареєструйте компонент FontAwesomeIcon глобально
	nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon)
})
