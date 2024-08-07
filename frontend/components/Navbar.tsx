import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <div style={styles.logo}>
          <Link href="/">Battle Ground</Link>
        </div>
        <ul style={styles.menu}>
          <li style={styles.menuItem}>
            <Link href="/">Home</Link>
          </li>
          <li style={styles.menuItem}>
            <Link href="/location_simulator">Location Simulator</Link>
          </li>
          <li style={styles.menuItem}>
            <Link href="/device_tracker">Device Tracker</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  nav: {
    backgroundColor: "#333",
    padding: "10px 0",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
  },
  logo: {
    color: "#fff",
    fontSize: "20px",
    fontWeight: "bold",
  },
  menu: {
    listStyle: "none",
    display: "flex",
    margin: 0,
    padding: 0,
  },
  menuItem: {
    marginLeft: "20px",
  },
};
