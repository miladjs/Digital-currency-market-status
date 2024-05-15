function Layout({ children }) {
  return (
    <>
      <img className="mapbackground" src="image/map.svg" />
      <div className="warpper">
        <main>{children}</main>
      </div>
    </>
  );
}
export default Layout;
