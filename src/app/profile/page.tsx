export default function ProfilePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-900 via-purple-900 to-black">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-10 flex flex-col items-center border border-white/20">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center mb-6 shadow-lg">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        </div>
        <h1 className="text-3xl font-extrabold text-white mb-2">Profile</h1>
        <p className="text-center text-white/80 mb-6">Manage your profile settings</p>
        <form className="space-y-4 w-full">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-blue-200">Username</label>
            <input type="text" id="username" name="username" required className="mt-1 block w-full border border-blue-400 bg-white/20 text-white rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 placeholder:text-blue-200" placeholder="Enter your username" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-blue-200">Email</label>
            <input type="email" id="email" name="email" required className="mt-1 block w-full border border-blue-400 bg-white/20 text-white rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 placeholder:text-blue-200" placeholder="Enter your email" />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold shadow hover:scale-105 transition-transform">Update Profile</button>
        </form>
      </div>
    </div>
  );
}