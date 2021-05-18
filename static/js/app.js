d3.json('samples.json').then(data => {
    console.log(data);
})


function buildForm(sampleData) {
    d3.json('samples.json').then(data => {
        var mNames = data.metadata;
        var results = mNames.filter(object => object.id == sampleData);
        var result = results[0];
        var PANEL = d3.select("#sample-metadata");
        PANEL.html("");
        Object.entries(result).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    });
}
function buildCharts(sampleNumber) {
    d3.json('samples.json').then(data => {
        var sNames = data.samples;
        var results = sNames.filter(object => object.id == sampleNumber);
        var result = results[0];
        console.log(result);
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var yticks = otu_ids.slice(0, 10).map(x => `OTU ${x}`).reverse()

        var bardata = [
            {

                y: yticks,
                x: sample_values.slice(0, 10).reverse(),
                text: otu_labels.slice(0, 10).reverse(),
                type: "bar",
                orientation: "h",


            }
        ];

        var layout = {
            title: "Belly Button",
            margin: { t: 30, l: 150 }
        };

        // Plot the chart to a div tag with id "bar-plot"
        Plotly.newPlot("bar", bardata, layout);

        //graphing these variables
        //GRAPHING BAR CHART
        //var1
        //var 2

        //plotly.newplot();
        var layoutb = {
            title: "Bacteria Per Sample",
            hovermode: "closest",
            xaxis: { title: "OTU" },
            margin: { t: 30 }

        };
        var bdata = [
            {
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: "markers",
                marker: {
                    size: sample_values,
                    color: otu_ids,
                    colorscale: "Portland"
                }
            }
        ];
        Plotly.newPlot("bubble", bdata, layoutb);









        //BUBBLE CHART 
        // plotly.newplot();
    });
}

function init() {
    var select = d3.select("#selDataset");
    d3.json('samples.json').then(data => {
        var sNames = data.names;
        sNames.forEach(element => {
            select.append("option").text(element).property("value", element);
        });
        var firstSample = sNames[0];
        buildForm(firstSample);
        buildCharts(firstSample);
    });

}
function optionChanged(newSample) {
    buildForm(newSample);
    buildCharts(newSample);
}
init();