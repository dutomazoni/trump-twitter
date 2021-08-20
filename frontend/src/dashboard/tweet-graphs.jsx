import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import '../styles/scss/tweet-graphs.scss'
import {Spinner} from "react-bootstrap";

export default props => {
    const [tweets, updateTweets] = useState([]);
    const [isLoading, updateLoading] = useState(true)

    const getList =  () => {
        axios.get("http://192.168.0.36:5001/targets") //
            .then((response) => {
                updateTweets(response.data.tweets)
                if(tweets === undefined) {
                    updateLoading(true)
                }else {
                    updateLoading(false)
                }
            })
    }

    useEffect(() => {
        getList()
    }, [])

    console.log(tweets.length)
    let result = tweets.map(a => a.count);
    let targets = tweets.map(a => a._id);

    let results100 =[];
    let targets100 =[];

    for (let i = 0; i < 10; i++) {
        results100.push(result[i])
        targets100.push(targets[i])
    }


    const PieChart = (values, labels) => (
        <div>
            <Plot className={"plot"}
                  data={[
                      {type: 'pie', values: values, labels: labels},
                  ]}
                  layout = {{autosize: true, title: "Top 10", paper_bgcolor: "#ffffff", border: "1px solid black",
                      xaxis: {
                          title: 'number of insults',
                      },
                      yaxis: {
                          title: {
                              text: 'targets',
                              standoff: 10
                          },
                          automargin: true
                      },
                      font: {
                          size: 15
                      }

                  }
                  }
                  useResizeHandler={true}
                  style={{width: "70vw", height: "70vh"}}
            />
        </div>
    )

    const BarChart = (values, labels) => (

        <Plot className={"plot"}
              data={[
                  {type: 'bar', x: values, y: labels, orientation: 'h', marker: { color: '#3f51b5'} },
              ]}
              layout = {{autosize: true, title: "Top 10", bargap: 0.5, plot_bgcolor:"#ffffff", paper_bgcolor: "#ffffff",
                  xaxis: {
                      title: 'number of insults',
                      linecolor: 'black',
                      linewidth: 2,
                      mirror: true
                  },
                  yaxis: {
                      title: {
                          text: 'targets',
                          standoff: 10
                      },
                      linecolor: 'black',
                      linewidth: 2,
                      mirror: true,
                      automargin: true
                  },
                  font: {
                      size: 15
                  }
              }}
              useResizeHandler={true}
              style={{width: "70vw", height: "70vh"}}
        />

    )

    return (
        <div className={"container"}>
            <h2 style={{color:'blue'}}> Have you ever wondered how many <strong>people, places or things</strong> Trump has insulted on his Twitter account?</h2>
            <h3 style={{color:'blue'}}> Well, thanks to this <a href={"https://www.kaggle.com/ayushggarg/all-trumps-twitter-insults-20152021"}>database</a> I've found on Kaggle, we can actually find out!</h3>
            <p style={{color:'blue'}}>Pro tip: hover over the pie chart to find out how many times he insulted each of the top 10!</p>
            {isLoading ? <div className={'spinner-div'}><p>Loading graph...  </p><Spinner animation="border" variant={"primary"}/></div> : PieChart(results100, targets100)}
            {/*{isLoading ? <div className={'spinner-div'}><p>Loading graph...  </p><Spinner animation="border" variant={"primary"}/></div> : BarChart(results100, targets100)}*/}
        </div>
    )

}

