$.getJSON('data/inversion.json', function (data) {
    var inversionDiv = document.getElementById('inversion-i-chart');
    var myChart = echarts.init(inversionDiv);

    myChart.hideLoading();
    var itemStyle = {
        opacity: 0.8
    };
    var sizeFunction = function (x) {
        return Math.sqrt(x);
    };
    // Schema:
    var schema = [{
            name: 'Inversion',
            index: 0,
            text: 'Inversión',
            unit: 'Millones de pesos',
        },
        {
            name: 'Poblacion',
            index: 1,
            text: 'Población',
            unit: 'Millones de personas',
        },

        {
            name: 'Country',
            index: 3,
            text: 'Provincia',
            unit: ''
        }
    ];
    option = {
        baseOption: {
            timeline: {
                axisType: 'category',
                orient: 'vertical',
                autoPlay: true,
                inverse: true,
                playInterval: 3000,
                left: null,
                right: 0,
                top: 20,
                bottom: 20,
                width: 55,
                height: null,
                symbol: 'none',
                checkpointStyle: {
                    borderWidth: 2
                },
                controlStyle: {
                    showNextBtn: false,
                    showPrevBtn: false
                },
                data: []
            },
            title: [{
                    text: data.timeline[0],
                    textAlign: 'center',
                    left: '63%',
                    top: '55%',
                    textStyle: {
                        fontSize: 100
                    }
                },
                {
                    text: 'Inversión por Provincia',
                    left: 'center',
                    top: 10,
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: 20
                    }
                }
            ],
            tooltip: {
                padding: 5,
                borderWidth: 1,
                formatter: function (obj) {
                    var value = obj.value;
                    // prettier-ignore
                    return schema[2].text + '：' + value[2] + '<br>' +
                        schema[1].text + '：' + value[1] + " " + schema[1].unit + '<br>' +
                        schema[0].text + '：' + value[0] + " " + schema[0].unit + '<br>';
                    // schema[2].text + '：' + value[2] + '<br>';
                }
            },
            grid: {
                top: 100,
                containLabel: true,
                left: 30,
                right: '110'
            },
            xAxis: {
                type: 'log',
                name: 'Inversión',
                max: 10000,
                min: 50,
                nameGap: 25,
                nameLocation: 'middle',
                nameTextStyle: {
                    fontSize: 18
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    formatter: '${value} M'
                }
            },
            yAxis: {
                type: 'value',
                name: 'Población',
                max: 3000000,
                nameTextStyle: {
                    fontSize: 18
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    formatter: '{value}'
                }
            },
            visualMap: [{
                show: false,
                dimension: 2,
                categories: data.counties,
                inRange: {
                    color: (function () {
                        // prettier-ignore
                        var colors = ['#51689b', '#ce5c5c', '#ce5', '#5c5c', '#fbc357', '#bce357', '#ac3337', , '#8fbf8f', '#659d84', '#fb8e6a', '#c77288', '#786090', '#91c4c5', '#6890ba'];
                        return colors.concat(colors);
                    })()
                }
            }],
            series: [{
                type: 'scatter',
                itemStyle: itemStyle,
                data: data.series[0],
                symbolSize: function (val) {
                    return sizeFunction(val[0]);
                }
            }],
            animationDurationUpdate: 1000,
            animationEasingUpdate: 'quinticInOut'
        },
        options: []
    };
    for (var n = 0; n < data.timeline.length; n++) {
        option.baseOption.timeline.data.push(data.timeline[n]);
        option.options.push({
            title: {
                show: true,
                text: data.timeline[n] + ''
            },
            series: {
                name: data.timeline[n],
                type: 'scatter',
                itemStyle: itemStyle,
                data: data.series[n],
                symbolSize: function (val) {
                    return sizeFunction(val[0]);
                }
            }
        });
    }
    myChart.setOption(option);

    $(window).on('resize', resize);

    // Resize function
    function resize() {
        setTimeout(function () {
            // Resize chart
            myChart.resize();
        }, 200);
    }

});