import style from './styles.css'

const batteryJuice = document.querySelector('.battery-juice')
const batteryStatus = document.querySelector('.battery-status')
const batteryPercentage = document.querySelector('.battery-percentage')
const logo = document.querySelector('.logo')
const redBatteryJuice = getComputedStyle(
  document.documentElement
).getPropertyValue('--red-battery-juice')
const orangeBatteryJuice = getComputedStyle(
  document.documentElement
).getPropertyValue('--orange-battery-juice')
const yellowBatteryJuice = getComputedStyle(
  document.documentElement
).getPropertyValue('--yellow-battery-juice')
const greenBatteryJuice = getComputedStyle(
  document.documentElement
).getPropertyValue('--green-battery-juice')

navigator.getBattery().then((battery) => {
  updateBatteryJuice(battery.level * 100)
  updateBatteryInfo(battery)
  battery.addEventListener('chargingchange', () => {
    updateBatteryInfo(battery)
  })
  battery.addEventListener('levelchange', () => {
    updateBatteryInfo(battery)
    updateBatteryJuice(battery.level * 100)
  })
})

function updateBatteryJuice(batteryLevel) {
  document.documentElement.style.setProperty(
    '--battery-level',
    `${batteryLevel}%`
  )
  if (batteryLevel > 0 && batteryLevel <= 20) {
    batteryJuice.style.background = redBatteryJuice
  } else if (batteryLevel > 20 && batteryLevel <= 50) {
    batteryJuice.style.background = orangeBatteryJuice
  } else if (batteryLevel > 50 && batteryLevel <= 80) {
    batteryJuice.style.background = yellowBatteryJuice
  } else {
    batteryJuice.style.background = greenBatteryJuice
  }
}

function updateBatteryInfo(battery) {
  const batteryLevel = battery.level * 100
  batteryPercentage.innerText = `${batteryLevel}%`
  if (battery.charging) {
    batteryStatus.innerText = 'Charging'
    logo.innerHTML = `<i class="fa-solid fa-charging-station"></i>`
  } else if (batteryLevel > 0 && batteryLevel <= 20) {
    batteryStatus.innerText = 'Battery low, time to charge'
    logo.innerHTML = `<i class="fa-solid fa-battery-quarter"></i>`
    logo.style.color = redBatteryJuice
  } else if (batteryLevel > 20 && batteryLevel <= 50) {
    batteryStatus.innerText = 'Not Charging'
    logo.innerHTML = `<i class="fa-solid fa-battery-half"></i>`
    logo.style.color = orangeBatteryJuice
  } else if (batteryLevel > 50 && batteryLevel <= 80) {
    batteryStatus.innerText = 'Not Charging'
    logo.innerHTML = `<i class="fa-solid fa-battery-three-quarters"></i>`
    logo.style.color = yellowBatteryJuice
  } else if (batteryLevel > 80 && batteryLevel < 100) {
    batteryStatus.innerText = 'Almost full'
    logo.innerHTML = `<i class="fa-solid fa-battery-three-quarters"></i>`
    logo.style.color = greenBatteryJuice
  } else {
    batteryStatus.innerText = 'Full'
    logo.innerHTML = `<i class="fa-solid fa-battery-full"></i>`
    logo.style.color = greenBatteryJuice
  }
}
