export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <p className="text-slate-500">Total Trips</p>
        <h3 className="text-3xl font-bold mt-2">24</h3>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <p className="text-slate-500">Total Locations</p>
        <h3 className="text-3xl font-bold mt-2">12</h3>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <p className="text-slate-500">Total Food Menus</p>
        <h3 className="text-3xl font-bold mt-2">36</h3>
      </div>

    </div>
  );
}