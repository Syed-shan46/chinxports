export default function Preloader() {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#ffffff"
    }}>
      <div className="loader"></div>
    </div>
  );
}
