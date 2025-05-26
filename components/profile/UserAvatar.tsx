import { UserProfile } from "@/app/(user)/profile/page";

export default function UserAvatar({ user }: { user: UserProfile }) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative">
      <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-full flex items-center justify-center text-4xl sm:text-6xl font-bold text-white shadow-2xl border-4 border-white/20 backdrop-blur-sm">
        {getInitials(user.fullname || user.username)}
      </div>
      <div className="absolute -bottom-2 -right-2 w-8 h-8 sm:w-12 sm:h-12 bg-green-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"></div>
      </div>
    </div>
  );
}
