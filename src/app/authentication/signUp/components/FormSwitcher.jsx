// "use client"
// import React, { useEffect, useState } from 'react';
// import { Box, Button } from '@mui/material';
// import CommonUserForm from './CommonUserForm';

// function FormSwitcher(){
//   const [selectedForm, setSelectedForm] = useState('form1');

//   function handleButtonClick(value) {
//     setSelectedForm(value); // 선택된 폼 상태 업데이트
//   };

//   return (
//     <Box sx={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
//       버튼 그룹
//       <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
//         <Button
//           variant={selectedForm === 'form1' ? 'contained' : 'outlined'}
//           onClick={() => handleButtonClick('form1')}
//           sx={{ margin: '0 10px' }}
//         >
//           일반 가입자
//         </Button>
//         <Button
//           variant={selectedForm === 'form2' ? 'contained' : 'outlined'}
//           onClick={() => handleButtonClick('form2')}
//           sx={{ margin: '0 10px' }}
//         >
//           사업자 가입자 
//         </Button>
//       </Box>

//       {/* 선택된 폼 */}
//       <Box>
//         {selectedForm === 'form1' && (
          
//           <CommonUserForm/>
//         )}
//         {selectedForm === 'form2' && (
//           <Box component="form">
//             <h2>Form 2</h2>
//             <input
//               type="text"
//               placeholder="Enter value for Form 2"
//               style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
//             />
//             <button type="submit">Submit Form 2</button>
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default FormSwitcher;
