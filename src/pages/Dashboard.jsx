function Dashboard() {
  return (
    <>
      <h1>Tela de Dashboard</h1>
      <Outlet>
        <Settings />
      </Outlet>
    </>
  );
}

export default Dashboard;
