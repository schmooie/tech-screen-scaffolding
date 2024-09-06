import './App.css'
import data from './data';
import { useState } from 'react';

function App() {
  return (
    <>
      <Events events={data.items} />
    </>
  )
}

function timestampToIso(timestamp) {
  return new Date(timestamp).toISOString().substring(0, 10);
}

function IsoToTimestamp(iso) {
  return new Date(iso).getTime();
}

function getClosestDateIndex(target, dates) {
  let closestIndex = 0;
  let minDeltaFromTarget = Math.abs(dates[0] - target);

  for (let i = 1; i < dates.length; i++) {
    const curDate = dates[i];
    const deltaFromTarget = Math.abs(curDate - target);

    if (deltaFromTarget < minDeltaFromTarget) {
      closestIndex = i;
      minDeltaFromTarget = deltaFromTarget;
    }
  }

  return closestIndex;
}

function Events({ events }) {
  const [targetDate, setTargetDate]  = useState((new Date()).getTime());
  const [searchString, setSearchString] = useState('');

  const filteredEvents = events.filter(({ name, venueName }) => {
    return `${name.toLocaleLowerCase()} ${venueName.toLocaleLowerCase()}`.indexOf(searchString) >= 0;
  });

  const closestEventIndex = getClosestDateIndex(targetDate, filteredEvents.map(event => event?.startTimestamp));
  const closestEventId = filteredEvents[closestEventIndex]?.eventId;

  return (
    <>
      <div className="p-1 border-b-2">
        <span className='font-bold'>Target: </span>
        <input type="date" value={timestampToIso(targetDate)} onChange={(e) => { setTargetDate(IsoToTimestamp(e.target.value))}}/>
      </div>

      <div className="p-1 border-b-2">
        <span className='font-bold'>Search: </span>
        <input type="text" placeholder="Search" value={searchString} onChange={(e) => {
          setSearchString(e.target.value.toLocaleLowerCase());
        }} />
      </div>

      {filteredEvents.map(event =>
        <EventListing key={event.eventId} {...event} highlighted={closestEventId === event.eventId}/>
      )}
    </>
  )
}

function EventListing({ name, formattedVenueLocation, formattedDateWithoutYear, formattedTime, dayOfWeek, venueName, highlighted }) {
  return (
    <section className={['flex p-1  border-2 mb-1 max-w-lg', highlighted ? 'border-yellow-400' : 'border-gray-300'].join(' ')}>
      <aside className='p-2 border-r-2 basis-1/5'>
        <div className="font-semibold">{formattedDateWithoutYear}</div>
        <div>{dayOfWeek}</div>
        <div>{formattedTime}</div>
      </aside>
      <section className="p-2 basis-3/4">
        <h2 className='font-semibold'>{name}</h2>
        <div>{formattedVenueLocation} | {venueName} </div>
      </section>
    </section>
  );
}

export default App
