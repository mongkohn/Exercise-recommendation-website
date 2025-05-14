import EditProfileModal from "@/components/EditProfileModal";
import Image from "next/image";

// User type definition
type User = {
  name: string;
  email: string;
  gender: string;
  birthday: string;
  weight: string;
  height: string;
  lastLogin: string;
  password: string;
  avatar: string;
};

// Mock user data (should be replaced with real data fetching in production)
const user: User = {
  name: "Nath Nonklang",
  email: "xxx.xxxx@bumail.net",
  gender: "-",
  birthday: "-",
  weight: "-",
  height: "-",
  lastLogin: "06:05:2025 12:30",
  password: "***********",
  avatar: "https://scontent.fbkk29-4.fna.fbcdn.net/v/t39.30808-1/475792650_3278271279015914_4678420015098366595_n.jpg?stp=dst-jpg_s160x160_tt6&_nc_cat=110&ccb=1-7&_nc_sid=e99d92&_nc_ohc=lbb--zZ8aLwQ7kNvwFvmqxY&_nc_oc=AdknDzYJzWVHoWXzWvreYmCzEaxdh6xOfxEsE46AUbsH6oCYTvCRRhrha1TJ8GmZAFs&_nc_zt=24&_nc_ht=scontent.fbkk29-4.fna&_nc_gid=76b6_pP-dnrXqLCiTBWlKA&oh=00_AfJ-uc3T_1dGPLhj14_JBjhwbtRiMwpM85rqFw7oisw9_Q&oe=681FC7C2",
};

function UserAvatar({ avatar, name }: { avatar: string; name: string }) {
  return (
    <div className="flex flex-col items-center">
      <Image
        src={avatar}
        alt="profile"
        width={96}
        height={96}
        className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-4xl mb-4"
        priority
      />
      <h2 className="text-lg font-semibold">{name}</h2>
    </div>
  );
}

function UserActions() {
  return (
    <div className="flex gap-2 mt-4">
      <EditProfileModal />
      <button type="button" className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-800 text-sm">
        ออกจากระบบ
      </button>
    </div>
  );
}

function UserInfo({ user }: { user: User }) {
  return (
    <div className="grid grid-cols-3 gap-y-3 text-sm">
      <div>ชื่อ : <span className="font-medium">{user.name}</span></div>
      <div>เพศ : <span>{user.gender}</span></div>
      <div>อีเมล : <span>{user.email}</span></div>
      <div>วันเกิด : <span>{user.birthday}</span></div>
      <div>รหัสผ่าน : <span>{user.password}</span></div>
      <div>เข้าใช้งานล่าสุด : <span>{user.lastLogin}</span></div>
      <div>น้ำหนัก : <span>{user.weight}</span></div>
      <div>ส่วนสูง : <span>{user.height}</span></div>
    </div>
  );
}

export default function Profile() {
  return (
    <div className="max-w-4xl mx-auto m-20 p-10 bg-white shadow-lg rounded-lg">
      <UserAvatar avatar={user.avatar} name={user.name} />
      <p className="text-gray-500 text-sm text-center">{user.email}</p>
      <UserActions />
      <hr className="my-10 border-gray-300" />
      <h3 className="text-base font-semibold mb-4">ข้อมูลทั่วไป</h3>
      <UserInfo user={user} />
    </div>
  );
}
