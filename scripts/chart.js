var classicOptions = {
    title: 'Average Temperatures and Daylight in Iceland Throughout the Year',
    width: 900,
    height: 500,
    // Gives each series an axis that matches the vAxes number below.
    series: {
      0: {targetAxisIndex: 0},
      1: {targetAxisIndex: 1}
    },
    vAxes: {
      // Adds titles to each axis.
      0: {title: 'Temps (Celsius)'},
      1: {title: 'Daylight'}
    },
    hAxis: {
      ticks: [new Date(2014, 0), new Date(2014, 1), new Date(2014, 2), new Date(2014, 3),
              new Date(2014, 4),  new Date(2014, 5), new Date(2014, 6), new Date(2014, 7),
              new Date(2014, 8), new Date(2014, 9), new Date(2014, 10), new Date(2014, 11)
             ]
    },
    vAxis: {
      viewWindow: {
        max: 30
      }
    }
  };
