import { useState } from 'react'

const Header = () => <div><h1>Give Feedback</h1></div>
    
const Button = ({handleClick, text}) => {
    return (
        <button onClick={handleClick}>{text}</button>
    )
}

const Statistics = ({good, neutral, bad}) => {
    return (
        <div>
            <h2>Statistics</h2>
            <p>Good: {good}</p>
            <p>Neutral: {neutral}</p>
            <p>Bad: {bad}</p>
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