import "./LiveEvents.css";

export default function LiveEvents() {
  const openBookMyShow = () => {
    window.open("https://in.bookmyshow.com/", "_blank");
  };

  return (
    <div className="live-events-section1">
      <h2>The Best Of Live Events</h2>
      <div className="live-events-grid1">
        <img src="/events/f1.jpg" alt="Event 1" onClick={openBookMyShow} />
        <img src="/events/f2.jpg" alt="Event 2" onClick={openBookMyShow} />
        <img src="/events/f3.jpg" alt="Event 3" onClick={openBookMyShow} />
        <img src="/events/f4.jpg" alt="Event 4" onClick={openBookMyShow} />
      </div>
    </div>
  );
}
