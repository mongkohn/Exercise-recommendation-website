import React from 'react';
import Image from 'next/image';
import { Button } from './ui/button';

const feedbackData = {
  title: "Comment",
  placeholder: "Comment as Nath Nonklang",
  comments: [
    {
      user: "Fourmeta",
      avatar: "♬",
      text: "Great work!",
      time: "about 2 hours"
    },
    {
      user: "WaxyWeb",
      avatar: "✨",
      text: "Awesome work dude 😍",
      time: "about 2 hours"
    }
  ]
};

const CommentInput: React.FC<{ placeholder: string }> = ({ placeholder }) => (
  <div className="flex items-center space-x-4">
    <Image
      src="https://scontent.fbkk29-4.fna.fbcdn.net/v/t39.30808-6/475792650_3278271279015914_4678420015098366595_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=yUt_whfD8E0Q7kNvwHPreV2&_nc_oc=AdnNo2EDjC7_v9-XxzCcI_dpd_Iz2ajjqj3mW9WeVhnxl_hggNT29GEv2NyZta-zIKA&_nc_zt=23&_nc_ht=scontent.fbkk29-4.fna&_nc_gid=TsGOIAU95kxtAYNAyHnu2g&oh=00_AfGZZdjUIU6iw-BJKdKnmqMm0sgPLREyZ9i7zKpRkPsUcA&oe=680958C4"
      alt="User avatar"
      width={48}
      height={48}
      className="rounded-full"
    />
    <input
      type="text"
      placeholder={placeholder}
      className="bg-white flex-1 border border-gray-400 rounded-md px-3 py-2"
    />
    <Button className="bg-blue-500 hover:bg-blue-700">ส่ง</Button>
  </div>
);

const Comment: React.FC<{
  user: string;
  avatar: string;
  text: string;
  time: string;
}> = ({ user, avatar, text, time }) => (
  <div className="flex items-start space-x-3">
    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-bold">
      {avatar}
    </div>
    <div>
      <p className="font-semibold">{user}</p>
      <p className="text-sm text-gray-700">{text}</p>
      <p className="text-xs text-gray-500">{time}</p>
    </div>
  </div>
);

const FeedbackSection: React.FC = () => (
  <div className="max-w-md py-10 space-y-5">
    <label className="text-3xl font-semibold">{feedbackData.title}</label>
    <CommentInput placeholder={feedbackData.placeholder} />
    <div className="space-y-4">
      {feedbackData.comments.map((comment, idx) => (
        <Comment key={idx} {...comment} />
      ))}
    </div>
  </div>
);

export default FeedbackSection;
