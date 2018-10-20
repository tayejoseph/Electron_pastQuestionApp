import React from "react";
import Timer from 'react-timer-wrapper';



class SideBar extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        timer: ""
    }
}
onTimerStart({duration, progress, time}) {

}

onTimerStop({duration, progress, time}) {

}

onTimerTimeUpdate({duration, progress, time}) {

}

onTimerFinish({duration, progress, time}) {

}
render() {
    const {
        timerActive,
    } = this.state;
    
    return (
        <div>
            this si timer
        <Timer
        active={timerActive}
        onFinish={this.onTimerFinish}
        onStart={this.onTimerStart}
        onStop={this.onTimerStop}
        onTimeUpdate={this.onTimerTimeUpdate}
        />
        </div>
      
    );
    }
}

export default SideBar;