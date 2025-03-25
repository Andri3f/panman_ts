<template>
	<div class="drone-field">
		<span class="drone-field__plane" ref="planeItem">
			<font-awesome-icon :icon="['fas', 'jet-fighter-up']" />
		</span>
		<img class="drone-field__image" src="/images/field.jpg" alt="" />
		<button class="drone-field__button" :class="{ active: isFlightStarted }" @click="onFlyAction">
			{{ getButtonText }}
		</button>
	</div>
</template>

<script setup lang="ts">
interface FlightData {
	timestamp: number
	speed: string
	direction: string
}
const isFlightStarted = ref(false)
const flightData = ref<FlightData[]>([])
const planeItem = ref<HTMLElement | null>(null)
const getButtonText = computed(() => (isFlightStarted.value ? "Скасувати" : "Почати"))
async function animateFlight() {
	if (!planeItem.value || flightData.value.length === 0) return
	let totalDuration = 20
	let frameTime = totalDuration / flightData.value.length
	for (const step of flightData.value) {
		if (!isFlightStarted.value) return
		const speed = parseFloat(step.speed)
		const direction = parseFloat(step.direction)
		const directionInRadians = (direction * Math.PI) / 180
		const speedPxPerSec = (speed * 1000) / 3600
		const deltaX = speedPxPerSec * Math.sin(directionInRadians)
		const deltaY = -speedPxPerSec * Math.cos(directionInRadians)
		if (planeItem.value) {
			planeItem.value.style.transform = `
        translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px))
        rotate(${direction}deg)
      `
		}
		await new Promise((resolve) => setTimeout(resolve, frameTime * 1000))
	}
	planeItem.value.style.transform = `
        translate(calc(-50%), calc(-50%))
        rotate(0)
      `
	isFlightStarted.value = false
}
function onFlyAction() {
	isFlightStarted.value = !isFlightStarted.value
	if (!isFlightStarted.value) {
		if (planeItem.value) {
			planeItem.value.style.transform = `
        translate(calc(-50%), calc(-50%))
        rotate(0)
      `
		}
	} else {
		animateFlight()
	}
}

onMounted(async () => {
	try {
		const res = await fetch("/data/flightData.json")
		if (!res.ok) {
			throw new Error("Network error")
		}
		flightData.value = await res.json()
	} catch (error) {
		throw new Error("Error getting data")
	}
})
</script>

<style lang="scss" scoped>
.drone-field {
	position: relative;
	height: 100vh;
	&__plane {
		position: relative;
		z-index: 100;
		color: #28baba;
		background-color: #000000aa;
		padding: 5px;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 5px;
		transform-origin: center;
		transition: transform 0.5s linear;
	}
	&__image {
		z-index: -1;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}
	&__button {
		background-color: #d8d819cf;
		padding: 10px 20px;
		text-transform: uppercase;
		line-height: 1.2;
		border-radius: 5px;
		transition: background 0.3s ease 0s;
		&:hover {
			background-color: #94940f;
		}
		position: absolute;
		top: 70%;
		left: 50%;
		transform: translate(-50%, 0);
		&.active {
			color: #fff;
			background-color: #444444d4;
			@media (any-hover: hover) {
				&:hover {
					background-color: #333333d4;
				}
			}
		}
	}
}
</style>
