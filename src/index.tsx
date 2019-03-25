import React from 'react';
import ReactDOM from 'react-dom';
import { DateSelector } from './selection/dateSelector';

const onChange = (incomingDate: Date) => console.log(incomingDate);

const App: React.FC = () => <DateSelector value={new Date()} onChange={onChange} />;

ReactDOM.render(<App />, document.getElementById('root'));

//@ts-ignore
module.hot.accept();
