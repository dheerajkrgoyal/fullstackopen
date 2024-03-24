import { useState } from 'react'

const Header = () => <div><h1>Give Feedback</h1></div>
    
const Button = ({handleClick, text}) => {
    return (
        <button onClick={handleClick}>{text}</button>
    )
}

const StatisticLine = ({text, value}) => {
    return (
        <tr>
            <td>{text}</td> 
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({good, neutral, bad}) => {
    const all = good + neutral + bad
    const average = (good-bad)/all
    const postivePercentage = (good/all)*100
    if(all > 0){
        return (
            <div>
                <h2>Statistics</h2>
                <table>
                    <tbody>
                        <StatisticLine text='Good' value={good} />
                        <StatisticLine text='Neutral' value={neutral} />
                        <StatisticLine text='Bad' value={bad} />
                        <StatisticLine text='All' value={all} />
                        <StatisticLine text='Average' value={average} />
                        <StatisticLine text='Positive' value={postivePercentage} />
                    </tbody>
                </table>

            </div>
        )
    }
    return (
        <div>
            <h2>Statistics</h2>
            <p>No feedback given</p>
        </div>
    )
    
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <Header />
            <Button handleClick={() => setGood(good+1)} text='Good' />
            <Button handleClick={() => setNeutral(neutral+1)} text='Neutral' />
            <Button handleClick={() => setBad(bad+1)} text='Bad' />
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}
export default App