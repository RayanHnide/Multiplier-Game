import Image from "next/image";


type UserInfoCardProps = {
    name: string;
    points: number;
    time: string;
}

export default function UserInfoCard({name, points, time}: UserInfoCardProps) {
    return (
        <>
        
        <div className="flex space-x-4 bg-gray-800 p-4 rounded-lg text-white gap-56">
  <div className="flex items-center space-x-2">
    <div className="bg-purple-500 p-2 rounded-full">
       
       <Image src="https://cdn-icons-png.flaticon.com/128/744/744922.png" alt="Points" width={24} height={24} />
    </div>
    <span>{points}</span>
  </div>
  <div className="flex items-center space-x-2">
    <div className="bg-yellow-500 p-2 rounded-full">
     
       <Image src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" alt="Points" width={24} height={24} />
    </div>
    <span>{name}</span>
  </div>
  <div className="flex items-center space-x-2">
    <div className="bg-yellow-500 p-2 rounded-full">
     
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <span>{time}</span>
  </div>
</div>
        
        </>
    );
}