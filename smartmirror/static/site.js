"use strict;"


var app = new Vue({
  el: '#app',
  delimiters: ['((', '))'],
  data: {
    time: null,
    departures: [],
  },
  methods: {
    updateTime: function() {
      this.time = moment().format('H:mm:ss');
    },
    getDepartures() {
      axios.get('/vrr')
        .then((response) => {
          data = response.data;
          data['departures'].forEach((dep, i, array) => {
            array[i]['timestamp'] = moment(dep['timestamp']);
          })
          this.departures = data['departures'];
        })
    },
  },
  created: function() {
    this.updateTime();
    this.getDepartures();
  },
})


window.setInterval(app.updateTime, 1000);
window.setInterval(app.getDepartures, 60000);
