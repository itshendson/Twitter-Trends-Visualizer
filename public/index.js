function initMap() {
  const myLatlng = { lat: 32.17489899141086, lng: -22.557872509725883 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: myLatlng,
  })

  let infoWindow = new google.maps.InfoWindow({
    content: "Click anywhere on the map to see what is trending!",
    position: myLatlng,
  })

  infoWindow.open(map);
  
  map.addListener("click", async (mapsMouseEvent) => {

    infoWindow.close();

    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    })

    // Get the closest woeid from Twitter API
    const lat = mapsMouseEvent.latLng.toJSON().lat;
    const lng = mapsMouseEvent.latLng.toJSON().lng;
    const api_closest = `closest/${lat},${lng}`;
    const closestResponse = await fetch(api_closest);
    const closestResponseJson = await closestResponse.json();
    const placeName = closestResponseJson[0].name;
    const placeWoeId = closestResponseJson[0].woeid;
    
    // Get the trending topics from Twitter API
    const api_trending = `/trending/${placeWoeId}`;
    const trendingResponse = await fetch(api_trending);
    const trendingResponseJson = await trendingResponse.json();
    // console.log(trendingResponseJson);

    const buildPath = (i) => {
      const responsePath = trendingResponseJson[0].trends[i];
      return `<a href=${responsePath.url} target='_blank' rel="noopener noreferrer"><b>${responsePath.name}</b></a> - Popularity: ${responsePath.tweet_volume} <br>`;
    }

    const infoWindowContent = 
      `<div id="info-div">
      <h4>${placeName}</h4>
      ${buildPath(0)}
      ${buildPath(1)}
      ${buildPath(2)}
      ${buildPath(3)}
      ${buildPath(4)}
      ${buildPath(5)}
      ${buildPath(6)}
      ${buildPath(7)}
      ${buildPath(8)}
      ${buildPath(9)}
      ${buildPath(10)}
      ${buildPath(11)}
      ${buildPath(12)}
      ${buildPath(13)}
      ${buildPath(14)}
      </div>`

    infoWindow.setContent(
      infoWindowContent
    );

    infoWindow.open(map);
  }, {passive: true})
}