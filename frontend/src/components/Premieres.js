import "./Premieres.css";

export default function Premieres() {
  const goToBookMyShow = () => {
    window.open("https://in.bookmyshow.com", "_blank");
  };

  return (
    <section className="premieres-section">
      <h2 className="premieres-title">Premieres</h2>

      <div className="premieres-grid">
        <div className="premiere-card">
          <img src="/images/new1.jpg" alt="Salaar" onClick={goToBookMyShow} />
          <h3>Silent Night, Deadly Night</h3>
          <p>English</p>
        </div>

        <div className="premiere-card">
          <img src="/images/new2.jpg" alt="Animal" onClick={goToBookMyShow} />
          <h3>Christmas Karma</h3>
          <p>English</p>
        </div>

        <div className="premiere-card">
          <img src="/images/new3.jpg" alt="Leo" onClick={goToBookMyShow} />
          <h3>Anaconda</h3>
          <p>Telugu</p>
        </div>

        <div className="premiere-card">
          <img src="/images/new4.jpg" alt="Jawan" onClick={goToBookMyShow} />
          <h3>Spiral</h3>
          <p>English</p>
        </div>

        <div className="premiere-card">
          <img src="/images/new5.jpg" alt="KGF 2" onClick={goToBookMyShow} />
          <h3>Memory</h3>
          <p>English</p>
        </div>

        <div className="premiere-card">
          <img src="/images/new6.jpg" alt="Pushpa" onClick={goToBookMyShow} />
          <h3>Jigsaw</h3>
          <p>English</p>
        </div>

        <div className="premiere-card">
          <img src="/images/new7.jpg" alt="RRR" onClick={goToBookMyShow} />
          <h3>Blackmail</h3>
          <p>Tamil</p>
        </div>
      </div>
    </section>
  );
}
