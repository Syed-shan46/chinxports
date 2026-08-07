export default function Stats() {
  const stats = [
    { icon: "bi-award", title: "Years of Experience", hint: "Decades of trusted expertise", number: 10 },
    { icon: "bi-globe2", title: "Countries Served", hint: "Global network, local trust", number: 50 },
    { icon: "bi-hand-thumbs-up", title: "Satisfied Clients", hint: "Strong bonds, lasting trust", number: 500 },
    { icon: "bi-box-seam", title: "Products Delivered", hint: "On time, every time", number: 1000 },
  ];

  return (
    <section id="stats" className="stats section mt-4">
      <div className="container">
        <div className="row justify-content-center ">

          <div className="col-lg-11">
            <div className="stats-board">

              {stats.map((s, index) => (
                <article className="stat-tile" key={index}>
                  <div className="tile-head">
                    <i className={`bi ${s.icon}`}></i>
                    <div className="label">
                      <h6 className="title">{s.title}</h6>
                      <small className="hint">{s.hint}</small>
                    </div>
                  </div>

                  <div className="tile-metric">
                    <span className="metric-number">{s.number}</span>
                    <span className="metric-suffix">+</span>
                  </div>
                </article>
              ))}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
