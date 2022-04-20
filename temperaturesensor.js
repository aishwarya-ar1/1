$(document).ready(function() {
    var $delay = 1000,
    
        cMin = .3,
        cMax = 2.5,
    
        totalPoints = 25,
        
        $currentDisplay = $('div.amps');


    function getRandomInt(min, max) {
        let reading = (Math.random() * (max - min + 1) + min);
        return (Math.round(reading * 2) / 2)
    }
    

    
    function updateCurrent(value) {
        $currentDisplay.html(value.toFixed(1));
    }
    

    
    function updateSensorDisplayValues(d) {

        updateCurrent(d[0]);

    }

    Highcharts.setOptions({
        global: {
            useUTC: false
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false
                }
            }
        },
        tooltip: {
            enabled: false
        }
    });

    $('#sensorData').highcharts({
        chart: {
            type: 'spline',
            events: {
                load: function() {

                    var current = this.series[0];

                    var x, volts, amps, mPercent;

                    // faking sensor data
                    // data will be coming from sensors on the MKR1000
                    setInterval(function() {
                        x = (new Date()).getTime(),
                        
                            amps = getRandomInt(cMin, cMax);
                        
                        
                
                        current.addPoint([x, amps], false, true);
                    
                        
                        updateSensorDisplayValues([amps]);
                    }, $delay);
                }
            }
        },
        title: {
            text: 'Sensor Data'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 500
        },
        yAxis: [{
            title: {
                text: 'TEMEPRATURE',
                style: {
                    color: '#2b908f',
                    font: '13px sans-serif'
                }
            },
            min: 0,
            max: 15,
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        }, {
            title: {
                text: 'CURRENT',
                style: {
                    color: '#90ee7e',
                    font: '13px sans-serif'
                }
            },
            min: 0,
            max: 4,
            opposite: true,
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
    
        }],
        tooltip: {
            formatter: function() {
                var unitOfMeasurement = this.series.name === 'VOLTAGE' ? ' V' : ' A';
                return '<b>' + this.series.name + '</b><br/>' +
                    Highcharts.numberFormat(this.y, 1) + unitOfMeasurement;
            }
        },
        legend: {
            enabled: true
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: 'CURRENT',
            yAxis: 1,
            data: (function() {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                for (i = -totalPoints; i <= 0; i += 1) {
                    data.push({
                        x: time + i * $delay,
                        y: getRandomInt(.7, .7)
                    });
                }
                return data;
            }())
        }]
    });
});