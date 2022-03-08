import React, { Component } from 'react'
import "./App.css"


import Container from './components/Container'
import Session from './components/Session'
import Break from './components/Break'



let timerInterval;

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      minutes: "25",
      seconds: "00",
      breakLength: "05",
      sessionLength: "25",
      sessionOpen: false,
      breakOpen: false,
      startTimer: true,
      breakTimer: false,
      tempTime: 1500,
      isLoading : true
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({isLoading: false})
    }, 4000);
  }

  minutesIncrement = () => {
    if (!this.state.startTimer && !this.state.pauseTimer) {
      if (this.state.minutes < 60) {
        this.setState({
          minutes: Number(this.state.minutes) + 1,
          sessionLength: Number(this.state.sessionLength) + 1,
          seconds: "00",
          tempTime: (this.state.minutes + 1) * 60,
        }, () => {
          let temp = this.state.sessionLength < 10 ? "0" + Number(this.state.sessionLength) : this.state.sessionLength;
          this.setState({
            minutes: temp,
            sessionLength: temp
          })
        })
      }
    }
  }

  minutesDecrement = () => {
    if (!this.state.startTimer && !this.state.pauseTimer) {
      if (this.state.minutes > 1) {
        this.setState({
          minutes: this.state.minutes - 1,
          sessionLength: this.state.sessionLength - 1,
          seconds: "00",
          tempTime: (this.state.minutes - 1) * 60
        }, () => {
          let temp = this.state.minutes < 10 ? "0" + Number(this.state.minutes) : this.state.minutes;
          this.setState({
            minutes: temp,
            sessionLength: temp
          })
        })
      }
    }
  }

  breakLengthIncrement = () => {
    if (!this.state.startTimer && !this.state.pauseTimer) {
      if (this.state.breakLength < 60) {
        this.setState({
          breakLength: Number(this.state.breakLength) + 1,
        }, () => {
          let temp = this.state.breakLength < 10 ? "0" + Number(this.state.breakLength) : this.state.breakLength;
          this.setState({
            breakLength: temp
          })
        })
      }
    }
  }

  breakLengthDecrement = () => {
    if (!this.state.startTimer && !this.state.pauseTimer) {
      if (this.state.breakLength > 1) {
        this.setState({
          breakLength: this.state.breakLength - 1,
        }, () => {
          let temp = this.state.breakLength < 10 ? "0" + Number(this.state.breakLength) : this.state.breakLength;
          this.setState({
            breakLength: temp
          })
        })
      }
    }
  }



  handleSession = () => {
    this.setState({
      sessionOpen: !this.state.sessionOpen,
      breakOpen: false
    })
  }

  handleBreak = () => {
    this.setState({
      breakOpen: !this.state.breakOpen,
      sessionOpen: false
    })
  }

  handleAll = () => {
    this.setState({
      breakOpen: false,
      sessionOpen: false,
    })
  }

  takeBreak = () => {
    this.setState({
      minutes: this.state.breakTimer ? this.state.sessionLength : this.state.breakLength,
      tempTime: this.state.breakTimer ? this.state.sessionLength * 60 : this.state.breakLength * 60,
      startTimer: false,
      pauseTimer: false,
      breakTimer: !this.state.breakTimer
    }, () => {
      this.start()
    })
  }

  playAlarm = () => {
    const sound = document.getElementById("alarm")
    sound.currentTime = 0;
    sound.play()
    setTimeout(() => {
      this.takeBreak()
    }, 3000)
  }


  start = () => {
    if (this.state.startTimer) {
      clearInterval(timerInterval)
      timerInterval = setInterval(() => {
        let tempMinutes = Math.floor(this.state.tempTime / 60);
        let tempSeconds = Math.floor(this.state.tempTime % 60);
        tempMinutes = tempMinutes < 10 ? "0" + tempMinutes : tempMinutes;
        tempSeconds = tempSeconds < 10 ? "0" + tempSeconds : tempSeconds;
        if (tempMinutes < 1 && tempSeconds < 1) {
          clearInterval(timerInterval)
          this.playAlarm()
        }
        this.setState({
          minutes: tempMinutes,
          seconds: tempSeconds,
          tempTime: this.state.tempTime - 1
        })
      }, 1000)
    }
    else {
      clearInterval(timerInterval)
    }
    this.handleAll()
  }

  pause = () => {
    this.setState({
      startTimer: !this.state.startTimer
    }, () => {
      if (this.state.startTimer) {
        this.start()
      }
      else {
        clearInterval(timerInterval)
      }
    })
    this.handleAll()
  }

  reset = () => {
    clearInterval(timerInterval);
    this.setState({
      minutes: 25,
      sessionLength: 25,
      seconds: "00",
      breakLength: "02",
      tempTime: 1500,
      pauseTimer: false,
      startTimer: false
    })
    this.handleAll()
  }


  render() {

    return (
      this.state.isLoading ? 
      
      <div className="loader">
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      :

      <div>
      <div className='title'>
        <h1>Precious Resource</h1>
      </div>

      <Container
        minutes={this.state.minutes}
        seconds={this.state.seconds}

        handleSessionContainer={this.handleSession}
        handleBreakContainer={this.handleBreak}
        handleEverything={this.handleAll}

        startIt={this.start}
        pauseIt={this.pause}
        resetIt={this.reset}
      />



      <Session
        class={`sessionContainer ${this.state.sessionOpen ? 'active' : 'inactive'}`}
        time={this.state.sessionLength}
        handleMinutesIncre={this.minutesIncrement}
        handleMinutesDecre={this.minutesDecrement}
      />

      <Break
        class={`breakContainer ${this.state.breakOpen ? 'active' : 'inactive'}`}
        length={this.state.breakLength}
        handleBreakLengthIncre={this.breakLengthIncrement}
        handleBreakLengthDecre={this.breakLengthDecrement}
      />

      <audio id="alarm" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
      
      <div className="footer">
        <h3>Brusooo</h3>
      </div>
      
    </div>
    )
  }
}

export default App