// components/FeedbackSection.tsx
import React from 'react';


const FeedbackSection = () => {
  return (
    <div className="max-w-md  py-10 space-y-5">
      <label className="text-3xl font-semibold">Comment</label>
      <div className='flex space-x-4'>
      <img 
        src="https://scontent.fbkk29-4.fna.fbcdn.net/v/t39.30808-6/475792650_3278271279015914_4678420015098366595_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=yUt_whfD8E0Q7kNvwHPreV2&_nc_oc=AdnNo2EDjC7_v9-XxzCcI_dpd_Iz2ajjqj3mW9WeVhnxl_hggNT29GEv2NyZta-zIKA&_nc_zt=23&_nc_ht=scontent.fbkk29-4.fna&_nc_gid=TsGOIAU95kxtAYNAyHnu2g&oh=00_AfGZZdjUIU6iw-BJKdKnmqMm0sgPLREyZ9i7zKpRkPsUcA&oe=680958C4" 
        alt="image"
        className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-4xl mb-4"/>
      <input 
        type="text"
        placeholder='Comment as Nath Nonklang' 
        className='bg-white flex-1 border border-gray-400 rounded-md px-3 py-2' />
      </div>

      {/* Comments */}
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-bold">♬</div>
          <div>
            <p className="font-semibold">Fourmeta</p>
            <p className="text-sm text-gray-700">Great work!</p>
            <p className="text-xs text-gray-500">about 2 hours</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 rounded-full bg-yellow-300 flex items-center justify-center text-pink-600 font-bold">✨</div>
          <div>
            <p className="font-semibold">WaxyWeb</p>
            <p className="text-sm text-gray-700">Awesome work dude 😍</p>
            <p className="text-xs text-gray-500">about 2 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSection;
