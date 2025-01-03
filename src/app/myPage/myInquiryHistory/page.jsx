"use client"
import React, { useEffect, useState } from "react";
import { Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, Accordion, AccordionSummary, AccordionDetails, Stack, Pagination, Avatar, CardMedia } from "@mui/material";
import QuestionList from "./QuestionList.jsx";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import useApi from "../../components/useApi.jsx";
import useAuthStore from "../../../../store/authStore.jsx";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Link from "next/link.js";
import axios from "axios";
import { Image } from "@mui/icons-material";
import { useRouter } from "next/navigation.js";


const InquiryPage = () => {
  const [data, setData] = useState([]); // 리뷰 리스트
  const {token} = useAuthStore();  // zustand에서 token 값 가져오기
  const {getData, postData} = useApi(token, setData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  const LOCAL_API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL;

  // 페이지
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const itemsPerPage = 10; // 페이지당 아이템 수

  // 페이징
  // 페이지 변경 시 호출되는 함수
  const handlePageChange = (event, value) => {
    setCurrentPage(value); // 페이지 상태 업데이트
  };
  // 현재 페이지에 해당하는 데이터 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);
  // 전체 페이지 수 계산
  const totalPages = Math.ceil(data.length / itemsPerPage);
  // 페이지네이션 범위 (10개씩 표시)
  const getPageNumbers = () => {
    let start = Math.max(currentPage - 4, 1); // 현재 페이지에서 왼쪽으로 최대 4개 페이지 표시
    let end = Math.min(start + 9, totalPages); // 현재 페이지에서 오른쪽으로 최대 9개 페이지 표시

    if (end - start < 9) {
      start = Math.max(end - 9, 1); // 페이지 범위가 9개 미만일 경우 조정
    }

    let pageNumbers = [];
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  useEffect(() => {
    getData("/myPage/getInquiryHistory", {}, () => {}, () => {});
  }, [])


  // useEffect(() => {
  //   getData();
  // }, [])

  // const getData = async () => {
  //   const API_URL = `${LOCAL_API_BASE_URL}/myPage/getInquiryHistory`;
  //   try {
  //     const response = await axios.get(API_URL, {
  //       headers: {
  //           Authorization: `Bearer ${token}`,
  //           'Content-Type': 'application/json', // JSON 형식 명시
  //       }
  //     })
  //     if(response.data.success){
  //       setData(response.data.data);
  //       console.log(response.data.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }


  return (
    <Box display="flex" flexDirection="column" alignItems="center" sx={{ position: 'relative', height: '100%' }}>
    <Typography variant="h4" gutterBottom>
      1대1 문의
    </Typography>
  
    {/* 질문 목록 */}
      <Box width="70%" sx={{ alignItems: "center", mt:"30px", mb:"30px"}}>
      {/* data가 null 이 아닐때만 map진행 */}
      {currentData.length > 0 ? (
        currentData.map((question, index) => (
          <Accordion key={index} style={{ display: "flex", flexDirection: "column" }}>
            <AccordionSummary style={{ display: "flex" }} expandIcon={<ExpandMoreIcon />}>
              {question.answer ? (
                <CheckCircleIcon sx={{ color: "green" }} />
              ) : (
                <RadioButtonUncheckedIcon />
              )}
              <Typography variant="h6" width="200%">
                {question.subject}
              </Typography>
              <Typography width="30%">
                {question.created_at}
              </Typography>
            </AccordionSummary>

            {/* 세부내용 */}
            <AccordionDetails>
              <Typography variant="body1">{question.content}</Typography>
              {question.answer ? (
                <Typography variant="body2" color="textSecondary">
                  답변: {question.answer}
                </Typography>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  아직 작성된 답변이 없습니다.
                </Typography>
              )}
              {question.file_idx ? (

              <Link href={question.file_path}>
                {question.file_name}
              </Link>
              ) : (
                <Typography>첨부파일이 없습니다.</Typography>
              )}
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography variant="body1" color="textSecondary" textAlign="center">
          표시할 데이터가 없습니다.
        </Typography>
      )}
    </Box>
  
    {/* 버튼을 오른쪽 아래에 고정 */}
    <Button
      variant="contained"
      color="primary"
      onClick={handleOpen}
      sx={{
        position: 'absolute',
        bottom: '16px',
        right: '16px',
        width: '150px',
        height: '50px',
        fontSize: '20px',
      }}
    >
      문의하기
    </Button>
  
    <InquiryModal open={isModalOpen} onClose={handleClose} />
    <div className="pagination">
      <Stack spacing={2}>
        <Pagination
          count={totalPages} // 전체 페이지 수
          page={currentPage} // 현재 페이지
          onChange={handlePageChange} // 페이지 변경 처리
          color="primary"
          showFirstButton
          showLastButton
          boundaryCount={2}
          siblingCount={4}
          hideNextButton={currentPage === totalPages}
          hidePrevButton={currentPage === 1} // 첫 페이지에서 '이전' 버튼 숨기기
        />
      </Stack>
    </div>
  </Box>
  

  );
};

export default InquiryPage;





// 모달 창 폼
function InquiryModal({ open, onClose, reload }) {
  const {token} = useAuthStore();  // zustand에서 token 값 가져오기

  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const LOCAL_API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL;
  const router = useRouter();

  // 이미지 선택 후 미리보기
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file)); // 미리보기 URL 생성
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file)); // 미리보기 URL 생성
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('content', content);
    if (file) {
      formData.append('file', file); // 파일을 FormData에 추가
    }

    try {
      const response = await axios.post(`${LOCAL_API_BASE_URL}/myPage/sendInquiry`, formData, {
        headers: {
          Authorization : `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // 파일 업로드를 위한 헤더 설정
        },
      })
      
      console.log('문의가 성공적으로 제출되었습니다:', response.data),
      alert('문의가 성공적으로 제출되었습니다:', response.data);
      setContent("");
      setFile(null);
      setPreview("");
      setSubject("");
      reload
      onClose();  // 제출 성공 후 모달을 닫음

    } catch (error) {
      console.error('문의 제출 중 오류 발생:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>1:1 문의하기</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="제목"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="내용"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            multiline
            rows={4}
          />
          <Box sx={{ margin: '20px 0', display:"flex", flexDirection:"column", alignItems:"center"}}>
            <Button variant="contained" component="label" startIcon={<AttachFileIcon />}  >
              Upload files
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
            {file && (
              <p style={{ marginTop: '10px' }}>
                첨부된 파일: {file.name}
              </p>
            )}
            {preview && (
              <div style={{ marginTop: 10, alignItems:"center" }}>
                <CardMedia src={preview} component="img" alt="Preview" style={{ width: 150, height: 150, objectFit: "cover" }}/>
              </div>
            )}
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          취소
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          제출
        </Button>
      </DialogActions>
    </Dialog>
  );
}