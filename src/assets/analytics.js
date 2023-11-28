function ana(data) {
  fetch('https://eok255xjsca4nb2.m.pipedream.net', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(() => null)
    .catch((error) => {
      console.error('Error sending data:', error)
    })
}

function tpv() {
  const analyticsData = {
    event: 'page_view',
    url: window.location.href,
    timestamp: new Date().toISOString(),
    useragent: navigator.userAgent,
    dnt: navigator.doNotTrack == 1 ? true : false
  }

  ana(analyticsData)
}

// Track page view on page load
tpv()
