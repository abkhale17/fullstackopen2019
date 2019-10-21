import React, { useState } from 'react'
import ReactDOM from 'react-dom'

function ObjectRow(props){
  const { text , value }=props.val
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
    )
}

function Statistic(props){
  var rows=[]
    
      rows.push(<ObjectRow val={props} key={props.Uniqkey}/>);
 
  return (
      <tbody>{rows}</tbody>
    
    )
}


function Statistics(props){

  const {good,neutral,bad}=props.feedback

  const all=good+neutral+bad

  return (

    <div>
    <h1>statistics</h1>
    {
      all === 0 ? 
        <div>No feedback given</div>
        :
        <table>

          <Statistic 
            text = "good" 
            value = { good }   
            Uniqkey = {1}
          />
          <Statistic 
            text = "neutral" 
            value =  {neutral}  
            Uniqkey = {2}
          />
          <Statistic 
            text = "bad" 
            value =  {bad}  
            Uniqkey = {3}
          />
          <Statistic 
            text = "all" 
            value = {all}   
            Uniqkey = {4} 
          />
          <Statistic 
            text = "average" 
            value =  {(good-bad)/all}  
            Uniqkey = {5}
          />
          <Statistic 
            text = "positive" 
            value =  {`${good/all*100}%`}  
            Uniqkey = {6}
          />

        </table>
      
    }
    </div>
    )

}



function Button(props) {

  const {text}=props 
  return (
    <button onClick={props.handleClick}>
      {text}
    </button>
    )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const feeds = {
    good:good,
    neutral:neutral,
    bad:bad, 
  }
  return (
    <div>
      <h1>Give feedback</h1>
      <br/>
      <br/>
      <Button handleClick={()=>setGood(good+1)} text="good" / >
      <Button handleClick={()=>setNeutral(neutral+1)} text="neutral" / >
      <Button handleClick={()=>setBad(bad+1)} text="bad" / >
      <br/>
      <br/>
      
      <Statistics feedback = { feeds } />
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)