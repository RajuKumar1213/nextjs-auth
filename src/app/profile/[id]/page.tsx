export default async function UserProfile({params}: {params : {id: string}}) {

const id = params.id;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-900 via-purple-900 to-black">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-10 max-w-md w-full flex flex-col items-center border border-white/20">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center mb-6 shadow-lg">
          <span className="text-4xl text-white font-bold">{id?.charAt(0)?.toUpperCase()}</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white mb-2">User Profile</h1>
        <h2 className="text-xl text-blue-200 mb-4">Profile ID: <span className="font-mono text-white">{id}</span></h2>
        <p className="text-center text-white/80 mb-6">Manage your profile settings and personal information here.</p>
        <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow hover:scale-105 transition-transform">Edit Profile</button>
      </div>
    </div>
  );
}