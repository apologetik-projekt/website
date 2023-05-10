import Plausible from 'plausible-tracker'

const client = Plausible({
  domain: 'apologetik-projekt.de',
	apiHost: 'https://apologetik-projekt.de',
})

export default client
export const trackPageview = client.trackPageview
export const trackEvent = client.trackEvent