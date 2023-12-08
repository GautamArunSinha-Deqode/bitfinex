import dayjs from "dayjs";

export const candelStickOptions: any = {
  chart: {
    height: 350,
    type: "candlestick",
    background: "#000000", // Background color of the chart
  },
  title: {
    text: "OHLC Chart",
    align: "left",
    style: {
      color: "#ffffff", // Title text color
    },
  },
  annotations: {
    xaxis: [
      {
        x: "Oct 06 14:00", // X-axis value for annotation
        borderColor: "#00E396", // Border color of the annotation
        label: {
          borderColor: "#00E396", // Border color of the label
          style: {
            fontSize: "12px",
            color: "#fff", // Text color of the label
            background: "#00E396", // Background color of the label
          },
          orientation: "horizontal",
          offsetY: 7,
          text: "Annotation Test", // Text content of the label
        },
      },
    ],
  },
  tooltip: {
    enabled: true, // Enable tooltip
  },
  xaxis: {
    type: "category",
    labels: {
      formatter: function (val: Date) {
        return dayjs(val).format("MMM DD HH:mm"); // Format x-axis labels using dayjs
      },
      style: {
        colors: "#fff", // Text color of x-axis labels
      },
    },
  },
  yaxis: {
    tooltip: {
      enabled: true, // Enable tooltip for y-axis
    },
    labels: {
      style: {
        colors: "#fff", // Text color of y-axis labels
      },
    },
  },
};
