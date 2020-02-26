import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => <h1>{props.header}</h1>

const Button = (props) => (
        <button onClick={props.onClick}>{props.text}</button>
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
                    <Statistic text="average" value={props.avg} />
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
            <Button onClick={() => setGood(good + 1)} text="good"/>
            <Button onClick={() => setNeutral(neutral + 1)} text="neutral"/>
            <Button onClick={() => setBad(bad + 1)} text="bad"/>

            <Header header="statistics" />
            <Statistics 
                good={good} neutral={neutral} bad={bad} 
                total={total} avg={avg} positive={(good/total) * 100 + "%"} 
            />


        </>
    )
}

ReactDOM.render(<App />, 
    document.getElementById('root')
    );