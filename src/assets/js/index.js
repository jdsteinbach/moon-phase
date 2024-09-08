import { drawPlanetPhase } from './planet_phase'

const now = new Date()
const date = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`

const API_KEY = 'a90585510384409995e181449221304'

const init = async () => {

  const IP = await fetch('https://api.ipify.org?format=json')
    .then(r => r.json())
    .then(data => data.ip)
    .catch(e => reject(e))

  const moon = await fetch(`https://api.weatherapi.com/v1/astronomy.json?key=${API_KEY}&q=${IP}&dt=${date}`)
    .then(moon => moon.json())
    .catch(e => reject(e))

  // document.documentElement.style.setProperty('--phase', `"${moon.astronomy.astro.moon_phase}"`)
  // document.documentElement.style.setProperty('--illumination', moon.astronomy.astro.moon_illumination)
  document.getElementById('phase-name').innerHTML = `${moon.astronomy.astro.moon_phase}: ${moon.astronomy.astro.moon_illumination}%`

  console.log({drawPlanetPhase})
  drawPlanetPhase(
    document.getElementById('moon'),
    (moon.astronomy.astro.moon_illumination / 100),
    true,
    {
      shadowColour: 'var(--shadow-color)',
      lightColour: 'var(--light-color)',
      diameter: 300,
      blur: 0
    }
  )
}

init()
