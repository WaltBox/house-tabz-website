import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const ConfirmRequest = () => {
 const [searchParams] = useSearchParams();
 const [roommates, setRoommates] = useState([]);
 const [loading, setLoading] = useState(true);
 const [perPersonAmount, setPerPersonAmount] = useState(0);
 const [perPersonUpfront, setPerPersonUpfront] = useState(0);

 useEffect(() => {
   const fetchRoommates = async () => {
     try {
       const userResponse = await axios.get('http://localhost:3004/api/users/1');
       const { houseId } = userResponse.data;
       const houseResponse = await axios.get(`http://localhost:3004/api/houses/${houseId}`);
       const { users } = houseResponse.data;
       
       setRoommates(users);
       setPerPersonAmount(parseFloat(searchParams.get('amount')) / users.length);
       setPerPersonUpfront(parseFloat(searchParams.get('upfront')) / users.length);
       setLoading(false);
     } catch (error) {
       console.error('Error:', error);
       setLoading(false);
     }
   };
   fetchRoommates();
 }, [searchParams]);

 const handleConfirm = async () => {
  try {
    const partnerId = searchParams.get('partner_id');
    if (!partnerId) {
      throw new Error('Partner ID is required');
    }
    
    // Extract both API key and Secret key from query parameters
    const apiKey = searchParams.get('apiKey');
    const secretKey = searchParams.get('secretKey');
    
    if (!apiKey || !secretKey) {
      throw new Error('Both API key and Secret key are required');
    }

    const response = await axios.post(
      `http://localhost:3004/api/partners/${partnerId}/staged-request`,
      {
        transactionId: searchParams.get('transactionId'),
        serviceName: searchParams.get('serviceName'),
        serviceType: searchParams.get('serviceType'),
        estimatedAmount: parseFloat(searchParams.get('amount')),
        requiredUpfrontPayment: parseFloat(searchParams.get('upfront')),
        userId: 1
      },
      {
        headers: {
          'X-HouseTabz-API-Key': apiKey,
          'X-HouseTabz-Secret-Key': secretKey // <-- include secret key header
        }
      }
    );

    if (response.data) {
      window.close();
    }
  } catch (error) {
    console.error('Error creating request:', error);
  }
};


 if (loading) {
   return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
     <p className="text-gray-600">Loading...</p>
   </div>;
 }

 return (
   <div className="min-h-screen bg-gray-50 py-12">
     <div className="max-w-lg mx-auto">
       <div className="text-center mb-8">
         <h1 className="text-3xl font-bold text-gray-900 mb-2">Confirm Your Request</h1>
         <p className="text-gray-600">Review split details with your roommates</p>
       </div>

       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
         <div className="space-y-4">
           <div className="flex justify-between items-center pb-4 border-b border-gray-100">
             <span className="text-gray-600">Service</span>
             <span className="font-semibold text-gray-900">{searchParams.get('serviceName')}</span>
           </div>
           <div className="flex justify-between items-center pb-4 border-b border-gray-100">
             <span className="text-gray-600">Total Amount</span>
             <span className="font-semibold text-gray-900">${searchParams.get('amount')}</span>
           </div>
           {searchParams.get('upfront') && (
             <div className="flex justify-between items-center pb-4 border-b border-gray-100">
               <span className="text-gray-600">Total Upfront Required</span>
               <span className="font-semibold text-gray-900">${searchParams.get('upfront')}</span>
             </div>
           )}
         </div>
       </div>

       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
         <h2 className="text-lg font-semibold mb-4">Split Details</h2>
         <div className="space-y-4">
           {roommates.map((roommate) => (
             <div key={roommate.id} className="flex justify-between items-center pb-4 border-b border-gray-100">
               <span className="text-gray-600">{roommate.username}</span>
               <div className="text-right">
                 <div className="font-semibold text-gray-900">${perPersonAmount.toFixed(2)}</div>
                 {perPersonUpfront > 0 && (
                   <div className="text-sm text-gray-500">${perPersonUpfront.toFixed(2)} upfront</div>
                 )}
               </div>
             </div>
           ))}
         </div>
       </div>

       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
         <button 
           className="w-full bg-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200 mb-4"
           onClick={handleConfirm}
         >
           Confirm Request
         </button>
         
         <button 
           className="w-full bg-gray-50 text-gray-600 py-4 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
           onClick={() => window.close()}
         >
           Cancel
         </button>
       </div>
     </div>
   </div>
 );
};

export default ConfirmRequest;