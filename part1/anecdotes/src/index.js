import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Button from './components/Button';
import DisplayVotes from './components/DisplayVotes';
import Header from './components/Header';
import randomNumber from './utils/RandomNumber';

const App = (props) => {
    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

    const voteFor = () => {
        const copy = [...votes];
        copy[selected]+=1;
        setVotes(copy);
    }

    const mostVotes = () => {
        return (
            votes.indexOf(Math.max(...votes))
        )
    }
     
    return (
        <div>
            <Header header="Anecdote of the day" />
            <p>{props.anecdotes[selected]}</p>
            <DisplayVotes votes={votes[selected]} />
            <Button text="vote" event={voteFor}/>
            <Button text="next anecdote" event={() => setSelected(randomNumber())}/>
            <Header header="Anecdote with the most votes" />
            <p>{props.anecdotes[mostVotes()]}</p>
            <DisplayVotes votes={votes[mostVotes()]} />

        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

ReactDOM.render(<App anecdotes={anecdotes}/>, document.getElementById('root'));
