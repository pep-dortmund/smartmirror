"use strict;"


var app = new Vue({
  el: '#app',
  delimiters: ['((', '))'],
  data: {
    time: moment(),
    departures: [],
    cities: ['Dortmund', 'Essen', 'Bochum'],
    weather: {},
    publisher: 'die-zeit',
    news: [],
  },
  methods: {
    updateTime: function() {
      this.time = moment();
    },
    getDepartures() {
      axios.get('/vrr')
        .then((response) => {
          let data = response.data;
          data['departures'].forEach((dep, i, array) => {
            array[i]['timestamp'] = moment(dep['timestamp']);
          })
          this.departures = data['departures'];
        })
    },
    getWeather() {
      this.cities.forEach((city) => {
        console.log(city);
        axios.get('/weather/'+city)
          .then((response) => {
            let data = response.data['weather'];
            this.weather[city] = {};
            this.weather[city]['temperature'] = data['main']['temp'];
            this.weather[city]['icon'] = '/static/images/' + data['weather'][0]['icon'] + '_inv_bw.png';
          })
      });
    },
    getNews() {
    axios.get('/news/'+this.publisher)
      .then((response) => {
        this.news = response.data['news']['articles'];
      })
    }
  },
  created: function() {
    this.getDepartures();
    this.getWeather();
    this.getNews();
  },
  watch: {
    cities: function (val) {
      this.weather = {};
      this.getWeather();
    },
  }
})


window.setInterval(app.updateTime, 1000);
window.setInterval(app.getDepartures, 60000);
window.setInterval(app.getWeather, 60000);
