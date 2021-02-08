import { Button } from '@blueprintjs/core';
import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css'
const Header = (props) => <h1>{props.header}</h1>

const ButtonComponent = (props) => (
        <Button intent="primary" onClick={props.onClick}>{props.text}</Button>
)
    
const Statistic = (props) => {
    return (
        <>
          <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
          </tr>
        </>
    )
}
const Statistics = (props) => {
    if (props.total === 0){
        return (
            <div>No feedback given</div>
        )
    } else {
        return (
            <table>
                <tbody>
                    <Statistic text="good" value={props.good} />
                    <Statistic text="neutral" value={props.neutral} />
                    <Statistic text="bad" value={props.bad} />
                    <Statistic text="total" value={props.total} />
                    <Statistic text="average" value={Number(props.avg).toFixed(2)} />
                    <Statistic text="positive" value={props.positive} />
                </tbody>
            </table>
        )
    }
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    let total = good + neutral + bad;
    let avg = total/3;

    return (
        <>
            <Header header="give feedback" />
            <ButtonComponent onClick={() => setGood(good + 1)} text="good"/>
            <ButtonComponent onClick={() => setNeutral(neutral + 1)} text="neutral"/>
            <ButtonComponent onClick={() => setBad(bad + 1)} text="bad"/>
            <Header header="statistics" />
            <Statistics 
              good={good} neutral={neutral} bad={bad} 
              total={total} avg={avg} positive={Number((good/total) * 100).toFixed(2) + "%"} 
            />
        </>
    )
}

ReactDOM.render(<App />, 
    document.getElementById('root')
    );