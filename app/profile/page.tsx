import EditProfileModal from "@/components/EditProfileModal";


export default function Profile() {
  return (
    <div className="max-w-4xl mx-auto m-20 p-10 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col items-center">
        <div >
          <img src="https://scontent.fbkk29-4.fna.fbcdn.net/v/t39.30808-6/475792650_3278271279015914_4678420015098366595_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=yUt_whfD8E0Q7kNvwHPreV2&_nc_oc=AdnNo2EDjC7_v9-XxzCcI_dpd_Iz2ajjqj3mW9WeVhnxl_hggNT29GEv2NyZta-zIKA&_nc_zt=23&_nc_ht=scontent.fbkk29-4.fna&_nc_gid=TsGOIAU95kxtAYNAyHnu2g&oh=00_AfGZZdjUIU6iw-BJKdKnmqMm0sgPLREyZ9i7zKpRkPsUcA&oe=680958C4" 
              alt="image"
              className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-4xl mb-4"/>
        </div>
        
        <h2 className="text-lg font-semibold">NATH NONKLANG</h2>
        <p className="text-gray-500 text-sm">xxx.xxxx@bumail.net</p>
        <div className="flex gap-2 mt-4">
        <EditProfileModal />
          <button className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-800 text-sm">
            ออกจากระบบ
          </button>
        </div>
      </div>

      <hr className="my-10 border-gray-300" />
      <h3 className="text-base font-semibold mb-4">ข้อมูลทั่วไป</h3>

      <div className="grid grid-cols-3 gap-y-3 text-sm">
        <div>ชื่อ : <span className="font-medium">Nath Nonklang</span></div>
        <div>เพศ : <span>-</span></div>
        <div>อีเมล : <span>xxx.xxxx@bumail.net</span></div>
        <div>วันเกิด : <span>-</span></div>

        <div>รหัสผ่าน : <span>***********</span></div>
        <div>เข้าใช้งานล่าสุด : <span>dd:mm:yy 00:00</span></div>

        <div>BMR : <span>-</span></div>
        <div>BMI : <span>-</span></div>
        <div>TDEE : <span>-</span></div>
      </div>
    </div>
  );
}
