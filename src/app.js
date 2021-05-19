// api key: v-XpU73oREsj-3csweid
// https://api.winnipegtransit.com/v3/stops/10064.json?api-key=v-XpU73oREsj-3csweid  --> stops

const tbody = document.querySelector('tbody');
const streets = document.querySelector('.streets');

const getData = async (url) => {
  const request = await fetch(url);
  const data = await request.json();

  console.log(data['stop-schedule']);
  // console.log(data);
  return data;
}

const renderData = async (url) => {
  tbody.innerHTML = '';
  streets.innerHTML = '';
  url = JSON.parse(url);
  const data = await getData(url);
  // console.log(data);
  // console.log(data['route-schedule'].route.number);
  data['stop-schedule'].forEach(stopData => {
    // console.log(stopData.street);
    tbody.insertAdjacentHTML('beforeend', 
      `
      <tr>
      <td>${stopData['stop-schedule'].stop.name}</td>
      <td>${stopData['stop-schedule'].stop['cross-street']}</td>
      <td>${stopData['stop-schedule'].stop.direction}</td>
      <td>${stopData['route-schedule'].route.number}</td>
      <td>02:25 PM</td>
      </tr>
    `);
  });
}

renderData('https://api.winnipegtransit.com/v3/stops/10064/schedule.json?api-key=v-XpU73oREsj-3csweid');
// getData('https://api.winnipegtransit.com/v3/stops/10064/schedule.json?api-key=v-XpU73oREsj-3csweid');

