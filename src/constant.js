import dayjs from "dayjs";
export const candelStickOptions = {
    chart: {
      height: 350,
      type: 'candlestick',
      background: '#000000', 
    },
    title: {
      text: 'OHLC Chart',
      align: 'left',
      style: {
        color: '#ffffff', 
      },
    },
    annotations: {
      xaxis: [
        {
          x: 'Oct 06 14:00',
          borderColor: '#00E396',
          label: {
            borderColor: '#00E396',
            style: {
              fontSize: '12px',
              color: '#fff',
              background: '#00E396',
            },
            orientation: 'horizontal',
            offsetY: 7,
            text: 'Annotation Test',
          },
        },
      ],
    },
    tooltip: {
      enabled: true,
    },
    xaxis: {
      type: 'category',
      labels: {
        formatter: function (val) {
          return dayjs(val).format('MMM DD HH:mm')
        },
        style: {
          colors: '#fff', 
        },
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        style: {
          colors: '#fff', 
        },
      },
    },
  };
  