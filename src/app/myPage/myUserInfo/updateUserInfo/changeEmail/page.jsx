"use client"
import { Box } from '@mui/material'
import React from 'react'
import EmailVerificationForm from '../../../../components/EmailVerificaionForm'
import useEmailVerification from '../../../../authentication/signUp/hooks/useEmailVerification'

export default function ChangePassword() {

    const emailVerificaion = useEmailVerification();

    // 비밀번호 변경 요청
    const submitEvent = async () => {
        const API_URL = `${LOCAL_API_BASE_URL}/users/updateEmail`;
        try {
            const response = await axios.post(API_URL, email, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json', // JSON 형식 명시
                }
            })
            if(response.data.success){
                alert("비밀번호가 성공적으로 변경되었습니다.");
                router.back();
            } else {
                alert("error");
            }
        } catch (error) {
            alert("error : " + error);
        }
    }

    return (
        <Box sx={{
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            alignContent: 'center'
        }}>
            <EmailVerificationForm {...emailVerificaion}/>
        </Box>
    )
}